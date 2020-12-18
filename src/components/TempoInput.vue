<template>
  <div class="tempo-container">
    <img
      src="../assets/circle-left.svg"
      @mousedown="downTempo"
      @click="downInc"
      @mouseup="clearIntervals"
      @mouseout="clearIntervals"
    />
    <span class="tempo-display">{{ tempo }} bpm </span>
    <img
      src="../assets/circle-right.svg"
      @mousedown="upTempo"
      @click="upInc"
      @mouseup="clearIntervals"
      @mouseout="clearIntervals"
      
    />
  </div>
</template>

<script>
export default {
  name: "TempoInput",

  data() {
    return {
      downInterval: 0,
      upInterval: 0,
      tempo: 128,
    };
  },
  methods: {
    downInc() {
      this.tempo--;
    },
    upInc() {
      this.tempo++;
    },

    downTempo() {
      this.downInterval = setInterval(() => {
        this.tempo--;
        this.$emit("changeTempo", this.tempo);
      }, 100);
    },
    upTempo() {
      this.upInterval = setInterval(() => {
        this.tempo++;
        this.$emit("changeTempo", this.tempo);
      }, 100);
    },
    clearIntervals() {
      clearInterval(this.downInterval);
      clearInterval(this.upInterval);
    },
  },
};
</script>

<style scoped>

.tempo-display {

  margin-top: 2px;
}



.tempo-container {


    display: flex;
    align-items: center;
    align-self: center;
}

img{
    width:17px;
    padding:5px;
    user-select: none;
}
</style>