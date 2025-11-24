export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface UserInformation {
  name: string;
  email: string;
  birthDate: string;
  age?: number;
  sex: string;
  occupation: string;
  consultationReason: string;
  healthConditions: Array<string>;
  allergies: Array<string>;
  surgeries: Array<string>;
  activityType: string;
  activityFrequency: string;
  activityDuration: string;
  sleepQuality: string;
  wakeDuringNight: string;
  bowelFrequency: string;
  stressLevel: string;
  alcoholConsumption: string;
  smoking: string;
  hydrationLevel: string;
  takesMedication: string;
  medicationDetails: string;
}

export interface Chat {
  id: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  role: string;
  content: string;
  timestamp: number;
}
