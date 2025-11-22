import UserListView from "@/views/admin/UserListView.vue";
import ChatView from "@/views/ChatView.vue";
import ConfigView from "@/views/ConfigView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DietView from "@/views/DietView.vue";

const routes = [
  {
    path: "/",
    redirect: (to: any) => {
      const isAuthenticated = !!localStorage.getItem("token");
      return isAuthenticated ? "/chat" : "/login";
    },
  },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  {
    path: "/users",
    name: "users",
    component: UserListView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/config",
    name: "config",
    component: ConfigView,
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatView,
    meta: { requiresAuth: true },
  },
  {
    path: "/chat/:uuid",
    name: "chatId",
    component: ChatView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/diet",
    name: "diet",
    component: DietView,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: "/login" });
  } else if (to.path === "/" && isAuthenticated) {
    next({ path: "/chat" });
  } else {
    next();
  }
});

export default router;
