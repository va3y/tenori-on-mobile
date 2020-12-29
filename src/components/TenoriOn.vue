<template>
  <div @mouseup="isMouseDown(false, false)" class="container">
    <table>
      <tr v-for="(column, columnIndex) in buttons" :key="columnIndex">
        <td
          v-for="(button, rowIndex) in column"
          :key="rowIndex"
          @mousedown="
            isMouseDown(true, !buttons[columnIndex][rowIndex].on);
            changeButtonClick(columnIndex, rowIndex);
          "
          @mouseover="changeButton(columnIndex, rowIndex)"
        >
          <span
            class="small-span"
            :class="[
              { on: buttons[columnIndex][rowIndex].on },
              { playingNow: buttons[columnIndex][rowIndex].isHit },
            ]"
          >
            <span
              v-show="buttons[columnIndex][rowIndex].startAnimation1"
              class="ishit"
            ></span>
            <span
              v-show="buttons[columnIndex][rowIndex].startAnimation2"
              class="ishit"
            ></span>
          </span>
        </td>
      </tr>
    </table>
    <span @click="showDrums = !showDrums" class="more-button">{{
      showDrums ? "less" : "more"
    }}</span>
    <transition name="slide-fade">
      <div v-show="showDrums" class="drum-cont">
        <Drums @changeDrums="changeDrums($event)" class="drum-container" />

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
      onButtins: [], //buttons that are ON!
      gotDrums: [],
      mouseDown: {
        isIt: false,
        upOrDown: false,
      },
      currStep: 0,
      intervalsMain: [],
      showDrums: false,
      currentTempo: 128,
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
        console.log("error when initing a preset!");
      }
    } else {
      this.drawTable(null);
    }
  },
  mounted() {
    if (this.$route.query.tempo) {
      try {
        this.startPlaying(60000 / this.$route.query.tempo / 2);
      } catch (error) {
        console.log("error when setting preset tempo!");
        this.startPlaying(60000 / 128 / 2); //128 bpm
      }
    } else {
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
            console.log(err.message, 'and thats ok!');
          }
          this.buttons[i].push({
            on: isOn,
            isHit: false,
            startAnimation1: false,
            startAnimation2: false,
          });
          counter++;
        }
      }
    },
    changeButton(col, row) {
      if (this.mouseDown.isIt) {
        this.buttons[col][row].on = this.mouseDown.upOrDown; //switch boolean
      } else {
        return;
      }
    },
    changeButtonClick(col, row) {
      this.buttons[col][row].on = !this.buttons[col][row].on; //switch boolean
    },
    isMouseDown(isIt, upOrDown) {
      this.mouseDown.isIt = isIt;
      this.mouseDown.upOrDown = upOrDown;
    },

    clearHits(col) {
      for (let i = 0; i < 16; i++) {
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
      for (let button = 0; button < 16; button++) {
        if (this.buttons[row][button].on) {
          this.retriggerAnimation(row, button);
          this.buttons[row][button].isHit = true;
          soundMaker.playSound(button);
        }
      }
      for (let button = 0; button < 4; button++) {
        if (this.gotDrums[row][button].on) {
          soundMaker.playDrum(button);
          this.gotDrums[row][button].isHit = true;
        }
      }
    },

    retriggerAnimation(row, button) {
      if (this.buttons[row][button].startAnimation1) {
        this.buttons[row][button].startAnimation1 = false;
        this.buttons[row][button].startAnimation2 = true;
      } else {
        this.buttons[row][button].startAnimation1 = true;
        this.buttons[row][button].startAnimation2 = false;
      }
    },

    changeDrums(drumArray) {
      this.gotDrums = drumArray;
    },
    setSpeed(v) {
      this.currentTempo = v;
      console.log("v is ", v);
      this.startPlaying();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.container {
  display: flex;
  justify-content: center;
  -webkit-user-select: none;
  user-select: none;
  align-content: center;
  align-self: center;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 2em;
}

@media only screen and (max-width: 410px) {
  td {
    height: 17px;
    width: 17px;
  }
}

@media only screen and (min-width: 411px) {
  td {
    height: 20px;
    width: 20px;
  }
}

@media only screen and (min-width: 1000px) {
  td {
    height: 25px;
    width: 25px;
  }
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
  background-color: rgba(216, 216, 216, 1);
  z-index: 2;
  border-radius: 5px;
}
input {
  display: none;
}

tr {
  display: block;
  float: left;
}
th,
td {
  display: block;
  z-index: 3;
}

.small-span {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 90%;
  width: 90%;
  z-index: 0;
  border: 1px solid rgb(165, 165, 165);
  border-radius: 4px;
  padding: 0px;
  margin: 1px;

  z-index: 2;
}

.span-container {
  display: flex;
  justify-content: center;
  align-content: center;
}

@keyframes start-ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(4);
    transition: transform 700ms, opacity 700ms;
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.2;
    display: none;
  }
}

.ishit {
  border: rgb(216, 216, 216) 1px solid;
  opacity: 0;
  border-radius: 40%;
  animation: start-ripple 0.7s;
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  z-index: 0;
}

.playingNow {
  /*background-color: salmon;*/
  background-color: rgb(65, 65, 65);
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
  margin-top: 2em;
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
