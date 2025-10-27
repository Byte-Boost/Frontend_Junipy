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
const emit = defineEmits<{
  (e: "update:userInfo", value: UserInformation): void;
}>();

const sleepQuality = [
  { text: "Boa", value: "good" },
  { text: "Regular", value: "average" },
  { text: "Ruim", value: "bad" },
];
const wakeDuringNight = [
  { text: "Não", value: "no" },
  { text: "Pelo menos 1 x", value: "once" },
  { text: "Mais que 1 x por noite", value: "multiple" },
];
const bowelFrequency = [
  { text: "Todo dia", value: "everyday" },
  { text: "5 x por semana", value: "five per week" },
  { text: "3 x por semana", value: "three per week" },
  { text: "1 x por semana", value: "once per week" },
];
</script>
