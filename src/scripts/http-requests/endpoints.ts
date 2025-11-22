import apiClient from "./instance";
import type { UserInformation } from "@/models/models";

export async function register(user: {email: string; username: string; password: string; confirmPassword: string;}) {
  const response = await apiClient.post("/api/auth/register", user);
  return response.data;
}

export async function insertAnamnese(userInfo: UserInformation){
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
  const response = await apiClient.post(`api/user/request-diet-analysis/${dietId}`); 
  return response.data;
}

export async function getAllUsers() {
  const response = await apiClient.get("/api/user");
  return response.data;
}

export async function getChatList(){
  // get chats UUIDs (create one if not exist, return as array)
  // TBD
  return ["890c7a4c7b9f", "de955a4cf098", "f80238a85df6"];
}
