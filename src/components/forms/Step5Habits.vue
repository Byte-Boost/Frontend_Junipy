<template>
  <div class="step-container">
    <div class="form-row">
      <RadioGroup
        v-model="userInfo.stressLevel"
        :title="
          $t('auth.register.fields.anamnese.fields.dayToDay.fields.stress.title')
        "
        :options="stressLevel"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.alcoholConsumption"
        :title="
          $t('auth.register.fields.anamnese.fields.dayToDay.fields.alcoholConsumption.title')
        "
        :options="alcoholConsumption"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.smoking"
        :title="
          $t('auth.register.fields.anamnese.fields.dayToDay.fields.smoking.title')
        "
        :options="smoking"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.hydrationLevel"
        :title="
          $t('auth.register.fields.anamnese.fields.dayToDay.fields.hydration.title')
        "
        :options="hydrationLevel"
      />
    </div>

    <div class="form-row">
      <RadioGroup
        v-model="userInfo.takesMedication"
        :title="
          $t('auth.register.fields.anamnese.fields.dayToDay.fields.medications.title')
        "
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
import { stressLevelEnum } from "@/types/enums/stressLevel.enum";
import { alcoholConsumptionEnum } from "@/types/enums/alcoholConsumption.enum";
import { smokingEnum } from "@/types/enums/smoking.enum";
import { hydrationLevelEnum } from "@/types/enums/hydrationLevel.enum";
import { takesMedicationEnum } from "@/types/enums/takesMedication.enum";
import { useTypedI18n } from "@/composables/useI18n";

const { t } = useTypedI18n();
const props = defineProps<{ userInfo: UserInformation }>();
const emit = defineEmits<{
  (e: "update:userInfo", value: UserInformation): void;
}>();

const stressLevel = Object.entries(stressLevelEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
const alcoholConsumption = Object.entries(alcoholConsumptionEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
const smoking = Object.entries(smokingEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
const hydrationLevel = Object.entries(hydrationLevelEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
const takesMedication = Object.entries(takesMedicationEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
</script>
