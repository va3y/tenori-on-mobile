<template>
  <div class="save-container">
    <button @click="savePreset">Save this pattern</button>
    <br />
    <a
      v-if="drumsOutput"
      :href="getLink"
      class="savelink"
      >Pattern saved! 🎉</a
    >
  </div>
</template>

<script>
import Encoder from "../encoder.js";
import { addSave } from '../saves.js'

export default {
  name: "Save",
  props: ["buttons", "drums", "tempo"],
  data() {
    return {
      inputCode: "",
      buttonsOutput: "",
      drumsOutput: "",
    };
  },
  methods: {
    async savePreset() {
      this.buttonsOutput = Encoder.encode(this.buttons);
      this.drumsOutput = Encoder.encode(this.drums);
      await addSave(this.getLink);
    },
    getCurrURL() {
      console.log(window.location.href.split("?")[0])
      return window.location.href.split("?")[0];
    },
  },
  computed: {
    getLink() {
      return this.getCurrURL() +
        '?preset=' +
        this.buttonsOutput +
        '&drums=' +
        this.drumsOutput +
        '&tempo=' +
        this.tempo
    }
  }
};
</script>

<style scoped>
* {
  user-select: text;
}

button {
  border-style: none;
  padding: 4px;
  font-family: monospace;
  border-radius: 20px;
  overflow: auto;
  font-size: 14px;
  color: rgb(44, 62, 80);
}

.savelink {
  font-family: monospace;
  font-size: 14px;
  animation: link-appear 0.5s;
}

@keyframes link-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.save-container {
  text-align: right;
}
</style>