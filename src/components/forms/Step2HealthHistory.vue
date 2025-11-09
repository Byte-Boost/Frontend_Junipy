<template>
  <div class="step-container">
    <div class="form-row">
      <RadioGroup
        v-model="userInfo.consultationReason"
        :title="
          $t('auth.register.fields.anamnese.fields.consultationReason.label')
        "
        :options="consultationOptions"
      />
    </div>

    <div class="form-row">
      <CheckboxGroup
        v-model="userInfo.healthConditions"
        :title="'Você possui ou já teve alguma das condições abaixo?'"
        :options="healthConditionsOptions"
        exclusive-value="no"
      />
    </div>
    <div
      class="form-row"
      v-if="localUserInfo.healthConditions.includes('other')"
    >
      <input v-model="localOtherHealthConditions" type="text" />
    </div>

    <div class="form-row">
      <CheckboxGroup
        v-model="userInfo.allergies"
        :title="$t('auth.register.fields.anamnese.fields.allergies.label')"
        :options="allergiesOptions"
        exclusive-value="no"
      />
    </div>
    <div class="form-row" v-if="localUserInfo.allergies.includes('other')">
      <input v-model="localOtherAllergies" type="text" />
    </div>

    <div class="form-row">
      <CheckboxGroup
        v-model="localUserInfo.surgeries"
        :title="$t('auth.register.fields.anamnese.fields.surgeries.label')"
        :options="surgeriesOptions"
        exclusive-value="no"
      />
    </div>
    <div class="form-row" v-if="localUserInfo.surgeries.includes('other')">
      <input v-model="localOtherSurgeries" type="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import "../../styles/components/Forms.css";
import type { UserInformation } from "@/models/models";
import { computed } from "vue";
import RadioGroup from "../RadioGroup.vue";
import CheckboxGroup from "../CheckboxGroup.vue";
import { useTypedI18n } from "@/composables/useI18n";

const { t } = useTypedI18n();
const props = defineProps<{
  userInfo: UserInformation;
  otherHealthConditions: string;
  otherAllergies: string;
  otherSurgeries: string;
}>();
const emit = defineEmits<{
  (e: "update:userInfo", value: UserInformation): void;
  (e: "update:otherHealthConditions", value: string): void;
  (e: "update:otherAllergies", value: string): void;
  (e: "update:otherSurgeries", value: string): void;
}>();

const localUserInfo = computed({
  get: () => props.userInfo,
  set: (value) => emit("update:userInfo", value),
});
const localOtherHealthConditions = computed({
  get: () => props.otherHealthConditions,
  set: (val) => emit("update:otherHealthConditions", val),
});
const localOtherAllergies = computed({
  get: () => props.otherAllergies,
  set: (val) => emit("update:otherAllergies", val),
});
const localOtherSurgeries = computed({
  get: () => props.otherSurgeries,
  set: (val) => emit("update:otherSurgeries", val),
});

const consultationOptions = [
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.weightLoss"
    ),
    value: "weightLoss",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.muscleGain"
    ),
    value: "muscleGain",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.diabetesControl"
    ),
    value: "diabetesControl",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.eatingReeducation"
    ),
    value: "eatingReeducation",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.physicalMentalPerformance"
    ),
    value: "physicalMentalPerformance",
  },
];
const healthConditionsOptions = [
  { text: t("common.no"), value: "no" },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.type1Diabetes"
    ),
    value: "type1Diabetes",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.type2Diabetes"
    ),
    value: "type2Diabetes",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.hypertension"
    ),
    value: "hypertension",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.dyslipidemia"
    ),
    value: "dyslipidemia",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.kidneyDisease"
    ),
    value: "kidneyDisease",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.liverDisease"
    ),
    value: "liverDisease",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.gastritisReflux"
    ),
    value: "gastritisReflux",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.intestinalIssues"
    ),
    value: "intestinalIssues",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.osteoporosis"
    ),
    value: "osteoporose",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.cardiovascularDisease"
    ),
    value: "cardiovascularDisease",
  },
  {
    text: t("auth.register.fields.anamnese.fields.conditions.choices.cancer"),
    value: "cancer",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.depressionAnxiety"
    ),
    value: "depressionAnxiety",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.conditions.choices.autoimmuneDiseases"
    ),
    value: "autoimmuneDiseases",
  },
  {
    text: t("common.other"),
    value: "other",
  },
];
const allergiesOptions = [
  { text: t("common.no"), value: "no" },
  {
    text: t(
      "auth.register.fields.anamnese.fields.allergies.choices.lactoseIntolerance"
    ),
    value: "lactoseIntolerance",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.allergies.choices.glutenIntolerance"
    ),
    value: "glutenIntolerance",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.allergies.choices.foodAllergies"
    ),
    value: "foodAllergies",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.allergies.choices.medicalAllergies"
    ),
    value: "medicalAllergies",
  },
  { text: t("common.other"), value: "other" },
];
const surgeriesOptions = [
  { text: t("common.no"), value: "no" },
  {
    text: t("auth.register.fields.anamnese.fields.surgeries.choices.bariatric"),
    value: "bariatric",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.surgeries.choices.gallbladder"
    ),
    value: "gallbladder",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.surgeries.choices.hiatalHernia"
    ),
    value: "hiatalHernia",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.surgeries.choices.orthopedic"
    ),
    value: "orthopedic",
  },
  {
    text: t("auth.register.fields.anamnese.fields.surgeries.choices.cesarean"),
    value: "cesarean",
  },
  { text: t("common.other"), value: "other" },
];
</script>
