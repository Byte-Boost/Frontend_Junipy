<template>
  <CloudyBackground>
    <div class="register-container">
      <div class="register-card">
        <h1 class="text-2xl pb-5">
          {{ $t("auth.register.title") }}
          <p class="text-sm">
            Passo {{ currentStep + 1 }} de {{ steps.length }}
          </p>
        </h1>
        <form @submit.prevent="handleRegister" class="register-form">
          <fieldset v-if="currentStep === 0" class="iconified-input-group">
            <IconifiedInput
              id="name"
              v-model="name"
              type="text"
              :label-text="'auth.register.fields.anamnese.fields.name'"
              :placeholder-text="'auth.register.fields.anamnese.fields.name'"
            >
              <IconUser
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </IconifiedInput>

            <IconifiedInput
              id="profession"
              v-model="profession"
              type="text"
              :label-text="'auth.register.fields.anamnese.fields.profession'"
              :placeholder-text="'auth.register.fields.anamnese.fields.profession'"
            >
              <IconBriefcase
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </IconifiedInput>
            <IconifiedInput
              id="age"
              v-model="age"
              type="number"
              :label-text="'auth.register.fields.anamnese.fields.age'"
              :placeholder-text="'auth.register.fields.anamnese.fields.age'"
              :labelHidden="false"
            >
              <IconHourglass
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </IconifiedInput>
            <IconifiedInput
              id="birthdate"
              :labelHidden="false"
              v-model="birthdate"
              type="date"
              :label-text="'auth.register.fields.anamnese.fields.birthDate'"
              :placeholder-text="'auth.register.fields.anamnese.fields.birthDate'"
            >
              <IconCalendar
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </IconifiedInput>
            <label>
              {{ $t("auth.register.fields.anamnese.fields.sex.label") }}
            </label>
            <select>
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="male">
                {{
                  $t("auth.register.fields.anamnese.fields.sex.choices.male")
                }}
              </option>
              <option value="female">
                {{
                  $t("auth.register.fields.anamnese.fields.sex.choices.female")
                }}
              </option>
            </select>
          </fieldset>
          <fieldset v-else-if="currentStep === 1" class="iconified-input-group">
            <label class="block text-left text-lg font-medium mb-2">
              {{ $t("auth.register.fields.anamnese.fields.allergies.label") }}
              <p class="text-left text-sm text-gray-500">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.allergies.placeholder"
                  )
                }}
              </p>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(allergy, key) in allergiesChoices"
                :key="key"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :id="key"
                  :value="key"
                  v-model="selectedAllergies"
                  @change="handleSelectorChange(key, selectedAllergies)"
                  class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label :for="key" class="ml-2 text-sm text-gray-700">
                  {{ $t(allergy) }}
                </label>
              </div>
            </div>

            <div v-if="selectedAllergies.includes('other')" class="mt-1">
              <input
                id="otherAllergy"
                v-model="otherAllergies"
                type="text"
                placeholder=""
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            <label class="block text-left text-lg font-medium mb-2">
              {{ $t("auth.register.fields.anamnese.fields.surgeries.label") }}
              <p class="text-sm text-gray-500">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.surgeries.placeholder"
                  )
                }}
              </p>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(surgery, key) in surgeriesChoices"
                :key="key"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :id="key"
                  :value="key"
                  v-model="selectedSurgeries"
                  @change="handleSelectorChange(key, selectedSurgeries)"
                  class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label :for="key" class="ml-2 text-sm text-gray-700">
                  {{ $t(surgery) }}
                </label>
              </div>
            </div>

            <div v-if="selectedSurgeries.includes('other')" class="mt-1">
              <input
                id="otherSurgery"
                v-model="otherSurgeries"
                type="text"
                placeholder=""
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
          </fieldset>
          <fieldset v-else-if="currentStep === 2" class="iconified-input-group">
            <label class="block text-left text-lg font-medium mb-2">
              {{ $t("auth.register.fields.anamnese.fields.conditions.label") }}
              <p class="text-left text-sm text-gray-500">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.conditions.placeholder"
                  )
                }}
              </p>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(condition, key) in conditionChoices"
                :key="key"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :id="key"
                  :value="key"
                  v-model="selectedConditions"
                  @change="handleSelectorChange(key, selectedConditions)"
                  class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label :for="key" class="ml-2 text-sm text-gray-700">
                  {{ $t(condition) }}
                </label>
              </div>
            </div>

            <div v-if="selectedConditions.includes('other')" class="mt-4">
              <input
                id="otherCondition"
                v-model="otherCondition"
                type="text"
                placeholder=""
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
          </fieldset>
          <fieldset v-else-if="currentStep === 3" class="iconified-input-group">
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.sleepQuality.description"
                )
              }}
            </label>
            <select>
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="poor">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.sleepQuality.choices.poor"
                  )
                }}
              </option>
              <option value="average">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.sleepQuality.choices.average"
                  )
                }}
              </option>
              <option value="good">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.sleepQuality.choices.good"
                  )
                }}
              </option>
            </select>
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.nightInterruptions.title"
                )
              }}
            </label>
            <select>
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="none">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.nightInterruptions.choices.none"
                  )
                }}
              </option>
              <option value="once">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.nightInterruptions.choices.once"
                  )
                }}
              </option>
              <option value="multiple">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.nightInterruptions.choices.multiple"
                  )
                }}
              </option>
            </select>
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.physicalActivities.label"
                )
              }}
            </label>
            <select>
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="none">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.choices.crossfit"
                  )
                }}
              </option>
              <option value="once">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.choices.musculation"
                  )
                }}
              </option>
              <option value="multiple">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.choices.sedentary"
                  )
                }}
              </option>
              <option value="">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.choices.swimming"
                  )
                }}
              </option>
              <option value="walking">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.choices.walking"
                  )
                }}
              </option>
            </select>
          </fieldset>
          <fieldset v-else-if="currentStep === 5" class="iconified-input-group">
            <IconifiedInput
              id="email"
              v-model="email"
              type="email"
              :label-text="'auth.register.fields.email.label'"
              :placeholder-text="'auth.register.fields.email.placeholder'"
            >
              <IconMail
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
            /></IconifiedInput>
            <IconifiedInput
              id="password"
              v-model="password"
              type="password"
              :label-text="'auth.register.fields.password.label'"
              :placeholder-text="'auth.register.fields.password.placeholder'"
            >
              <IconKey
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </IconifiedInput>
            <IconifiedInput
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              :label-text="'auth.register.fields.confirmPassword.label'"
              :placeholder-text="'auth.register.fields.confirmPassword.placeholder'"
            >
              <IconKey
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </IconifiedInput>
          </fieldset>
          <div class="form-buttons">
            <button
              v-if="currentStep > 0"
              @click="prevStep"
              :disabled="loading"
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
              v-if="!lastStep"
              @click="nextStep"
              :disabled="loading"
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
              type="submit"
              :disabled="loading"
              class="px-4 py-2 flex items-center justify-center gap-2"
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
        </form>

        <p class="extra">
          <a href="/login">{{ $t("auth.register.actions.hasAccount") }}</a>
        </p>
      </div>
    </div>
  </CloudyBackground>
</template>

<script setup>
import { ref } from "vue";
import { register } from "@/scripts/http-requests/endpoints";
import { useRouter } from "vue-router";
import "../styles/views/RegisterView.css";
import CloudyBackground from "@/components/CloudyBackground.vue";
import IconMail from "@/components/icons/IconMail.vue";
import IconKey from "@/components/icons/IconKey.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
import { useToast } from "vue-toastification";
import IconUser from "@/components/icons/IconUser.vue";
import IconifiedInput from "@/components/IconifiedInput.vue";
import IconBriefcase from "@/components/icons/IconBriefcase.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconHourglass from "@/components/icons/IconHourglass.vue";

const lastStep = ref(false);

const router = useRouter();
const loading = ref(false);
const error = ref(null);

const isSaving = ref(false);
const currentStep = ref(0);
const steps = [0, 1, 2, 3, 4, 5];

const toast = useToast();

function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value--;
}

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const profession = ref("");
const birthdate = ref("");
const age = ref("");
const conditionChoices = {
  no: "common.no",
  type1Diabetes:
    "auth.register.fields.anamnese.fields.conditions.choices.type1Diabetes",
  type2Diabetes:
    "auth.register.fields.anamnese.fields.conditions.choices.type2Diabetes",
  hypertension:
    "auth.register.fields.anamnese.fields.conditions.choices.hypertension",
  dyslipidemia:
    "auth.register.fields.anamnese.fields.conditions.choices.dyslipidemia",
  kidneyDisease:
    "auth.register.fields.anamnese.fields.conditions.choices.kidneyDisease",
  liverDisease:
    "auth.register.fields.anamnese.fields.conditions.choices.liverDisease",
  gastritisReflux:
    "auth.register.fields.anamnese.fields.conditions.choices.gastritisReflux",
  intestinalIssues:
    "auth.register.fields.anamnese.fields.conditions.choices.intestinalIssues",
  osteoporosis:
    "auth.register.fields.anamnese.fields.conditions.choices.osteoporosis",
  cardiovascularDisease:
    "auth.register.fields.anamnese.fields.conditions.choices.cardiovascularDisease",
  cancer: "auth.register.fields.anamnese.fields.conditions.choices.cancer",
  depressionAnxiety:
    "auth.register.fields.anamnese.fields.conditions.choices.depressionAnxiety",
  autoimmuneDiseases:
    "auth.register.fields.anamnese.fields.conditions.choices.autoimmuneDiseases",
  other: "common.other",
};
const allergiesChoices = {
  no: "common.no",
  lactoseIntolerance:
    "auth.register.fields.anamnese.fields.allergies.choices.lactoseIntolerance",
  glutenIntolerance:
    "auth.register.fields.anamnese.fields.allergies.choices.glutenIntolerance",
  foodAllergies:
    "auth.register.fields.anamnese.fields.allergies.choices.foodAllergies",
  medicalAllergies:
    "auth.register.fields.anamnese.fields.allergies.choices.medicalAllergies",
  other: "common.other",
};
const surgeriesChoices = {
  no: "common.no",
  bariatric: "auth.register.fields.anamnese.fields.surgeries.choices.bariatric",
  gallbladder:
    "auth.register.fields.anamnese.fields.surgeries.choices.gallbladder",
  hiatalHernia:
    "auth.register.fields.anamnese.fields.surgeries.choices.hiatalHernia",
  orthopedic:
    "auth.register.fields.anamnese.fields.surgeries.choices.orthopedic",
  cesarean: "auth.register.fields.anamnese.fields.surgeries.choices.cesarean",
  other: "common.other",
};
const selectedConditions = ref([]);
const selectedAllergies = ref([]);
const selectedSurgeries = ref([]);
const otherCondition = ref("");
const otherSurgeries = ref("");
const otherAllergies = ref("");

function handleSelectorChange(key, list) {
  if (key === "no") {
    list.value = ["no"];
  } else {
    if (list.value.includes("no")) {
      list.value = [];
    }
    if (!list.value.includes(key)) {
      list.value.push(key);
    }
  }
}

const handleRegister = async () => {
  loading.value = true;
  error.value = null;
  if (
    email.value === "" ||
    name.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    error.value = "All fields are required";
    loading.value = false;
    return;
  }
  try {
    const response = await register(
      email.value,
      name.value,
      password.value,
      confirmPassword.value
    );
    router.push("/login");
  } catch (e) {
    toast.error("Registration failed. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>
