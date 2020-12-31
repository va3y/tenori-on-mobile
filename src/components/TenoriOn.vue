<template>
  <div @touchmove="touchStart" class="container">
    <button class="reset-button" @click="resetAll">reset</button>
    <div v-for="(column, rowIndex) in buttons" :key="rowIndex" class="rows">
      <div
        class="hitbox"
        v-for="(button, columnIndex) in column"
        :key="columnIndex"
        @touchstart="initialTouch(columnIndex, rowIndex)"
      >
        <div
          :id="rowIndex * 16 + columnIndex"
          class="button"
          :class="[{ on: buttons[columnIndex][rowIndex].on }]"
        >
          <span
            v-if="buttons[columnIndex][rowIndex].startAnimation"
            class="ishit"
          ></span>
        </div>
      </div>
    </div>
    <div @click="showDrums = !showDrums" class="more-button">
      {{ showDrums ? "less" : "more" }}
    </div>
    <transition name="slide-fade">
      <div v-show="showDrums" class="drum-cont">
        <Drums @changeDrums="updateDrums($event)" class="drum-container" />

        <div class="tempo-and-share">
          <TempoInput @changeTempo="setSpeed($event)" class="bpm" />
          <Save
            v-bind:drums="this.gotDrums"
            v-bind:buttons="this.buttons"
            v-bind:tempo="this.currentTempo"
            class="save-btn"
          />
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import SoundMaker from "../helper";
import Drums from "./Drums.vue";
import TempoInput from "./TempoInput.vue";
import Save from "./Save.vue";
import Encoder from "../encoder.js";

export default {
  name: "TenoriOn",
  components: {
    Drums,
    TempoInput,
    Save,
  },
  props: ["tempo"],
  data() {
    return {
      buttons: [], //2-dimensional array
      onButtons: [], //buttons that are ON!
      mouseDown: {
        isIt: false,
        upOrDown: false,
      },
      currStep: 0,
      intervalsMain: [],
      showDrums: false,
      currentTempo: 128,
      gotDrums: [],
      addOrRemove: false,
    };
  },
  created() {
    if (this.$route.query.preset) {
      try {
        console.log("trying to init preset");
        const presetData = Encoder.decode(this.$route.query.preset);
        this.drawTable(presetData);
        console.log("preset done!");
      } catch (err) {
        console.log("error when initing a preset..");
      }
    } else {
      this.drawTable(null);
    }
  },
  mounted() {
    try {
      this.startPlaying(60000 / this.$route.query.tempo / 2);
    } catch (error) {
      console.log("error when setting preset tempo!");
      this.startPlaying(60000 / 128 / 2); //128 bpm
    }
  },
  methods: {
    drawTable(preset) {
      let counter = 0;
      for (let i = 0; i < 16; i++) {
        this.buttons.push([]);
        for (let j = 0; j < 16; j++) {
          let isOn = false;
          try {
            isOn = preset.charAt(counter) == "1" ? true : false;
          } catch (err) {
            console.log(err.message, "and thats ok!");
          }
          this.buttons[i].push({
            on: isOn,
            isHit: false,
            startAnimation: false,
            col: i,
            row: j
          });
          counter++;
        }
      }
    },
    changeButton(col, row) {
      this.buttons[col][row].on = this.addOrRemove;
    },
    changeDrums(col, row) {
      this.gotDrums[col][row].on = this.addOrRemove;
      console.log(col, row);
    },
    initialTouch(col, row) {
      this.addOrRemove = !this.buttons[col][row].on;
    },
    touchStart(event) {
      try {
        const myLocation = event.changedTouches[0];
        const realTarget = document.elementFromPoint(
          myLocation.clientX,
          myLocation.clientY
        );
        const col = Number(realTarget.id) % 16;
        const row = Math.floor(Number(realTarget.id) / 16);

        if (col != 0 || row != 0) {
          if (row >= 16) {
            this.changeDrums(col, row - 16); //change drums, it's not main buttons
          } else {
            this.changeButton(col, row);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearHits(col) {
      for (let i = 0; i < col.length; i++) {
        this.buttons[col][i].isHit = false;
      }
      for (let i = 0; i < 4; i++) {
        this.gotDrums[col][i].isHit = false;
      }
    },

    startPlaying() {
      const soundMaker = new SoundMaker();

      for (let i = 0; i < this.intervalsMain.length; i++) {
        clearInterval(this.intervalsMain[i]);
        this.intervalsMain.pop(i);
      }

      this.intervalsMain.push(
        setInterval(
          function () {
            this.step(this.currStep, soundMaker);
            if (this.currStep == 0) {
              this.clearHits(15);
            } else {
              this.clearHits(this.currStep - 1);
            }

            if (this.currStep == 15) {
              this.currStep = 0;
            } else {
              this.currStep++;
            }
          }.bind(this),
          60000 / Math.floor(this.currentTempo) / 2 //speed
        )
      );
      console.log("started playing at ", Math.floor(this.currentTempo));
    },

    step(row, soundMaker) {
      this.buttons[row].map((b) => {
        if (b.on === false) {
          return;
        } else {
          soundMaker.playSound(b.row + 1);
          this.buttons[row][b.row].startAnimation = true;
          this.buttons[row][b.row].isHit = true;
          setTimeout(() => {
            this.buttons[row][b.row].startAnimation = false;
          }, 500);
        }
      });

      for (let button = 0; button < 4; button++) {
        if (this.gotDrums[row][button].on) {
          soundMaker.playDrum(button);
          this.gotDrums[row][button].isHit = true;
        }
      }
    },
    updateDrums(drumArray) {
      this.gotDrums = drumArray;
    },
    setSpeed(v) {
      this.currentTempo = v;
      console.log("v is ", v);
      this.startPlaying();
    },
    resetAll() {
      this.buttons.map((col) => {
        col.map((b) => {
          b.on = false;
        });
      });
    },
  },
};
</script>

<style>
.container {
  margin-top: 2em;
  margin-bottom: 2em;
  user-select: none;
}

@keyframes on-appear {
  from {
    background-color: rgba(216, 216, 216, 0);
    transform: scale(0.4);
  }
  to {
    background-color: rgba(216, 216, 216, 1);
    transform: scale(1);
  }
}

.on {
  animation: on-appear 0.2s;
  background-color: rgb(125, 125, 125);
  z-index: 2;
  border-radius: 5px;
}
input {
  display: none;
}

.rows {
  display: flex;
  justify-content: center;
}

.button {
  border: 1px solid rgb(165, 165, 165);
  border-radius: 20%;
  z-index: 3;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-content: center;

  width: 4.5vw;
  height: 4.5vw;
}

.reset-button {
  margin-bottom: 10px;
  border-style: solid;
  border: 2px black solid;
  padding: 5px;
}

@keyframes start-ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(5);
  }
}

.ishit {
  border: rgba(90, 90, 90, 0.1) 0.5px solid;
  opacity: 0;
  border-radius: 40%;
  animation: start-ripple 1s;
  height: 100%;
  width: 100%;
}

.playingNow {
  /*background-color: salmon;*/
  background-color: rgb(62, 62, 62);
  z-index: 2;
}

@keyframes drumfade {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
  }
}

.slide-fade-enter-active {
  animation: drumfade 0.5s cubic-bezier(1, 0.8, 0.9, 1);
}

.slide-fade-leave-active {
  animation: drumfade 0.5s reverse cubic-bezier(1, 0.8, 0.9, 1);
}

.more-button {
  margin-top: 1em;
}

.drum-container {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}

.tempo-and-share {
  display: flex;
  justify-content: space-between;
  height: 23px;
}

.bpm {
  margin-top: 5px;
}
</style>
