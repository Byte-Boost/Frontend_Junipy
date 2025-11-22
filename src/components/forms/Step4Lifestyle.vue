<template>
  <div class="step-container">
    <div class="form-row">
      <RadioGroup
        v-model="userInfo.sleepQuality"
        :title="
          $t('auth.register.fields.anamnese.fields.sleepQuality.title')
        "
        :options="sleepQuality"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.wakeDuringNight"
        :title="
          $t('auth.register.fields.anamnese.fields.nightInterruptions.title')
        "
        :options="wakeDuringNight"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.bowelFrequency"
        :title="
          $t('auth.register.fields.anamnese.fields.intestinalHabits.title')
        "
        :options="bowelFrequency"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import "../../styles/components/Forms.css";
import type { UserInformation } from "@/models/models";
import RadioGroup from "../RadioGroup.vue";
import { SleepQualityEnum } from "@/types/enums/SleepQualityEnum";
import { WakeDuringNightEnum } from "@/types/enums/WakeDuringNightEnum";
import { BowelFrequencyEnum } from "@/types/enums/BowelFrequencyEnum";
import { useTypedI18n } from "@/composables/useI18n";

const { t } = useTypedI18n();
const props = defineProps<{ userInfo: UserInformation }>();
const emit = defineEmits<{
  (e: "update:userInfo", value: UserInformation): void;
}>();

const sleepQuality = Object.entries(SleepQualityEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));const wakeDuringNight = Object.entries(WakeDuringNightEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));const bowelFrequency = Object.entries(BowelFrequencyEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
</script>
