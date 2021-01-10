<template>
  <div id="app">
    <h1>Tenori-on</h1>
    <router-view />
  </div>
</template>

<script>


import { Plugins } from "@capacitor/core";
const { SplashScreen } = Plugins;
export default {
  name: "App",
  components: {},
  created() {


  },
  mounted() {
    SplashScreen.hide();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  margin-top: 1em;
  margin-bottom: 0px;
}

* {
  background-color: rgb(240, 237, 233);
}

.nav-link {
  font-size: 90%;
  font-family: monospace;
  color: rgb(212, 161, 151);
  font-size: 14px;
  font-family: monospace;
}

a,
a:visited {
  color: rgb(212, 161, 151);
}
</style>
