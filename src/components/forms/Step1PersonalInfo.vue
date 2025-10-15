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
        <label>Profissão</label>
        <input v-model="localUserInfo.occupation" type="text" />
      </div>
      <div class="form-element">
        <label>Email</label>
        <input disabled v-model="localUserInfo.email" type="text" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-element">
        <label>Data de Nascimento</label>
        <input disabled v-model="localUserInfo.birthDate" type="date" />
      </div>

      <div class="form-element">
        <label>Idade</label>
        <input type="text" v-model="localUserInfo.age" disabled>
      </div>

      <div class="form-element">
        <label style="display: block;">Sexo</label>
        <select disabled v-model="localUserInfo.gender">
          <option disabled value="">Selecione</option>
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
