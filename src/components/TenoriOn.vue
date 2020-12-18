<template>
  <div
    @mousedown="isMouseDown(true)"
    @mouseup="isMouseDown(false)"
    class="container"
  >
    <table>
      <tr v-for="(column, columnIndex) in buttons" :key="columnIndex">
        <td v-for="(button, rowIndex) in column" :key="rowIndex">
          <span
            class="small-span"
            @mouseover="changeButton(columnIndex, rowIndex)"
            @click="changeButtonClick(columnIndex, rowIndex)"
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
    <span @click="showDrums=true"
    v-if="!showDrums">more</span>
    <span @click="showDrums=false"
    v-if="showDrums">less</span>
    <transition name="slide-fade">
    <div v-if="showDrums"> 
    <Drums @changeDrums="changeDrums($event)" class="drum-container" />
    <TempoInput @changeTempo="setSpeed($event)" class="bpm" />
    </div>
    </transition>
  </div>
</template>


<script>
import SoundMaker from "../helper";
import Drums from "./Drums.vue";
import TempoInput from "./TempoInput.vue";

export default {
  name: "TenoriOn",
  components: {
    Drums,
    TempoInput,
  },
  props: ["tempo"],
  data() {
    return {
      buttons: [], //2-dimensional array
      gotDrums: [],
      btnStyle: "btnStyle",
      mouseDown: false,
      currStep: 0,
      showAnimation: false,
      intervalMain: 0,
      showDrums: false
    };
  },
  created() {
    this.drawTable();
  },
  mounted() {
    this.startPlaying(60000 / 128 / 2); //128 bpm
  },
  methods: {
    drawTable() {
      for (let i = 0; i < 16; i++) {
        this.buttons.push([]);
        for (let j = 0; j < 16; j++) {
          this.buttons[i].push({
            on: false,
            isHit: false,
            startAnimation1: false,
            startAnimation2: false,
          });
        }
      }
    },
    changeButton(col, row) {
      if (this.mouseDown) {
        this.buttons[col][row].on = !this.buttons[col][row].on; //switch boolean
      } else {
        return;
      }
    },
    changeButtonClick(col, row) {
      this.buttons[col][row].on = !this.buttons[col][row].on; //switch boolean
    },
    isMouseDown(isIt) {
      this.mouseDown = isIt;
    },

    clearHits(col) {
      for (let i = 0; i < 16; i++) {
        this.buttons[col][i].isHit = false;
      }
      for (let i = 0; i < 4; i++) {
        this.gotDrums[col][i].isHit = false;
      }
    },

    startPlaying(speed) {
      const soundMaker = new SoundMaker();

      this.intervalMain = setInterval(
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
        speed //speed
      );
    },

    step(row, soundMaker) {
      //soundMaker.map((sound)=> {sound.currentTime = 0});

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
      clearInterval(this.intervalMain);
      this.startPlaying(60000 / v / 2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
td {
  border: 1px solid rgb(165, 165, 165);
  padding: 0px;
  margin: 1px;
  border-radius: 15%;
  z-index: 2;
}

.container {
  display: flex;
  justify-content: center;
  -webkit-user-select: none;
  user-select: none;
  
  align-items: center;
}

@media only screen and (max-width: 410px) {
  td {
    height: 15px;
    width: 15px;
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
  height: 100%;
  width: 100%;
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

.drum-container {
  margin-top: 2em;
}

.bpm {
  margin-right:24em;
  font-size: 12px;
  
}
</style>
