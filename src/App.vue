<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <Sidebar />
  <main class="main-content">
    <RouterView />
  </main>
</template>
<style>
.app-layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  overflow: hidden;
}

/* Adjust for collapsed sidebar */
.sidebar.collapsed + .main-content {
  margin-left: 60px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 200px;
  }

  .sidebar.collapsed + .main-content {
    margin-left: 50px;
  }
}
</style>
