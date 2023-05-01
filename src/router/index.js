import { createRouter, createWebHistory } from "vue-router";
import Capture from "../views/CaptureView.vue";
import Review from "../views/ReviewView.vue";

const routes = [
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
