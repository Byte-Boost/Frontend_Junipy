import UserListView from "@/views/admin/UserListView.vue";
import ChatView from "@/views/ChatView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/users", name: "users", component: UserListView },
  { path: "/chat", name: "chat", component: ChatView },
  { path: "/:pathMatch(.*)*", redirect: "/login" }, // Catch-all route to redirect to /login
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
