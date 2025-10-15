<template>
  <div class="step-container">

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.consultationReason"
        :title="'Qual o principal motivo da sua consulta?'"
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

    <div class="form-row">
      <CheckboxGroup
        v-model="userInfo.allergies"
        :title="'Possui alguma alergia ou intolerância'"
        :options="allergiesOptions"
      />
    </div>

    <div class="form-row"> 
      <CheckboxGroup
        v-model="localUserInfo.surgeries"
        :title="'Você já realizou alguma cirurgia?'"
        :options="surgeriesOptions"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import "../../styles/components/Forms.css";
import type { UserInformation } from "@/models/models";
import { computed } from "vue";
import RadioGroup from "../RadioGroup.vue";
import CheckboxGroup from "../CheckboxGroup.vue";

const props = defineProps<{ userInfo: UserInformation }>();
const emit = defineEmits<{ (e: "update:userInfo", value: UserInformation): void }>();

const localUserInfo = computed({
  get: () => props.userInfo,
  set: (value) => emit("update:userInfo", value),
});

const consultationOptions = [
  { text: "Emagrecimento", value: "emagrecimento" },
  { text: "Ganho de massa muscular", value: "ganho_massa" },
  { text: "Controle de diabetes", value: "controle_diabetes" },
  { text: "Reeducação alimentar", value: "reeducacao_alimentar" },
  { text: "Performance física e mental", value: "performance_fisica" },
];
const healthConditionsOptions = [
  { text: "Não", value: "" },
  { text: "Diabetes tipo 1", value: "diabetes1" },
  { text: "Diabetes tipo 2", value: "diabetes2" },
  { text: "Hipertensão arterial", value: "hipertensao" },
  { text: "Dislipidemia (colesterol, triglicerídeos)", value: "dislipidemia" },
  { text: "Doença renal", value: "doenca_renal" },
  { text: "Doença hepática", value: "doenca_hepatica" },
  { text: "Gastrite / refluxo", value: "gastrite" },
  { text: "Intestino preso / diarreia", value: "intestino" },
  { text: "Osteoporose", value: "osteoporose" },
  { text: "Doença cardiovascular (infarto, insuficiência cardíaca)", value: "cardiovascular" },
  { text: "Câncer", value: "cancer" },
  { text: "Depressão / Ansiedade", value: "depressao" },
  { text: "Doenças autoimunes", value: "autoimunes" },
  { text: "Outra", value: "outra" },
];
const allergiesOptions = [
  { text: "Não", value: "" },
  { text: "Intolerância à lactose", value: "lactose" },
  { text: "Sensibilidade ao glúten / doença celíaca", value: "gluten" },
  { text: "Alergia alimentar", value: "alimentar" },
  { text: "Alergia medicamentosa", value: "medicamentosa" },
  { text: "Outra", value: "outra" },
];
const surgeriesOptions = [
  { text: "Não", value: "" },
  { text: "Bariátrica", value: "bariatrica" },
  { text: "Vesícula", value: "vesicula" },
  { text: "Hérnia de hiato (cirurgia do refluxo)", value: "hernia_hiato" },
  { text: "Ortopédica", value: "ortopedica" },
  { text: "Cesárea / Ginecológica", value: "cesarea" },
  { text: "Outra", value: "outra" },
];
</script>
