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
      />
    </div>
    <div
      class="form-row"
      v-if="localUserInfo.healthConditions.includes('outra')"
    >
      <input v-model="localOtherHealthConditions" type="text" />
    </div>

    <div class="form-row">
      <CheckboxGroup
        v-model="userInfo.allergies"
        :title="$t('auth.register.fields.anamnese.fields.allergies.label')"
        :options="allergiesOptions"
      />
    </div>
    <div class="form-row" v-if="localUserInfo.allergies.includes('outra')">
      <input v-model="localOtherAllergies" type="text" />
    </div>

    <div class="form-row">
      <CheckboxGroup
        v-model="localUserInfo.surgeries"
        :title="$t('auth.register.fields.anamnese.fields.surgeries.label')"
        :options="surgeriesOptions"
      />
    </div>
    <div class="form-row" v-if="localUserInfo.surgeries.includes('outra')">
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
    value: "emagrecimento",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.muscleGain"
    ),
    value: "ganho_massa",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.diabetesControl"
    ),
    value: "controle_diabetes",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.eatingReeducation"
    ),
    value: "reeducacao_alimentar",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.consultationReason.choices.physicalMentalPerformance"
    ),
    value: "performance_fisica",
  },
];
const healthConditionsOptions = [
  { text: t("common.no"), value: "" },
  { text: "Diabetes tipo 1", value: "diabetes1" },
  { text: "Diabetes tipo 2", value: "diabetes2" },
  { text: "Hipertensão arterial", value: "hipertensao" },
  { text: "Dislipidemia (colesterol, triglicerídeos)", value: "dislipidemia" },
  { text: "Doença renal", value: "doenca_renal" },
  { text: "Doença hepática", value: "doenca_hepatica" },
  { text: "Gastrite / refluxo", value: "gastrite" },
  { text: "Intestino preso / diarreia", value: "intestino" },
  { text: "Osteoporose", value: "osteoporose" },
  {
    text: "Doença cardiovascular (infarto, insuficiência cardíaca)",
    value: "cardiovascular",
  },
  { text: "Câncer", value: "cancer" },
  { text: "Depressão / Ansiedade", value: "depressao" },
  { text: "Doenças autoimunes", value: "autoimunes" },
  { text: "Outra: ", value: "outra" },
];
const allergiesOptions = [
  { text: t("common.no"), value: "" },
  {
    text: t(
      "auth.register.fields.anamnese.fields.allergies.choices.lactoseIntolerance"
    ),
    value: "lactose",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.allergies.choices.glutenIntolerance"
    ),
    value: "gluten",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.allergies.choices.foodAllergies"
    ),
    value: "alimentar",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.allergies.choices.medicalAllergies"
    ),
    value: "medicamentosa",
  },
  { text: t("common.other"), value: "outra" },
];
const surgeriesOptions = [
  { text: t("common.no"), value: "" },
  {
    text: t("auth.register.fields.anamnese.fields.surgeries.choices.bariatric"),
    value: "bariatrica",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.surgeries.choices.gallbladder"
    ),
    value: "vesicula",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.surgeries.choices.hiatalHernia"
    ),
    value: "hernia_hiato",
  },
  {
    text: t(
      "auth.register.fields.anamnese.fields.surgeries.choices.orthopedic"
    ),
    value: "ortopedica",
  },
  {
    text: t("auth.register.fields.anamnese.fields.surgeries.choices.cesarean"),
    value: "cesarea",
  },
  { text: t("common.other"), value: "outra" },
];
</script>
