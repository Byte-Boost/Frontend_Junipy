<template>
  <div class="step-container">
    <div class="form-row">
      <div class="form-element">
        <label>Nome</label>
        <input v-model="localUserInfo.name" type="text" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-element">
        <label>Data de Nascimento</label>
        <input v-model="localUserInfo.birthDate" type="date" />
      </div>

      <div class="form-element">
        <label>Idade</label>
        <input type="text" value="20 anos" disabled>
      </div>
    </div>

    <div class="form-row">
      <div class="form-element">
        <label style="display: block;">Sexo</label>
        <select v-model="localUserInfo.gender">
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../../styles/components/Forms.css";
import type { UserInformation } from "@/models/models";
import { computed } from "vue";

const props = defineProps<{ userInfo: UserInformation }>();
const emit = defineEmits<{ (e: "update:userInfo", value: UserInformation): void }>();

const localUserInfo = computed({
  get: () => props.userInfo,
  set: (value) => emit("update:userInfo", value),
});
</script>
