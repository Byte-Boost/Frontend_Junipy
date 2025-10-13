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

export async function getProfileData() {
  // const response = await apiClient.get("/api/profile-data");
  // return response.data;

  //PLACEHOLDER (no endpoints on backend yet)
  return {
    data: {
      name: "teste",
      email: "teste@example.com",
      username: "teste-example",
      birthday: "2000-01-01",
      weight: 70,
      height: 165
    }
  }
}
export async function patchProfileData(){
  // const response = await apiClient.patch("/api/profile-data");
  // return response.data;

  //PLACEHOLDER (no endpoints on backend yet)
  return null;
}

export async function getAllUsers() {
  const response = await apiClient.get("/api/user");
  return response.data;
}
