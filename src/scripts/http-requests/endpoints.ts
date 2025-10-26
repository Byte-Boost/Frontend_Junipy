import apiClient from "./instance";
import type { UserInformation } from "@/models/models";

export async function register(
  user: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  },
  userInfo: UserInformation
) {
  console.log(user, userInfo);
  const response = await apiClient.post("/api/auth/register", {
    ...user,
    userProfile: userInfo,
  });
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await apiClient.post(
    "/api/auth/login",
    { email, password },
    { headers: { skipAuth: true } }
  );
  return response.data;
}

export async function getProfileData(): Promise<{ data: UserInformation }> {
  const response = await apiClient.get("/api/user/profile-data");
  return response;
}
export async function patchProfileData(userInfo: UserInformation) {
  console.log(userInfo);
  const response = await apiClient.post("/api/user/profile-data", userInfo);
  return response.data;
}

export async function getAllUsers() {
  const response = await apiClient.get("/api/user");
  return response.data;
}
