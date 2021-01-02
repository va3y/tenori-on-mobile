<template>
  <div>
    <router-link to="/" class="nav-link">Back</router-link>
    <br />
    <div v-for="(save, index) in saves" :key="index">
      {{ getDate(index) }} | 
      {{ getTime(index) }}

      <a :href="save.query">Link</a>
      <br />
    </div>
  </div>
</template>

<script>
import { fileRead } from "../saves";

export default {
  async created() {
    try {
      const gotData = await fileRead();      
      this.saves = gotData.presets;
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      saves: [],
    };
  },
  methods: {
    getDate(index) {
      const dateStr = this.saves[index].date;
      const date = new Date(+dateStr).toLocaleDateString();
      return date;
    },
    getTime(index) {
      const dateStr = this.saves[index].date;
      const time = new Date(+dateStr).toLocaleTimeString();
      return time;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>