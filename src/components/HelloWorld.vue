<template>
  <div @mousedown="isMouseDown(true)" @mouseup="isMouseDown(false)">
    <div class="container">
      <table>
        <tr v-for="(column, columnIndex) in buttons" :key="columnIndex">
          <td
            v-for="(button, rowIndex) in column"
            :key="rowIndex"
          >
          
          <span
          class="small-span"
          @mouseover="changeButton(columnIndex, rowIndex)"
          @mouseup="changeButton(columnIndex, rowIndex)"
          :class="[{ on: buttons[columnIndex][rowIndex].on },
          {ison: buttons[columnIndex][rowIndex].isHit }]"
          :style="btnColor(columnIndex, rowIndex)">
          <span v-show="buttons[columnIndex][rowIndex].isHit" class="ishit"></span>

          </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import SoundMaker from "../helper";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      buttons: [], //2-dimensional array
      btnStyle: "btnStyle",
      mouseDown: false,
      currStep: 0,
      showAnimation: false
    };
  },
  created() {
    //let sound = new SoundMaker
    //sound.playSound();
    this.drawTable();
  },
  mounted() {
    this.startPlaying();
  },
  methods: {
    drawTable() {
      for (let i = 0; i < 16; i++) {
        this.buttons.push([]);
        for (let j = 0; j < 16; j++) {
          this.buttons[i].push({
            row: i,
            column: j,
            on: false,
            isHit: false,
            colorValue: 0,
          });
        }
      }
      console.log(this.buttons);
    },
    changeButton(col, row) {
      if (this.mouseDown) {
        this.buttons[col][row].on = !this.buttons[col][row].on; //switch boolean
      } else {
        return;
      }
    },
    isMouseDown(isIt) {
      this.mouseDown = isIt;
    },

    clearHits() {
      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
          this.buttons[j][i].isHit=false;
          
        }
      }
    },

    startPlaying() {
      const soundMaker = new SoundMaker()

      setInterval(
        function () {
          
          
          this.step(this.currStep, soundMaker);
          
          
          if (this.currStep == 15) {
            this.currStep = 0;
            this.clearHits();
            
          } else {
            this.currStep++;
            
          }
        }.bind(this),
        200 //speed
      );
    },

    step(row, soundMaker) {
      //soundMaker.map((sound)=> {sound.currentTime = 0});
      
      for (let button = 0; button < 16; button++) {
        if (this.buttons[row][button].on) {
          
          //this.animate(row, button);
          this.buttons[row][button].isHit = true;
          soundMaker.playSound(button);
        }
      }
    },

    btnColor(col, row) {
      if (!this.buttons[col][row].on) {
      const colorValue = this.buttons[col][row].colorValue;
      return `background-color: rgba(0,0,0,${colorValue})`;}
    },
    
    animate(col, row) {
      let distance = 1;
      let colorValue = 1;
      let speed = 1;
      for (let index = 0; index < 5; index++) {
        setTimeout(() => {
          this.buttons[col + distance][row].colorValue = colorValue;
          colorValue /= 2;
          distance++;
        }, speed*index);
      }
      let secondDistance = 1;

      //remove ripples
      for (let index = 0; index < 5; index++) {
        setTimeout(() => {
          this.buttons[col + secondDistance][row].colorValue = 0;
          secondDistance++;
        }, speed*index*5);
      }
     


    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #95a09b;
}

.on {
  background-color: rgba(105, 105, 105,0.2);
}

td {
  border: 1px solid rgb(165, 165, 165);
  padding: 0px;
  margin:1px;

  
  border-radius: 15%;
}

.container {
  display: flex;

  justify-content: center;
}

td {
  height: 20px;
  width: 20px;
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
  z-index:3;
}


.ripple-enter-active {
  animation: start-ripple 1s;
}
.ripple-leave-active {
  animation: start-ripple 1s reverse;
}

.small-span {
  display: block;
  height: 100%;
  width: 100%
}


@keyframes start-ripple {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(3);
    background-color: rgba(255,0,255,0.2);
  }
  100% {
    transform: scale(1);
  }
}

.ishit {
  border-radius: 15%;
  
  
  animation: start-ripple 0.7s;
  overflow: hidden;
  display: block;
  height: 100%;
  width: 100%;
  z-index:1;
}

.ison {
  /*background-color: salmon;*/
  z-index:2;
}
</style>
