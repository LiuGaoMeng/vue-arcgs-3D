import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Map from "../views/map.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Map",
    component: Map,
  },
];

const router = new VueRouter({
  mode: "history",
  // mode:"hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
