<template>
  <div @mousedown="isMouseDown(true)" @mouseup="isMouseDown(false)">
    <div class="container">
      <table>
        <tr v-for="(column, columnIndex) in buttons" :key="columnIndex">
          <td
            v-for="(button, rowIndex) in column"
            :key="rowIndex"
            @mouseover="changeButton(columnIndex, rowIndex)"
            @mouseup="changeButton(columnIndex, rowIndex)"
            :class="[{ on: buttons[columnIndex][rowIndex].on }, btnStyle]"
            class=""
          ></td>
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
      soundMaker: new SoundMaker,
      currStep: 0
      
    };
  },
  created() {
    //let sound = new SoundMaker
    //sound.playSound();
    this.drawTable();
    
  },
  mounted() {
    this.animate();
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

    animate() {
      
      setInterval(function() {
        this.step(this.currStep)
      if (this.currStep==15) {
        this.currStep=0
      } else {
        this.currStep++
      }
      }.bind(this), 300);

    },

    step(row) {
      for (let button = 0; button < 16; button++) {
        if (this.buttons[row][button].on) {
          this.soundMaker.playSound(button);
        }
      

        
      
    }}
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
  background-color: #dbe7e7;
}

td {
  border: 1px solid rgb(165, 165, 165);
  
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

tr { display: block; float: left; }
th, td { display: block; }
</style>
