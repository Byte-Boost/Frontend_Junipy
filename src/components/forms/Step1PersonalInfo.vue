<template>
  <div class="step-container">
    <div class="form-row">
      <div class="form-element">
        <div class="iconified-input">
          <label for="name">{{
            $t("auth.register.fields.anamnese.fields.name")
          }}</label>
          <div class="relative flex items-center">
            <input
              id="name"
              type="name"
              v-model="localUserInfo.name"
              class="peer pl-10"
              :placeholder="$t('auth.register.fields.anamnese.fields.name')"
              required
            />
            <IconUser
              class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-element">
        <label>{{
          t("auth.register.fields.anamnese.fields.profession")
        }}</label>
        <input v-model="localUserInfo.occupation" type="text" />
      </div>
      <div class="form-element">
        <label>{{ t("auth.register.fields.email.label") }}</label>
        <input disabled v-model="localUserInfo.email" type="text" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-element">
        <label>{{ t("auth.register.fields.anamnese.fields.birthDate") }}</label>
        <input disabled v-model="localUserInfo.birthDate" type="date" />
      </div>

      <div class="form-element">
        <label>{{ t("auth.register.fields.anamnese.fields.age") }}</label>
        <input type="text" v-model="localUserInfo.age" disabled />
      </div>

      <div class="form-element">
        <label style="display: block">{{
          t("auth.register.fields.anamnese.fields.sex.label")
        }}</label>
        <select disabled v-model="localUserInfo.gender">
          <option disabled value="">
            {{ t("common.select.placeholder") }}
          </option>
          <option value="Masculino">
            {{ t("auth.register.fields.anamnese.fields.sex.choices.male") }}
          </option>
          <option value="Feminino">
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
import IconUser from "../icons/IconUser.vue";

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
