import { Client } from "@stomp/stompjs";
import apiClient from "./endpoints";
import SockJS from "sockjs-client";
import type { User } from "@/models/models";

export async function register(newUser: User) {
  const response = await apiClient.post("/api/auth/register", newUser);
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await apiClient.post("/api/auth/login", { email, password });
  return response.data;
}
