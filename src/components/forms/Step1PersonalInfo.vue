<template>
  <div class="step-container">
    <div class="form-row">
      <div class="form-element">
        <div class="form-element">
          <label>{{
            t("auth.register.fields.username.label")
          }}</label>
          <input v-model="localUserInfo.name" type="text" :placeholder="$t('auth.register.fields.username.placeholder')"/>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-element">
        <label>{{t("auth.register.fields.email.label")}}</label>
        <input v-model="localUserInfo.email" type="text" :placeholder="$t('auth.register.fields.email.placeholder')"/>
      </div>

      <div class="form-element">
        <label>{{t("auth.register.fields.anamnese.fields.profession")}}</label>
        <input v-model="localUserInfo.occupation" type="text" :placeholder="$t('auth.register.fields.anamnese.fields.profession')"/>
      </div>
    </div>

    <div class="form-row">
      <div class="form-element">
        <label>{{ t("auth.register.fields.anamnese.fields.birthDate") }}</label>
        <input v-model="localUserInfo.birthDate" type="date" />
      </div>

      <!-- <div class="form-element">
        <label>{{ t("auth.register.fields.anamnese.fields.age") }}</label>
        <input type="text" v-model="localUserInfo.age" disabled />
      </div> -->

      <div class="form-element">
        <label style="display: block">{{
          t("auth.register.fields.anamnese.fields.sex.label")
        }}</label>
        <select  v-model="localUserInfo.sex">
          <option disabled value="">
            {{ t("common.select.placeholder") }}
          </option>
          <option value="male">
            {{ t("auth.register.fields.anamnese.fields.sex.choices.male") }}
          </option>
          <option value="female">
            {{ t("auth.register.fields.anamnese.fields.sex.choices.female") }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTypedI18n } from "@/composables/useI18n";
import "../../styles/components/Forms.css";
import type { UserInformation } from "@/models/models";
import { computed } from "vue";

const props = defineProps<{ userInfo: UserInformation }>();
const emit = defineEmits<{
  (e: "update:userInfo", value: UserInformation): void;
}>();
const { t } = useTypedI18n();

const localUserInfo = computed({
  get: () => props.userInfo,
  set: (value) => emit("update:userInfo", value),
});
</script>
