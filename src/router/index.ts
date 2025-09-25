import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Chat",
      component: () => import("../views/ChatView.vue"),
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("../views/UserListView.vue"),
    },
  ],
});

export default router;
