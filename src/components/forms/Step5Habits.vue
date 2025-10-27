<template>
  <div class="step-container">
    <div class="form-row">
      <RadioGroup
        v-model="userInfo.stressLevel"
        :title="'Estresse diário'"
        :options="stressLevel"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.alcoholConsumption"
        :title="'Consumo de álcool'"
        :options="alcoholConsumption"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.smoking"
        :title="'Tabagismo'"
        :options="smoking"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.hydrationLevel"
        :title="'Hidratação (quantos litros por dia)'"
        :options="hydrationLevel"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.takesMedication"
        :title="'Faz uso de medicações contínuas?'"
        :options="takesMedication"
      />
    </div>

    <div class="form-row" v-if="userInfo.takesMedication === 'yes'">
      <div class="form-element">
        <label>Quais medicações/suplementos?</label>
        <input v-model="userInfo.medicationDetails" type="text" />
      </div>
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

const stressLevel = [
  { text: "Baixo", value: "low" },
  { text: "Moderado", value: "moderate" },
  { text: "Alto", value: "high" },
];
const alcoholConsumption = [
  { text: "Não consome", value: "none" },
  { text: "Socialmente 1-2 x por semana", value: "social" },
  { text: "Frequente 3-4 x por semana", value: "frequent" },
  { text: "Uso diário", value: "daily" },
];
const smoking = [
  { text: "Sim", value: "yes" },
  { text: "Não", value: "no" },
];
const hydrationLevel = [
  { text: "Menos de 1L", value: "less than 1L" },
  { text: "Entre 1L e 2L", value: "1-2L" },
  { text: "Mais de 2L", value: "more than 2L" },
];
const takesMedication = [
  { text: "Sim", value: "yes" },
  { text: "Não", value: "no" },
];
</script>
