<template>
  <div class="config-container">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>

    <div v-else class="config-form rounded-3xl">
      <form @submit.prevent="saveProfile" class="form">
        <div class="form-group">
          <label for="name">Nome</label>
          <input
            id="name"
            type="text"
            v-model="profile.name"
            :disabled="true"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            id="email"
            type="email"
            v-model="profile.email"
            :disabled="true"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="username">Nome de Usuário</label>
          <input
            id="username"
            type="text"
            v-model="profile.username"
            :disabled="isSaving"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="birthday">Data de Nascimento</label>
          <input
            id="birthday"
            type="date"
            v-model="profile.birthday"
            :disabled="isSaving"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="height">Altura</label>
          <input
            id="height"
            type="number"
            v-model="profile.height"
            :disabled="isSaving"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="weight">Peso</label>
          <input
            id="weight"
            type="number"
            v-model="profile.weight"
            :disabled="isSaving"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <button
            type="submit"
            :disabled="!isFormChanged || isSaving"
            class="save-btn"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import "../styles/views/ConfigView.css";
  import { ref, onMounted, watch } from "vue";
  import { getProfileData } from "@/scripts/http-requests/endpoints";
  import { patchProfileData } from "@/scripts/http-requests/endpoints";

  const originalProfile = ref(null);
  const profile = ref({
    name: "",
    email: "",
    username: "",
    birthday: null,
    weight: null,
  });

  const isLoading = ref(true);
  const isSaving = ref(false);
  const isFormChanged = ref(false);

  onMounted(async () => {
    await fetchProfileData();
  });

  async function fetchProfileData() {
    isLoading.value = true;
    try {
      const { data } = await getProfileData();
      
      originalProfile.value = JSON.parse(JSON.stringify(data));
      profile.value = data;

    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      isLoading.value = false;
    }
  }

  watch(profile, (newVal) => {
    if (!originalProfile.value) return;

    isFormChanged.value = JSON.stringify(newVal) !== JSON.stringify(originalProfile.value);
  }, { deep: true });

  async function saveProfile() {
    if (!isFormChanged.value || isSaving.value) return;

    isSaving.value = true;

    try {
      await patchProfileData(profile.value);
      isFormChanged.value = false;
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      isSaving.value = false;
    }
  }
</script>