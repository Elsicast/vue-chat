import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "chat",
    component: () => import("../views/ChatView.vue"),
  },
  {
    path: "/setAvatar",
    name: "setAvatar",
    component: () => import("../views/SetAvatar.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/RegLoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
