<template>
  <div
    @mousedown="isMouseDown(true)"
    @mouseup="isMouseDown(false)"
    class="drum-cont"
  >
    <table>
      <tr v-for="(column, columnIndex) in drumButtons" :key="columnIndex">
        <td v-for="(button, rowIndex) in column" :key="rowIndex">
          <span
            class="small-span"
            @mouseover="changeButton(columnIndex, rowIndex)"
            @mouseup="changeButton(columnIndex, rowIndex)"
            :class="[
              { on: drumButtons[columnIndex][rowIndex].on },
              { playingNow: drumButtons[columnIndex][rowIndex].isHit },
              { iconone: columnIndex == 0 && rowIndex == 0 },
              { icontwo: columnIndex == 0 && rowIndex == 1 },
              { iconthree: columnIndex == 0 && rowIndex == 2 },
              { iconfour: columnIndex == 0 && rowIndex == 3 },
            ]"
          >
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Encoder from "../encoder.js";

export default {
  name: "Drums",
  data() {
    return {
      drumButtons: [],
    };
  },
  props: ["gotDrums"],
  created() {
    if (this.$route.query.drums) {
      try {
        const drumData = Encoder.decode(this.$route.query.drums);
        let counter = 0;
        for (let i = 0; i < 16; i++) {
          this.drumButtons.push([]);
          for (let j = 0; j < 4; j++) {
            let currData = drumData.charAt(counter) == "1" ? true : false;
            this.drumButtons[i].push({
              on: currData,
              isHit: false,
              iconSrc: `../assets/icons/icon${j + 1}.svg`,
            });
            counter++;
          }
        }

        console.log("preset done!");
        this.$emit("changeDrums", this.drumButtons);
      } catch (err) {
        console.log("error when initing a drum preset!");
      }
    } else {
    this.drawTable();
    }
    
  
    },
  
  methods: {
    drawTable() {
      for (let i = 0; i < 16; i++) {
        this.drumButtons.push([]);
        for (let j = 0; j < 4; j++) {
          this.drumButtons[i].push({
            on: false,
            isHit: false,
            iconSrc: `../assets/icons/icon${j + 1}.svg`,
          });
        }
      }
      this.$emit('changeDrums', this.drumButtons)
    },

    isMouseDown(isIt) {
      this.mouseDown = isIt;
    },

    changeButton(col, row) {
      if (this.mouseDown) {
        this.drumButtons[col][row].on = !this.drumButtons[col][row].on; //switch boolean
        this.$emit("changeDrums", this.drumButtons);
      } else {
        return;
      }
    },
  },
  watch: {
    gotDrums: function (newValue) {
      this.drumButtons = newValue;
    },
  },
};
</script>


<style>
</style>



<style scoped>
img {
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
}

.iconone {
  background-image: url("../assets/icons/icon3.svg");
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
}

.icontwo {
  background-image: url("../assets/icons/icon2.svg");
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
}

.iconthree {
  background-image: url("../assets/icons/icon4.svg");
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
}

.iconfour {
  background-image: url("../assets/icons/bass-drum.svg");
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
}

.drum-cont {
  display: flex;
  justify-content: center;
}
</style>