<template>
  <div id="app">
    <h1>Tenori-on</h1>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
}
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
  margin-bottom:0px;
}

* {
  background-color: rgb(240, 237, 233);
}


.nav-link {
  font-size: 90%;
  font-family: monospace;
  color: rgb(212, 161, 151);
  margin-top: 20em;
  }

a, a:visited {
  color: rgb(212, 161, 151);
}
</style>
