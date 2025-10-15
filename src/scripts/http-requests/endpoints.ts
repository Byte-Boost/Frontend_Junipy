import apiClient from "./instance";
import type { UserInformation } from "@/models/models";

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

export async function getProfileData(): Promise<{data: UserInformation}> {
  // const response = await apiClient.get("/api/profile-data");
  // return response.data;

  //PLACEHOLDER (no endpoints on backend yet)
  return {
    data: {
      name: "Nome de Teste",
      email: "email@exemplo.com",
      birthDate: "2000-10-09",
      gender: 'Masculino', 
      occupation: "Pedreiro",
      consultationReason: "emagrecimento",
      healthConditions: ["diabetes1"],
      allergies: ["lactose"],
      surgeries: [""],
      activityType: "caminhada",
      activityFrequency: "1-2",
      activityDuration: "30",
      sleepQuality: "boa",
      wakeDuringNight: "0",
      bowelFrequency: "1",
      stressLevel: "low",
      alcoholConsumption: "0",
      smoking: "no",
      hydrationLevel: "1",
      takesMedication: "yes",
      medicationDetails: "Insulina"
    }
  }
}
export async function patchProfileData(userInfo: UserInformation){
  console.log(userInfo);
  // const response = await apiClient.patch("/api/profile-data");
  // return response.data;

  //PLACEHOLDER (no endpoints on backend yet)
  return null;
}

export async function getAllUsers() {
  const response = await apiClient.get("/api/user");
  return response.data;
}
