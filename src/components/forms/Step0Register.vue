<template>
  <div class="step-container">
    <div class="form-row">
        <div class="form-element">
          <label>{{ t("auth.register.fields.username.label") }}</label>
          <input v-model="userInfo.username" type="text" :placeholder="t('auth.register.fields.username.placeholder')" />
        </div>
    </div>
    <div class="form-row">
      <div class="form-element">
        <label>{{ t("auth.register.fields.email.label") }}</label>
        <input v-model="userInfo.email" type="text" :placeholder="t('auth.register.fields.email.placeholder')" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-element">
        <label>{{ t("auth.register.fields.password.label") }}</label>
        <input v-model="userInfo.password" type="password" :placeholder="t('auth.register.fields.password.placeholder')" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-element">
        <label>{{ t("auth.register.fields.confirmPassword.label") }}</label>
        <input v-model="userInfo.confirmPassword" type="password" :placeholder="t('auth.register.fields.confirmPassword.placeholder')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTypedI18n } from "@/composables/useI18n";
import "../../styles/components/Forms.css";
import type { User } from "@/models/models";

const { t } = useTypedI18n();
const props = defineProps<{ userInfo: User }>();
const emit = defineEmits<{
  (e: "update:userInfo", value: User): void;
}>();

</script>
