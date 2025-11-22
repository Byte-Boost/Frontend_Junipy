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
import { computed } from "vue";
import { activityTypeEnum } from "@/types/enums/activityType.enum";
import { activityFrequencyEnum } from "@/types/enums/activityFrequency.enum";
import { activityDurationEnum } from "@/types/enums/activityDuration.enum";
import { useTypedI18n } from "@/composables/useI18n";

const { t } = useTypedI18n();
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

const activityOptions = Object.entries(activityTypeEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
activityOptions.push({ text: t("common.other"), value: "otherActivity" })

const activityFrequency = Object.entries(activityFrequencyEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
const activityDuration = Object.entries(activityDurationEnum).map(([key, value]) => ({
  value: key,
  text: t(value),
}));
</script>
