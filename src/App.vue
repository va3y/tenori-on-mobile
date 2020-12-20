<template>
  <div id="app">
    <h1>Tenori-on</h1>
           <keep-alive>
    <router-view />
    </keep-alive>
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
  margin-top: 1.5em;
  margin-bottom:0px;
}

* {
  background-color: rgb(240, 237, 233);
}

.container {
  display: flex;

  flex-direction: column;

}


.nav-link {
  font-size: 90%;
  font-family: monospace;
  color: rgb(212, 161, 151);
  margin-top: 20em;
  }


</style>
