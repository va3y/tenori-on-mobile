import Vue from 'vue@next'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

const app = createApp({});

app.mount("#app");
