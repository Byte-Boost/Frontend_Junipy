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

export async function getProfileData() {
  // const response = await apiClient.get("/api/profile-data");
  // return response.data;

  //PLACEHOLDER (no endpoints on backend yet)
  return {
    data: {
      name: "Nome de Teste",
      birthDate: new Date("2000-10-09"),
      age: 25,
      gender: 'M', 
      occupation: "Pedreiro",
      consultationReason: "Emagrecimento",
      healthConditions: ["Diabetes"],
      allergies: ["Nozes"],
      surgeries: [],
      activityType: "caminhada",
      activityFrequency: "1",
      activityDuration: "30",
      sleepQuality: "2",
      wakeDuringNight: "0",
      bowelFrequency: "1",
      stressLevel: "1",
      alcoholConsumption: "0",
      smoking: "0",
      hydrationLevel: "1",
      takesMedication: "0",
      medicationDetails: "0"
    }

  }
}
export async function patchProfileData(userInfo: UserInformation){
  // const response = await apiClient.patch("/api/profile-data");
  // return response.data;

  //PLACEHOLDER (no endpoints on backend yet)
  return null;
}

export async function getAllUsers() {
  const response = await apiClient.get("/api/user");
  return response.data;
}
