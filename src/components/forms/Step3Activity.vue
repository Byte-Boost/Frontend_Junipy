<template>
  <div class="step-container">
    <div class="form-row">
      <RadioGroup
        v-model="userInfo.activityType"
        :title="
          $t('auth.register.fields.anamnese.fields.physicalActivities.label')
        "
        :options="activityOptions"
      />
    </div>
    <div class="form-row" v-if="userInfo.activityType.includes('other')">
      <input v-model="localOtherActivities" type="text" />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.activityFrequency"
        :title="
          $t('auth.register.fields.anamnese.fields.physicalActivities.frequency.title')
        "
        :options="activityFrequency"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.activityDuration"
        :title="
          $t('auth.register.fields.anamnese.fields.physicalActivities.time.title')
        "
        :options="activityDuration"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import "../../styles/components/Forms.css";
import type { UserInformation } from "@/models/models";
import RadioGroup from "../RadioGroup.vue";
import { computed, watch } from "vue";

const props = defineProps<{
  userInfo: UserInformation;
  otherActivities: string;
}>();

const emit = defineEmits<{
  (e: "update:userInfo", value: UserInformation): void;
  (e: "update:otherActivities", value: string): void;
}>();

const localOtherActivities = computed({
  get: () => props.otherActivities,
  set: (val) => emit("update:otherActivities", val),
});

const activityOptions = [
  { text: "Sedentário(a)", value: "sedentary" },
  { text: "Caminhada", value: "walking" },
  { text: "Musculação", value: "weightlifting" },
  { text: "Corrida", value: "running" },
  { text: "Crossfit", value: "crossfit" },
  { text: "Natação", value: "swimming" },
  { text: "Outro", value: "otherActivity" },
];
const activityFrequency = [
  { text: "Nunca", value: "never" },
  { text: "1-2x por semana", value: "1-2 times/week" },
  { text: "3-4x por semana", value: "3-4 times/week" },
  { text: "5 ou mais vezes por semana", value: "5-6 times/week" },
];
const activityDuration = [
  { text: "Não pratico", value: "0min" },
  { text: "30 minutos", value: "30min" },
  { text: "60 minutos", value: "60min" },
  { text: "90 minutos", value: "90min" },
];
</script>
