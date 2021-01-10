import { createApp } from 'vue';
import App from './App.vue'
import router from "./router";
import { IonicVue } from "@ionic/vue";

import { createSavesFile } from "./saves";

import { StatusBar } from "@ionic-native/status-bar";


StatusBar.backgroundColorByHexString("#d3a096");
StatusBar.styleDefault();



createApp(App)
  .use(router)
  .use(IonicVue)
  .mount('#app')

createSavesFile();