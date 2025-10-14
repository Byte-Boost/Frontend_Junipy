export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
}

export interface UserInformation {
  name: string,
  birthDate: Date,
  age: number,
  gender: string, 
  occupation: string,
  consultationReason: string,
  healthConditions: Array<string>,
  allergies: Array<string>,
  surgeries: Array<string>,
  activityType: string,
  activityFrequency: string,
  activityDuration: string,
  sleepQuality: string,
  wakeDuringNight: string,
  bowelFrequency: string,
  stressLevel: string,
  alcoholConsumption: string,
  smoking: string,
  hydrationLevel: string,
  takesMedication: string,
  medicationDetails: string
}
