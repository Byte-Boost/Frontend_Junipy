<template>
  <div class="step-container">

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.sleepQuality"
        :title="'Qual a qualidade do seu sono'"
        :options="sleepQuality"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.wakeDuringNight"
        :title="'Acorda durante a noite?'"
        :options="wakeDuringNight"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.bowelFrequency"
        :title="'Quantas vezes por semana você evacua?'"
        :options="bowelFrequency"
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


const sleepQuality = [
  { text: "Boa", value: "boa" },
  { text: "Regular", value: "regular" },
  { text: "Ruim", value: "ruim" },
];
const wakeDuringNight = [
  { text: "Não", value: "0" },
  { text: "Pelo menos 1 x", value: "1" },
  { text: "Mais que 1 x por noite", value: "2+" },
]
const bowelFrequency = [
  { text: "Todo dia", value: "7" },
  { text: "5 x por semana", value: "5" },
  { text: "3 x por semana", value: "3" },
  { text: "1 x por semana", value: "1" },
]
</script>
