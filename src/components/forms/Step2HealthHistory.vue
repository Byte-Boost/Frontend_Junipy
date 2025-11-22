<template>
  <div class="step-container">
    <div class="form-row">
      <RadioGroup
        v-model="userInfo.consultationReason"
        :title="$t('auth.register.fields.anamnese.fields.consultationReason.label')"
        :options="consultationOptions"
      />
    </div>

    <div class="form-row">
      <CheckboxGroup
        v-model="userInfo.healthConditions"
        :title="$t('auth.register.fields.anamnese.fields.conditions.label')"
        :options="healthConditionsOptions"
        exclusive-value="noCondition"
      />
    </div>
    <div class="form-row" v-if="localUserInfo.healthConditions.includes('otherDisease')">
      <input v-model="localOtherHealthConditions" type="text" />
    </div>

    <div class="form-row">
      <CheckboxGroup
        v-model="userInfo.allergies"
        :title="$t('auth.register.fields.anamnese.fields.allergies.label')"
        :options="allergiesOptions"
        exclusive-value="noAllergy"
      />
    </div>
    <div class="form-row" v-if="localUserInfo.allergies.includes('otherAllergy')">
      <input v-model="localOtherAllergies" type="text" />
    </div>

    <div class="form-row">
      <CheckboxGroup
        v-model="localUserInfo.surgeries"
        :title="$t('auth.register.fields.anamnese.fields.surgeries.label')"
        :options="surgeriesOptions"
        exclusive-value="noSurgery"
      />
    </div>
    <div class="form-row" v-if="localUserInfo.surgeries.includes('otherSurgery')">
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
import { SurgeriesEnum } from "@/types/enums/SurgeriesEnum";
import { HealthConditionsEnum } from "@/types/enums/HealthConditionsEnum";
import { AllergiesEnum } from "@/types/enums/AllergiesEnum";
import { ConsultationReasonsEnum } from "@/types/enums/ConsultationReasonEnum";

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

const consultationOptions = Object.entries(ConsultationReasonsEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));

const healthConditionsOptions = Object.entries(HealthConditionsEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
healthConditionsOptions.push({ text: t("common.other"), value: "otherDisease" });

const allergiesOptions = Object.entries(AllergiesEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
allergiesOptions.push({ text: t("common.other"), value: "otherAllergy" })

const surgeriesOptions = Object.entries(SurgeriesEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
surgeriesOptions.push({ text: t("common.other"), value: "otherSurgery" })

</script>