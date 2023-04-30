import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Capture from "../views/CaptureView.vue";
import Review from "../views/ReviewView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/capture",
    name: "Capture",
    component: Capture,
  },
  {
    path: "/review",
    name: "Review",
    component: Review,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
