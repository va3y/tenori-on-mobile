<template>
  <div>
    <label for="click">click</label>
    <input
      type="radio"
      id="click"
      name="draw-switch"
      :value=false
      v-model="currDrawMode"
    />
    <br />
    <label for="draw">draw</label>
    <input
      type="radio"
      id="draw"
      name="draw-switch"
      :value=true
      v-model="currDrawMode"
    />
  </div>
</template>

<script>
export default {
    name: "DrawSwitch",
    data() {
      return {
        currDrawMode: false
      }
    },
    watch: { 
      currDrawMode: function() {
        this.$emit('changeDrawMode', this.currDrawMode )
        console.log('switched to ', this.currDrawMode)
      }
    }
};
</script>

<style lang="scss" scoped>
</style>