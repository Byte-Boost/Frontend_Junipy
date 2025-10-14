<template>
  <div class="form-container">
    <!-- Progress header -->
    <header class="form-header">
      <h2>User Information</h2>
      <p>Step {{ currentStep + 1 }} of {{ steps.length }}</p>
    </header>

    <!-- Dynamic form step -->
    <component
      :is="steps[currentStep]"
      v-model:userInfo="userInformation"
      class="form-step"
    />

    <!-- Navigation buttons -->
    <div class="form-navigation">
      <button
        v-if="currentStep > 0"
        @click="prevStep"
        class="btn back-btn"
      >
        Back
      </button>

      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        class="btn next-btn"
      >
        Next
      </button>

      <button
        v-else
        @click="submitForm"
        class="btn submit-btn"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../styles/views/ConfigView.css";
import { ref } from "vue";

// Step components
import Step1PersonalInfo from "@/components/forms/Step1PersonalInfo.vue";
import Step2HealthHistory from "@/components/forms/Step2HealthHistory.vue";
import Step3Activity from "@/components/forms/Step3Activity.vue";
import Step4Lifestyle from "@/components/forms/Step4Lifestyle.vue";
import Step5Habits from "@/components/forms/Step5Habits.vue";
import type { UserInformation } from "@/models/models";

// Steps list
const steps = [
  Step1PersonalInfo,
  Step2HealthHistory,
  Step3Activity,
  Step4Lifestyle,
  Step5Habits,
];

// State
const currentStep = ref(0);
const userInformation = ref<UserInformation>({
  // Page 1
  name: "",
  birthDate: new Date(),
  age: 0,
  gender: "",
  occupation: "",
  consultationReason: "",

  // Page 2
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
  stressLevel: "",

  // Page 5
  alcoholConsumption: "",
  smoking: "",
  hydrationLevel: "",
  takesMedication: "",
  medicationDetails: "",
});

// Navigation
function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value--;
}

async function submitForm() {
  console.log("Submitting form:", userInformation.value);
  // Replace with actual API call later
  alert("Form submitted successfully!");
}
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.back-btn {
  background-color: #f2f2f2;
}

.next-btn {
  background-color: #007bff;
  color: white;
}

.submit-btn {
  background-color: #28a745;
  color: white;
}

.form-step {
  margin-top: 1rem;
}
</style>
