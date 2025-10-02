import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Chat",
      // @ts-ignore
      component: () => import("../views/ChatView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      // @ts-ignore
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      // @ts-ignore
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/users",
      name: "Users",
      // @ts-ignore
      component: () => import("../views/admin/UserListView.vue"),
    }
  ],
});

export default router;
