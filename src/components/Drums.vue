<template>
<div
    @mousedown="isMouseDown(true)"
    @mouseup="isMouseDown(false)"> 
    <table>
        <tr v-for="(column, columnIndex) in drumButtons" :key="columnIndex">
            <td v-for="(button, rowIndex) in column" :key="rowIndex">
               <span
            class="small-span"
            @mouseover="changeButton(columnIndex, rowIndex)"
            @mouseup="changeButton(columnIndex, rowIndex)"
            :class="[
              { on: drumButtons[columnIndex][rowIndex].on },
              //{ playingNow: drumButtons[columnIndex][rowIndex].isHit },
            ]">
            </span>
            </td>
        </tr>
    </table>

</div>


</template>

<script>
export default {
    name: "Drums",
    data() {
        return {
            drumButtons: []
        }
    },
    props: ['gotDrums'],
    created() {
        this.drawTable()
        this.$emit('changeDrums', this.drumButtons)
    },
    methods: {
    
    drawTable() {
      for (let i = 0; i < 16; i++) {
        this.drumButtons.push([]);
        for (let j = 0; j < 4; j++) {
          this.drumButtons[i].push({
            on: false,
            isHit: false,
          });
        }
      }
    },
    
    isMouseDown(isIt) {
      this.mouseDown = isIt;
    },

    changeButton(col, row) {
      if (this.mouseDown) {
        this.drumButtons[col][row].on = !this.drumButtons[col][row].on; //switch boolean
        this.$emit('changeDrums', this.drumButtons)
        
      } else {        
        return;
      }
    },
    },
    watch: {
    gotDrums: function (newValue) {
      this.drumButtons = newValue;
      
    }
  }
}
</script>


<style>

</style>



<style scoped>

</style>