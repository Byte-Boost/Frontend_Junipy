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
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("../views/UserListView.vue"),
    },
    {
      path: "/nutricionista",
      name: "Nutricionista",
      component: () => import("../views/NutricionistaView.vue"),
    }
  ],
});

export default router;
