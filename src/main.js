import { createApp } from 'vue';
import App from './App.vue'
import router from "./router";

import { createSavesFile } from "./saves";
createSavesFile();


createApp(App).use(router).mount('#app')
