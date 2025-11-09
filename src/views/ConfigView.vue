<template>
  <div class="form-container">
    <!-- Progress header -->
    <header class="form-header">
      <h2>Informações de Usuário</h2>
      <p>Passo {{ currentStep + 1 }} de {{ steps.length }}</p>
    </header>

    <!-- Dynamic form step -->
    <component
      v-if="currentStep === 1"
      :is="steps[currentStep]"
      v-model:userInfo="userInformation"
      v-model:otherHealthConditions="otherHealthConditions"
      v-model:otherAllergies="otherAllergies"
      v-model:otherSurgeries="otherSurgeries"
    />

    <component
      v-else-if="currentStep === 2"
      :is="steps[currentStep]"
      v-model:userInfo="userInformation"
      v-model:otherActivities="otherActivities"
    />

    <component
      v-else
      :is="steps[currentStep]"
      v-model:userInfo="userInformation"
    />

    <!-- Navigation buttons -->
    <div class="form-navigation">
      <div class="flex gap-2">
        <button
          @click="prevStep"
          :disabled="currentStep <= 0"
          class="btn back-btn"
        >
          Voltar
        </button>

        <button
          @click="nextStep"
          :disabled="currentStep >= 4"
          class="btn next-btn"
        >
          Próximo
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
import { patchProfileData } from "@/scripts/http-requests/endpoints";
import type { UserInformation } from "@/models/models";

const steps = [
  Step1PersonalInfo,
  Step2HealthHistory,
  Step3Activity,
  Step4Lifestyle,
  Step5Habits,
];

const currentStep = ref(0);

const isLoading = ref(true);
const isSaving = ref(false);
const isFormChanged = ref(false);

const originalUserInformation = ref<UserInformation | null>(null);
const userInformation = ref<UserInformation>({
  // Page 1
  name: "",
  email: "",
  birthDate: "",
  age: 0,
  sex: "",
  occupation: "",

  // Page 2
  consultationReason: "",
  healthConditions: [],
  allergies: [],
  surgeries: [],

  // Page 3
  activityType: "",
  activityFrequency: "",
  activityDuration: "",

  // Page 4
  sleepQuality: "",
  wakeDuringNight: "",
  bowelFrequency: "",

  // Page 5
  stressLevel: "",
  alcoholConsumption: "",
  smoking: "",
  hydrationLevel: "",
  takesMedication: "",
  medicationDetails: "",
});

const otherHealthConditions = ref("");
const otherAllergies = ref("");
const otherSurgeries = ref("");
const otherActivities = ref("");

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
      data.age = Math.floor(
        (Date.now().valueOf() - new Date(data.birthDate).valueOf()) /
          (1000 * 60 * 60 * 24 * 365)
      );
      originalUserInformation.value = JSON.parse(JSON.stringify(data));
      if (originalUserInformation.value === null) {
        throw new Error("No user data found");
      }
      otherHealthConditions.value = originalUserInformation.value[
        "healthConditions"
      ]
        .filter(
          (item: string) =>
            ![
              "no",
              "type1Diabetes",
              "type2Diabetes",
              "hypertension",
              "dyslipidemia",
              "kidneyDisease",
              "liverDisease",
              "gastritisReflux",
              "intestinalIssues",
              "osteoporose",
              "cardiovascularDisease",
              "cancer",
              "depressionAnxiety",
              "autoimmuneDiseases",
              "other",
            ].includes(item)
        )
        .join(", ");
      otherAllergies.value = originalUserInformation.value["allergies"]
        .filter(
          (item: string) =>
            ![
              "no",
              "lactoseIntolerance",
              "glutenIntolerance",
              "foodAllergies",
              "medicalAllergies",
              "other",
            ].includes(item)
        )
        .join(", ");
      otherSurgeries.value = originalUserInformation.value["surgeries"]
        .filter(
          (item: string) =>
            ![
              "no",
              "bariatric",
              "gallbladder",
              "hiatalHernia",
              "orthopedic",
              "cesarean",
              "other",
            ].includes(item)
        )
        .join(", ");
      userInformation.value = data;
      console.log(userInformation);
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
  if (localUserInfo.healthConditions.includes("outra")) {
    localUserInfo.healthConditions = localUserInfo.healthConditions.filter(
      (item) => item !== "outra"
    );
    localUserInfo.healthConditions.push(otherHealthConditions.value);
  }
  if (localUserInfo.allergies.includes("outra")) {
    localUserInfo.allergies = localUserInfo.allergies.filter(
      (item) => item !== "outra"
    );
    localUserInfo.allergies.push(otherAllergies.value);
  }
  if (localUserInfo.surgeries.includes("outra")) {
    localUserInfo.surgeries = localUserInfo.surgeries.filter(
      (item) => item !== "outra"
    );
    localUserInfo.surgeries.push(otherSurgeries.value);
  }
  if (localUserInfo.activityType === "outro") {
    localUserInfo.activityType = otherActivities.value;
  }

  try {
    await patchProfileData(localUserInfo);
    isFormChanged.value = false;
  } catch (error) {
    console.error("Failed to save profile:", error);
  } finally {
    isSaving.value = false;
  }
}

function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value--;
}
</script>
