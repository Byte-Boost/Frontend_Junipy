<template>
  <div class="step-container">

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.activityType"
        :title="'Qual atividade mais te descreve?'"
        :options="activityOptions"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.activityFrequency"
        :title="'Com que frequência pratica Atividade física?'"
        :options="activityFrequency"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.activityDuration"
        :title="'Quantos minutos por dia de Atividade fisica?'"
        :options="activityDuration"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import "../../styles/components/Forms.css";
import type { UserInformation } from "@/models/models";
import RadioGroup from "../RadioGroup.vue";

const props = defineProps<{ userInfo: UserInformation }>();
const emit = defineEmits<{ (e: "update:userInfo", value: UserInformation): void }>();


const activityOptions = [
  { text: "Sedentário(a)", value: "sedentario" },
  { text: "Caminhada", value: "caminhada" },
  { text: "Musculação", value: "musculacao" },
  { text: "Corrida", value: "corrida" },
  { text: "Crossfit", value: "crossfit" },
  { text: "Natação", value: "natacao" },
  { text: "Outro", value: "outro" },
];
const activityFrequency = [
  { text: "Nunca", value: "0" },
  { text: "1-2x por semana", value: "1-2" },
  { text: "3-4x por semana", value: "3-4" },
  { text: "5 ou mais vezes por semana", value: "5+" },
]
const activityDuration = [
  { text: "Não pratico", value: "0" },
  { text: "30 minutos", value: "30" },
  { text: "60 minutos", value: "60" },
  { text: "90 minutos", value: "90" },
]
</script>
