<template>
  <div class="step-container">
    <!-- Step content goes here -->
  </div>
</template>

<script setup lang="ts">
import type { UserInformation } from "@/models/models";
import { computed } from "vue";

// Props — receives the full user information object
const props = defineProps<{
  userInfo: UserInformation;
}>();

// Emits — updates the userInfo object in the parent component
const emit = defineEmits<{
  (e: "update:userInfo", value: UserInformation): void;
}>();

// Local computed binding for two-way data flow
// This makes v-model bindings inside the template simple
const localUserInfo = computed({
  get: () => props.userInfo,
  set: (value) => emit("update:userInfo", value),
});
</script>

<style scoped>
.step-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
