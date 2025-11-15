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
              v-model:inputModel="name"
              type="text"
              :label-text="'auth.register.fields.anamnese.fields.name'"
              :placeholder-text="'auth.register.fields.anamnese.fields.name'"
            >
              <IconUser
                class="absolute left-3 text-gray-400 peer-focus:text-black transition-colors"
              />
            </IconifiedInput>

            <IconifiedInput
              id="profession"
              v-model:inputModel="profession"
              type="text"
              :label-text="'auth.register.fields.anamnese.fields.profession'"
              :placeholder-text="'auth.register.fields.anamnese.fields.profession'"
            >
              <IconBriefcase
                class="absolute left-3 text-gray-400 peer-focus:text-black transition-colors"
              />
            </IconifiedInput>

            <IconifiedInput
              id="birthdate"
              :labelHidden="false"
              v-model:inputModel="birthdate"
              type="date"
              :label-text="'auth.register.fields.anamnese.fields.birthDate'"
              :placeholder-text="'auth.register.fields.anamnese.fields.birthDate'"
            >
              <IconCalendar
                class="absolute left-3 text-gray-400 peer-focus:text-black transition-colors"
              />
            </IconifiedInput>
            <label>
              {{ $t("auth.register.fields.anamnese.fields.sex.label") }}
            </label>
            <select v-model="sex">
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
            <select v-model="sleepQuality">
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
            <select v-model="wakeDuringNight">
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
            <select v-model="activityType">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="crossfit">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.choices.crossfit"
                  )
                }}
              </option>
              <option value="weightlifting">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.choices.musculation"
                  )
                }}
              </option>
              <option value="sedentary">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.choices.sedentary"
                  )
                }}
              </option>
              <option value="swimming">
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
              <!-- <option value="other">
                {{ $t("common.other") }}
              </option> -->
            </select>
            <!-- <div v-if="activityType.includes('other')" class="mt-1">
              <input
                id="otherActivity"
                v-model="otherActivities"
                type="text"
                placeholder=""
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div> -->
          </fieldset>
          <fieldset v-else-if="currentStep === 4" class="iconified-input-group">
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.physicalActivities.frequency.title"
                )
              }}
            </label>
            <select v-model="activityFrequency">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="never">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.frequency.choices.never"
                  )
                }}
              </option>
              <option value="1-2 times/week">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.frequency.choices.1-2"
                  )
                }}
              </option>
              <option value="3-4 times/week">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.frequency.choices.3-4"
                  )
                }}
              </option>
              <option value="5-6 times/week">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.frequency.choices.5+"
                  )
                }}
              </option>
            </select>
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.physicalActivities.time.title"
                )
              }}
            </label>
            <select v-model="activityDuration">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="0min">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.time.choices.none"
                  )
                }}
              </option>
              <option value="30min">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.time.choices.30"
                  )
                }}
              </option>
              <option value="60min">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.time.choices.60"
                  )
                }}
              </option>
              <option value="90min">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.physicalActivities.time.choices.90"
                  )
                }}
              </option>
            </select>

            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.dayToDay.fields.alcoholConsumption.title"
                )
              }}
            </label>
            <select v-model="alcoholConsumption">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="none">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.alcoholConsumption.choices.none"
                  )
                }}
              </option>
              <option value="social">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.alcoholConsumption.choices.social"
                  )
                }}
              </option>
              <option value="frequent">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.alcoholConsumption.choices.frequent"
                  )
                }}
              </option>
              <option value="daily">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.alcoholConsumption.choices.daily"
                  )
                }}
              </option>
            </select>
          </fieldset>
          <fieldset v-else-if="currentStep === 5" class="iconified-input-group">
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.dayToDay.fields.hydration.title"
                )
              }}
            </label>
            <select v-model="hydrationLevel">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="less than 1L">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.hydration.choices.lessThan1L"
                  )
                }}
              </option>
              <option value="1-2L">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.hydration.choices.between1And2L"
                  )
                }}
              </option>
              <option value="more than 2L">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.hydration.choices.moreThan2L"
                  )
                }}
              </option>
            </select>
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.dayToDay.fields.stress.title"
                )
              }}
            </label>
            <select v-model="stressLevel">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="low">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.stress.choices.low"
                  )
                }}
              </option>
              <option value="moderate">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.stress.choices.moderate"
                  )
                }}
              </option>
              <option value="high">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.dayToDay.fields.stress.choices.high"
                  )
                }}
              </option>
            </select>

            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.dayToDay.fields.smoking.title"
                )
              }}
            </label>
            <select v-model="smoking">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="yes">
                {{ $t("common.yes") }}
              </option>
              <option value="no">
                {{ $t("common.no") }}
              </option>
            </select>
          </fieldset>
          <fieldset v-else-if="currentStep === 6" class="iconified-input-group">
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.intestinalHabits.title"
                )
              }}
            </label>
            <select v-model="intestinalHabits">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="everyday">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.intestinalHabits.choices.daily"
                  )
                }}
              </option>
              <option value="five per week">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.intestinalHabits.choices.fivePerWeek"
                  )
                }}
              </option>
              <option value="three per week">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.intestinalHabits.choices.threePerWeek"
                  )
                }}
              </option>
              <option value="once per week">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.intestinalHabits.choices.oncePerWeek"
                  )
                }}
              </option>
            </select>
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.consultationReason.label"
                )
              }}
            </label>
            <select v-model="consultationReason">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="diabetesControl">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.consultationReason.choices.diabetesControl"
                  )
                }}
              </option>
              <option value="eatingReeducation">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.consultationReason.choices.eatingReeducation"
                  )
                }}
              </option>
              <option value="weightLoss">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.consultationReason.choices.weightLoss"
                  )
                }}
              </option>
              <option value="physicalMentalPerformance">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.consultationReason.choices.physicalMentalPerformance"
                  )
                }}
              </option>
              <option value="muscleGain">
                {{
                  $t(
                    "auth.register.fields.anamnese.fields.consultationReason.choices.muscleGain"
                  )
                }}
              </option>
            </select>
            <label>
              {{
                $t(
                  "auth.register.fields.anamnese.fields.dayToDay.fields.medications.description"
                )
              }}
            </label>
            <select v-model="takesMedication">
              <option disabled value="">
                {{ $t("common.select.placeholder") }}
              </option>
              <option value="yes">
                {{ $t("common.yes") }}
              </option>
              <option value="no">
                {{ $t("common.no") }}
              </option>
            </select>
            <div v-if="takesMedication === 'yes'" class="mt-2">
              <input
                id="medicationDetailsInput"
                v-model="medicationDetails"
                type="text"
                placeholder=""
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
          </fieldset>
          <fieldset v-else-if="currentStep === 7" class="iconified-input-group">
            <IconifiedInput
              id="email"
              v-model:inputModel="email"
              type="email"
              :label-text="'auth.register.fields.email.label'"
              :placeholder-text="'auth.register.fields.email.placeholder'"
            >
              <IconMail
                class="absolute left-3 text-gray-400 peer-focus:text-black transition-colors"
            /></IconifiedInput>
            <IconifiedInput
              id="password"
              v-model:inputModel="password"
              type="password"
              :label-text="'auth.register.fields.password.label'"
              :placeholder-text="'auth.register.fields.password.placeholder'"
            >
              <IconKey
                class="absolute left-3 text-gray-400 peer-focus:text-black transition-colors"
              />
            </IconifiedInput>
            <IconifiedInput
              id="confirm-password"
              v-model:inputModel="confirmPassword"
              type="password"
              :label-text="'auth.register.fields.confirmPassword.label'"
              :placeholder-text="'auth.register.fields.confirmPassword.placeholder'"
            >
              <IconKey
                class="absolute left-3 text-gray-400 peer-focus:text-black transition-colors"
              />
            </IconifiedInput>
          </fieldset>

          <div class="form-buttons">
            <button
              v-if="currentStep > 0"
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

<script setup lang="ts">
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
import type { UserInformation } from "@/models/models";
import { useTypedI18n } from "@/composables/useI18n";
import { hasNullValues } from "@/scripts/utils/utils";

const { t } = useTypedI18n();

const router = useRouter();
const loading = ref(false);

const isSaving = ref(false);
const currentStep = ref(0);
const steps = [0, 1, 2, 3, 4, 5, 6, 7];

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
const age = ref(0);
const sex = ref("");

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

const activityType = ref("");
const activityFrequency = ref("");
const activityDuration = ref("");
const sleepQuality = ref("");
const wakeDuringNight = ref("");
const intestinalHabits = ref("");
const stressLevel = ref("");
const alcoholConsumption = ref("");
const smoking = ref("");
const hydrationLevel = ref("");
const takesMedication = ref("");
const medicationDetails = ref("");
const consultationReason = ref("");

const selectedConditions = ref<string[]>([]);
const selectedAllergies = ref<string[]>([]);
const selectedSurgeries = ref<string[]>([]);
const otherCondition = ref("");
const otherSurgeries = ref("");
const otherAllergies = ref("");
const otherActivities = ref("");

function handleSelectorChange(key: string, list: any) {
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
  selectedAllergies.value.push(otherAllergies.value);
  selectedSurgeries.value.push(otherSurgeries.value);
  selectedConditions.value.push(otherCondition.value);
  age.value =
    new Date().getFullYear() - new Date(birthdate.value).getFullYear();
  let user = {
    username: name.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };
  let userInfo: UserInformation = {
    name: name.value,
    email: email.value,
    sex: sex.value,
    age: age.value,
    birthDate: birthdate.value,
    occupation: profession.value,
    healthConditions: selectedConditions.value,
    allergies: selectedAllergies.value,
    surgeries: selectedSurgeries.value,
    activityType: activityType.value,
    activityFrequency: activityFrequency.value,
    activityDuration: activityDuration.value,
    sleepQuality: sleepQuality.value,
    wakeDuringNight: wakeDuringNight.value,
    bowelFrequency: intestinalHabits.value,
    stressLevel: stressLevel.value,
    alcoholConsumption: alcoholConsumption.value,
    smoking: smoking.value,
    hydrationLevel: hydrationLevel.value,
    takesMedication: takesMedication.value,
    medicationDetails: medicationDetails.value || "N/A",
    consultationReason: consultationReason.value,
  };
  loading.value = true;
  console.log(user);
  console.log(userInfo);
  if (hasNullValues(user) || hasNullValues(userInfo)) {
    toast.error(t("errors.auth.anamneseIncomplete"));
    loading.value = false;
    return;
  }
  userInfo = sanitizeAndValidatePayload(userInfo);
  user = sanitizeAndValidatePayload(user);
  try {
    const response = await register(user, userInfo);
    router.push("/login");
  } catch (e) {
    toast.error(t("errors.server.generic"));
  } finally {
    loading.value = false;
  }
};
function sanitizeAndValidatePayload<T extends Record<string, any>>(
  payload: T
): T {
  const sanitizedPayload = { ...payload };

  for (const key in sanitizedPayload) {
    const value = sanitizedPayload[key];

    if (Array.isArray(value)) {
      const filtered = Array.from(new Set(value)).filter((item) => {
        if (item === null || item === undefined) return false;
        return typeof item === "string"
          ? item.trim() !== ""
          : String(item).trim() !== "";
      });
      sanitizedPayload[key] = filtered as unknown as T[Extract<
        keyof T,
        string
      >];
    }

    if (key === "birthDate" && sanitizedPayload["age"] !== undefined) {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }
      sanitizedPayload["age"] = calculatedAge;
    }
  }

  return sanitizedPayload;
}
</script>
