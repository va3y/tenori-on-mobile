<template>
  <div id="app">
      <router-link to="/about" 
    class="nav-link">About</router-link>

    <div class="container">
      <TenoriOn
        msg="Welcome to Your Vue.js App"
      />
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

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  background-color: rgb(240, 237, 233);
}

.nav-link {
  font-size: 100%;
  font-family: monospace;
  
  color: rgb(212, 161, 151);
}


</style>
