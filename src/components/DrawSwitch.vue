<template>
  <div class="switch-cont">
    <input
      type="radio"
      id="click"
      name="draw-switch"
      :value="false"
      v-model="currDrawMode"
      checked
    />
    <label for="click">click</label>
    <br />

    <input
      type="radio"
      id="draw"
      name="draw-switch"
      :value="true"
      v-model="currDrawMode"
    />
    <label for="draw">draw</label>
  </div>
</template>

<script>
export default {
  name: "DrawSwitch",
  data() {
    return {
      currDrawMode: false,
    };
  },
  watch: {
    currDrawMode: function () {
      this.$emit("changeDrawMode", this.currDrawMode);
      console.log("switched to ", this.currDrawMode);
    },
  },
};
</script>

<style scoped>
.switch-cont {
  font-family: monospace;
}

.switch-cont input[type="radio"]:checked + label {
  color: rgb(212, 161, 151);
  font-weight: 800;
  text-decoration: underline;
}

label {
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}
</style>