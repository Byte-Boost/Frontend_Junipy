import apiClient from "./instance";
import type { User } from "@/models/models";

export async function register(
  email: string,
  username: string,
  password: string,
  confirmPassword: string
) {
  const response = await apiClient.post("/api/auth/register", {
    email,
    username,
    password,
    confirmPassword,
  });
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await apiClient.post("/api/auth/login", { email, password });
  return response.data;
}

export async function getAllUsers() {
  const response = await apiClient.get("/api/user");
  return response.data;
}
