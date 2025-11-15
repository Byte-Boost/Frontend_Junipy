<template>
  <CloudyBackground>
    <div class="register-container">
      <div v-if="currentStep === 0" class="register-card">
        <component
          :is="steps[currentStep]"
          v-model:userInfo="userCredentials"
        />
        <div class="register-card-footer">
          <div class="register-card-buttons">
            <button class="px-4 py-2 flex items-center justify-center gap-2"
              @click="handleRegister()"
              :disabled="loading"
            >
              <template v-if="loading">
                <div
                  class="w-6 h-6 border-4 border-gray-300 border-t-[#48b684] rounded-full animate-spin"
                ></div>
              </template>
              <template v-else>
                {{ $t("auth.register.actions.submit") }}
              </template>
              <IconRightArrow class="w-5 h-5" />
            </button>
          </div>
  
          <p class="extra">
            <span>{{ $t("auth.register.actions.hasAccount") }}</span> <a href="/login">{{ $t("auth.register.actions.hasAccountOption") }} </a>
          </p>
        </div>
      </div>

      <div v-else class="register-anamnese-card">
        
        <h1 class="register-card-title text-2xl pb-5">
          {{ $t("auth.register.title") }}
          <a class="register-anamnese-skip" href="/login">{{ $t("auth.register.fields.anamnese.actions.skip") }}</a>
          <p class="text-sm">
            Passo {{ currentStep }} de {{ steps.length - 1 }}
          </p>
        </h1>

        <div class="register-card-form">
          <component
            v-if="currentStep === 2"
            :is="steps[currentStep]"
            v-model:userInfo="userInformation"
            v-model:otherHealthConditions="otherUserInformation.otherHealthConditions"
            v-model:otherAllergies="otherUserInformation.otherAllergies"
            v-model:otherSurgeries="otherUserInformation.otherSurgeries"
          />
      
          <component
            v-else-if="currentStep === 3"
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

        <div class="register-card-footer">
          <div class="register-card-buttons">
            <button
              v-if="currentStep > 1"
              @click="prevStep"
              :disabled="loading"
              type="button"
              class="px-4 py-2 flex items-center justify-center gap-2"
            >
              <template v-if="loading">
                <div
                  class="w-6 h-6 border-4 border-gray-300 border-t-[#48b684] rounded-full animate-spin"
                ></div>
              </template>
              <template v-else>
                {{ $t("common.back") }}
              </template>
            </button>
            <button
              v-if="currentStep < steps.length - 1"
              @click="nextStep"
              :disabled="loading"
              type="button"
              class="px-4 py-2 flex items-center justify-center gap-2"
            >
              <template v-if="loading">
                <div
                  class="w-6 h-6 border-4 border-gray-300 border-t-[#48b684] rounded-full animate-spin"
                ></div>
              </template>
              <template v-else>
                {{ $t("common.next") }}
              </template>
              <IconRightArrow class="w-5 h-5" />
            </button>
            <button
              v-else
              @click="handleAnamneseSubmit()"
              :disabled="loading"
              class="px-4 py-2 flex items-center justify-center gap-2"
            >
              <template v-if="loading">
                <div
                  class="w-6 h-6 border-4 border-gray-300 border-t-[#48b684] rounded-full animate-spin"
                ></div>
              </template>
              <template v-else>
                {{ $t("auth.register.fields.anamnese.actions.submit") }}
              </template>
              <IconRightArrow class="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  </CloudyBackground>
</template>

<script setup lang="ts">
import Step0Register from "@/components/forms/Step0Register.vue";
import Step1PersonalInfo from "@/components/forms/Step1PersonalInfo.vue";
import Step2HealthHistory from "@/components/forms/Step2HealthHistory.vue";
import Step3Activity from "@/components/forms/Step3Activity.vue";
import Step4Lifestyle from "@/components/forms/Step4Lifestyle.vue";
import Step5Habits from "@/components/forms/Step5Habits.vue";
import { ref } from "vue";
import { insertAnamnese, login, register } from "@/scripts/http-requests/endpoints";
import { useRouter } from "vue-router";
import "../styles/views/RegisterView.css";
import CloudyBackground from "@/components/CloudyBackground.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
import { useToast } from "vue-toastification";
import type { UserInformation } from "@/models/models";
import { useTypedI18n } from "@/composables/useI18n";
import { hasNullValues, successAlert } from "@/scripts/utils/utils";

const { t } = useTypedI18n();

const router = useRouter();
const loading = ref(false);

const currentStep = ref(0);
const steps = [
  Step0Register,
  Step1PersonalInfo,
  Step2HealthHistory,
  Step3Activity,
  Step4Lifestyle,
  Step5Habits,
];

const toast = useToast();

function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--;
}

const userCredentials = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
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

const handleRegister = async () => {
  let user = {
    username: userCredentials.value.username,
    email: userCredentials.value.email,
    password: userCredentials.value.password??"",
    confirmPassword: userCredentials.value.confirmPassword??"",
  };
  
  loading.value = true;
  if (hasNullValues(user)) {
    toast.error(t("errors.auth.registrationFailed"));
    loading.value = false;
    return;
  }
  if (user.password !== user.confirmPassword) {
    toast.error(t("errors.auth.passwordMismatch"));
    loading.value = false;
    return;
  }

  try {
    const registerResponse = await register(user);
    successAlert(t("auth.register.success"), "User registered successfully");
    
    const loginResponse = (await login(user.email, user.password));
    if (loginResponse.token) {
      localStorage.setItem("token", loginResponse.token);
    }

    userInformation.value.email = userCredentials.value.email;
    userInformation.value.name = userCredentials.value.username;
    nextStep();
  } catch (e) {
    toast.error(t("errors.server.generic"));
  } finally {
    loading.value = false;
  }


};

const handleOtherFields = async () => {
  // No allergies, Other allergies
  userInformation.value.allergies = userInformation.value.allergies.filter((item) => item !== "noAllergy");
  if (userInformation.value.allergies.includes("otherAllergy")){
    userInformation.value.allergies = userInformation.value.allergies.filter((item) => item !== "otherAllergy");
    if (otherUserInformation.value.otherAllergies !== "")
      userInformation.value.allergies.push(otherUserInformation.value.otherAllergies);
  }

  // No conditions, Other conditions
  userInformation.value.healthConditions = userInformation.value.healthConditions.filter((item) => item !== "noCondition");
  if (userInformation.value.healthConditions.includes("otherDisease")){
    userInformation.value.healthConditions = userInformation.value.healthConditions.filter((item) => item !== "otherDisease");
    if (otherUserInformation.value.otherHealthConditions !== "")
      userInformation.value.healthConditions.push(otherUserInformation.value.otherHealthConditions);
  }

  // No surgeries, Other surgeries
  userInformation.value.surgeries = userInformation.value.surgeries.filter((item) => item !== "noSurgery");
  if (userInformation.value.surgeries.includes("otherSurgery")){
    userInformation.value.surgeries = userInformation.value.surgeries.filter((item) => item !== "otherSurgery");
    if (otherUserInformation.value.otherSurgeries !== "")
      userInformation.value.surgeries.push(otherUserInformation.value.otherSurgeries);
  }

  // Other activity type
  if (userInformation.value.activityType == "otherActivity"){
    if (otherUserInformation.value.otherActivities !== "")
      userInformation.value.activityType = otherUserInformation.value.otherActivities;
  }
}
const handleAnamneseSubmit = async () => {
  await handleOtherFields();
  loading.value = true;
  try {
    const response = await insertAnamnese(userInformation.value);
    successAlert(t("auth.register.fields.anamnese.success"), "Anamnese submitted successfully");
    router.push("/login");
  } catch (e) {
    toast.error(t("errors.server.generic"));
  } finally {
    loading.value = false;
  }
};

</script>
