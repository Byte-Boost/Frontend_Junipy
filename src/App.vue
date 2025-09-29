<script setup lang="ts">
  import { RouterView } from "vue-router";
  import Sidebar from "./components/Sidebar.vue";
  import { useRoute } from 'vue-router';
  const routesWithoutSidebar = ['/login', '/register'];

  const showSidebar = ()=>{
    const route = useRoute();
    return !routesWithoutSidebar.includes(route.path.toLowerCase());
  };
</script>

<template>
  <Sidebar v-if="showSidebar()"/>
  <main class="main-content" :class="{'using-sidebar': showSidebar()}">
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
  transition: margin-left 0.3s ease;
  overflow: hidden;
}

.using-sidebar {
  margin-left: 250px;
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
