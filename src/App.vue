<template>
  <div id="app">
    <h1> Tenori-on </h1>
    <div class="container">
      
    <TenoriOn msg="Welcome to Your Vue.js App" 
    v-bind="propsToPass"
    class="tenori"
    />
    </div>
    
    
    </div>
  
</template>

<script>
import TenoriOn from './components/TenoriOn.vue'



export default {
  name: 'App',
  data() {
    return {
      propsToPass:{
      tempo: 0,
      }
    }
  },
  components: {
    TenoriOn,
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
  margin-top: 60px;
}

* {
  background-color: rgb(240, 237, 233);
}

.container {
  display: flex;

  flex-direction: column;
  

}



</style>
