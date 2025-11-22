<template>
  <CloudyBackground>

    <div class="form-container better-scrollbar">
      <!-- Progress header -->
      <header class="form-header">
        <h2>Informações de Usuário</h2>
        <p>Passo {{ currentStep + 1 }} de {{ steps.length }}</p>
      </header>
  
      <!-- Dynamic form step -->
      <div class="form-body">
        <component
          v-if="currentStep === 1"
          :is="steps[currentStep]"
          v-model:userInfo="userInformation"
          v-model:otherHealthConditions="otherUserInformation.otherHealthConditions"
          v-model:otherAllergies="otherUserInformation.otherAllergies"
          v-model:otherSurgeries="otherUserInformation.otherSurgeries"
        />
    
        <component
          v-else-if="currentStep === 2"
          :is="steps[currentStep]"
          v-model:userInfo="userInformation"
          v-model:otherActivities="otherUserInformation.otherActivities"
        />
    
        <component
          v-else
          :is="steps[currentStep]"
          v-model:userInfo="userInformation"
        />
      </div>
  
      <!-- Navigation buttons -->
      <div class="form-footer">
        <div class="form-navigation">
          <div class="flex gap-2">
            <button
              @click="prevStep"
              :disabled="currentStep <= 0"
              class="btn back-btn"
            >
              {{ t("common.back" as any)}}
            </button>
    
            <button
              @click="nextStep"
              :disabled="currentStep >= 4"
              class="btn next-btn"
            >
              {{ t("common.next" as any) }}
            </button>
          </div>
    
          <button
            @click="saveProfile"
            :disabled="!isFormChanged"
            class="btn save-btn"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
    
  </CloudyBackground>
</template>

<script setup lang="ts">
import "../styles/views/ConfigView.css";
import { onMounted, ref, watch } from "vue";

import Step1PersonalInfo from "@/components/forms/Step1PersonalInfo.vue";
import Step2HealthHistory from "@/components/forms/Step2HealthHistory.vue";
import Step3Activity from "@/components/forms/Step3Activity.vue";
import Step4Lifestyle from "@/components/forms/Step4Lifestyle.vue";
import Step5Habits from "@/components/forms/Step5Habits.vue";
import { getProfileData } from "@/scripts/http-requests/endpoints";
import { insertAnamnese } from "@/scripts/http-requests/endpoints";
import type { UserInformation } from "@/models/models";
import CloudyBackground from "@/components/CloudyBackground.vue";
import { useTypedI18n } from "@/composables/useI18n";
import { surgeriesEnum } from "@/types/surgeries.enum";
import { healthConditionsEnum } from "@/types/healthConditions.enum";
import { allergiesEnum } from "@/types/allergies.enum";

const steps = [
  Step1PersonalInfo,
  Step2HealthHistory,
  Step3Activity,
  Step4Lifestyle,
  Step5Habits,
];

const { t } = useTypedI18n();
const currentStep = ref(0);
const nextStep = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}
const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
}

const isLoading = ref(true);
const isSaving = ref(false);
const isFormChanged = ref(false);

const originalUserInformation = ref<UserInformation | null>(null);
const userInformation = ref<UserInformation>({
  email: "",
  name: "",
  occupation: "",
  birthDate: "",
  age: 0,
  sex: "",
  activityType: "",
  activityFrequency: "",
  activityDuration: "",
  sleepQuality: "",
  wakeDuringNight: "",
  bowelFrequency: "",
  stressLevel: "",
  alcoholConsumption: "",
  smoking: "",
  hydrationLevel: "",
  takesMedication: "",
  medicationDetails: "",
  consultationReason: "",
  healthConditions: [],
  allergies: [],
  surgeries: []
});
const otherUserInformation = ref({
  otherHealthConditions: "",
  otherAllergies: "",
  otherSurgeries: "",
  otherActivities: "",
});

onMounted(async () => {
  await fetchProfileData();
  if (originalUserInformation.value === null) {
    isFormChanged.value = true;
  }
});

async function fetchProfileData() {
  isLoading.value = true;
  try {
    const { data } = await getProfileData();
    if (data != null && typeof(data) != "string") {
      // calculates age for display
      data.age = Math.floor(
        (Date.now().valueOf() - new Date(data.birthDate).valueOf()) /
          (1000 * 60 * 60 * 24 * 365)
      );
      // sets original value
      originalUserInformation.value = JSON.parse(JSON.stringify(data));
      if (originalUserInformation.value === null) {
        throw new Error("No user data found");
      }

      // separates other HealthConditions
      const healthConditionKeys = Object.keys(healthConditionsEnum) as Array<keyof typeof healthConditionsEnum>;
      otherUserInformation.value.otherHealthConditions = originalUserInformation.value["healthConditions"]
        .filter( (item: string) => !healthConditionKeys.includes(item as keyof typeof healthConditionsEnum))
        .join(", ");

      // separates other Allergies
      const allergyKeys = Object.keys(allergiesEnum) as Array<keyof typeof allergiesEnum>;
      otherUserInformation.value.otherAllergies = originalUserInformation.value["allergies"]
        .filter( (item: string) => !allergyKeys.includes(item as keyof typeof allergiesEnum))
        .join(", ");

      // separates other Surgeries
      const surgeryKeys = Object.keys(surgeriesEnum) as Array<keyof typeof surgeriesEnum>;
      otherUserInformation.value.otherSurgeries = originalUserInformation.value["surgeries"]
        .filter( (item: string) => !surgeryKeys.includes(item as keyof typeof surgeriesEnum))
        .join(", ");

      userInformation.value = data;

      // makes other selections visible if they exist
      if (otherUserInformation.value.otherHealthConditions !== "") {
        userInformation.value.healthConditions = userInformation.value.healthConditions.filter((item: string) => healthConditionKeys.includes(item as keyof typeof healthConditionsEnum));
        userInformation.value.healthConditions.push("otherDisease");
      }
      if (otherUserInformation.value.otherAllergies !== "") {
        userInformation.value.allergies = userInformation.value.allergies.filter( (item: string) => allergyKeys.includes(item as keyof typeof allergiesEnum))
        userInformation.value.allergies.push("otherAllergy");
      }
      if (otherUserInformation.value.otherSurgeries !== "") {
        userInformation.value.surgeries = userInformation.value.surgeries.filter( (item: string) => surgeryKeys.includes(item as keyof typeof surgeriesEnum))
        userInformation.value.surgeries.push("otherSurgery");
      }
      console.log(userInformation.value);
      console.log(otherUserInformation.value);
    }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  } finally {
    isLoading.value = false;
  }
}

watch(
  userInformation,
  (newVal) => {
    if (!originalUserInformation.value) return;
    isFormChanged.value =
      JSON.stringify(newVal) !== JSON.stringify(originalUserInformation.value);
  },
  { deep: true }
);

async function saveProfile() {
  if (!isFormChanged.value || isSaving.value) return;
  isSaving.value = true;
  let localUserInfo = { ...userInformation.value };
  handleOtherFields(localUserInfo);

  try {
    await insertAnamnese(localUserInfo);
    isFormChanged.value = false;
  } catch (error) {
    console.error("Failed to save profile:", error);
  } finally {
    isSaving.value = false;
  }
}

function handleOtherFields(localUserInfo: UserInformation) {
  // Other allergies
  if (localUserInfo.allergies.includes("otherAllergy")){
    localUserInfo.allergies = localUserInfo.allergies.filter((item) => item !== "otherAllergy");
    if (otherUserInformation.value.otherAllergies !== "")
      localUserInfo.allergies.push(otherUserInformation.value.otherAllergies);
  }

  // Other conditions
  if (localUserInfo.healthConditions.includes("otherDisease")){
    localUserInfo.healthConditions = localUserInfo.healthConditions.filter((item) => item !== "otherDisease");
    if (otherUserInformation.value.otherHealthConditions !== "")
      localUserInfo.healthConditions.push(otherUserInformation.value.otherHealthConditions);
  }

  // Other surgeries
  if (localUserInfo.surgeries.includes("otherSurgery")){
    localUserInfo.surgeries = localUserInfo.surgeries.filter((item) => item !== "otherSurgery");
    if (otherUserInformation.value.otherSurgeries !== "")
      localUserInfo.surgeries.push(otherUserInformation.value.otherSurgeries);
  }

  // Other activity type
  if (localUserInfo.activityType == "otherActivity"){
    if (otherUserInformation.value.otherActivities !== "")
      localUserInfo.activityType = otherUserInformation.value.otherActivities;
  }
}
</script>
