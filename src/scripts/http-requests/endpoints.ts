import apiClient from "./instance";
import type { Chat, UserInformation } from "@/models/models";

export async function register(user: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await apiClient.post("/api/auth/register", user);
  return response.data;
}

export async function insertAnamnese(userInfo: UserInformation) {
  console.log(userInfo);
  const response = await apiClient.post("/api/user/profile-data", userInfo);
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

export async function getDietData() {
  const response = await apiClient.get("/api/user/daily-diet");
  return response.data;
}

export async function getAnalisysRequests() {
  const response = await apiClient.get("/api/user/diet-analysis-requests");
  return response.data;
}

export async function dietRequestAnalisys(dietId: string) {
  const response = await apiClient.post(
    `api/user/request-diet-analysis/${dietId}`
  );
  return response.data;
}

export async function getAllUsers() {
  const response = await apiClient.get("/api/user");
  return response.data;
}

export async function getChatList(): Promise<Chat[]> {
  const response = await apiClient.get("/api/chat");
  return response.data;
}
export async function createNewChat(): Promise<Chat> {
  const response = await apiClient.post("/api/chat");
  return response.data;
}
