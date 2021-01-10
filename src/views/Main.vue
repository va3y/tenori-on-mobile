<template>
  <div id="app">
    <router-link to="/about" class="nav-link"> About</router-link> |
    <router-link to="/saves" class="nav-link"> Saves </router-link>

    <div>
      <TenoriOn msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
import TenoriOn from "../components/TenoriOn.vue";

export default {
  name: "App",
  data() {
    return {
      propsToPass: {
        tempo: 0,
      },
    };
  },
  components: {
    TenoriOn,
  },
};
</script>

<style>

</style>
