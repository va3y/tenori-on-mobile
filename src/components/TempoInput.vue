<template>
  <div class="tempo-container">
    <span
      @mousedown="downTempo"
      @click="downInc"
      @mouseup="clearIntervals"
      @mouseout="clearIntervals"
    > &lt;&lt;</span>
    <span class="tempo-display">{{ tempo }} bpm </span>
    <span
      @mousedown="upTempo"
      @click="upInc"
      @mouseup="clearIntervals"
      @mouseout="clearIntervals"
      
    >&gt;&gt;</span>

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
  created() {
    if (this.$route.query.tempo) {
    try {
      const getTempo = parseInt(this.$route.query.tempo)
      this.tempo = (getTempo);
      this.$emit ("changeTempo", this.tempo);
    } catch (error) {
      console.log('err when setting the tempo!')
    }

    }
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
        
      }, 100);
    },
    upTempo() {
      this.upInterval = setInterval(() => {
        this.tempo++;
        
      }, 100);
    },
    clearIntervals() {
      clearInterval(this.downInterval);
      clearInterval(this.upInterval);
      this.$emit("changeTempo", this.tempo);
    },
  },
};
</script>

<style scoped>

.tempo-display {

  margin-left:5px;
  margin-right:5px;
  font-family: monospace;
  font-size: 14px;

  align-self: center;
  padding-bottom: 1px;;
}



.tempo-container {


    display: flex;
    align-self:flex-end;
    text-align: left;
    padding-left:5px;
    margin-top:3px;
    
}

img{
    width:17px;
    user-select: none;
}
</style>