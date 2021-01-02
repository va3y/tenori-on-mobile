import { createRouter, createWebHashHistory } from "vue-router";
import Main from "./views/Main.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Main,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/About.vue"),
    Main,
  },
  {
    path: "/saves",
    name: "saves",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/SavesPage.vue"),
    Main,
  },
];


export default createRouter({
  history: createWebHashHistory(),
  routes
});