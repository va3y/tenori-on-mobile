import { createApp } from 'vue';
import App from './App.vue'
import router from "./router";
import { IonicVue } from "@ionic/vue";

import { createSavesFile } from "./saves";

createSavesFile();

// import { fs } from "fs";
// fs.symlink("assets/www", "assets/public/", (e) => {
//   if(e) {
//     console.log(e)
//   } else {
//     console.log('LINK MADE')
//   }
// }); 


createApp(App)
  .use(router)
  .use(IonicVue)
  .mount('#app')
