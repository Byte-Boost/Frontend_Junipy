<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import IconChat from "./icons/IconChat.vue";
import IconCog from "./icons/IconCog.vue";
import IconChevronLeft from "./icons/IconChevronLeft.vue";
import IconChevronRight from "./icons/IconChevronRight.vue";
import "../styles/components/Sidebar.css";

const router = useRouter();

const isCollapsed = ref(true);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const navigateTo = (path: string) => {
  router.push(path);
};

const openSettings = () => {
  console.log("Opening settings...");
};
</script>
<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-content">
      <div class="nav-section">
        <div class="nav-header">
          <h3 v-if="!isCollapsed" class="section-title">
            {{ $t("nav.title") }}
          </h3>
          <button class="toggle-btn" @click="toggleSidebar">
            <IconChevronLeft
              v-if="!isCollapsed"
              :size="20"
              color="white"
              class="toggle-icon"
            />
            <IconChevronRight
              v-else
              :size="20"
              color="white"
              class="toggle-icon"
            />
          </button>
        </div>
        <button
          class="sidebar-btn"
          @click="navigateTo('/')"
          :title="isCollapsed ? 'Chat' : ''"
        >
          <IconChat :size="20" color="white" class="btn-icon" />
          <span v-if="!isCollapsed" class="btn-text">{{ $t("nav.chat") }}</span>
        </button>
      </div>

      <!-- Action Buttons -->
      <!-- <div class="action-section">
        <h3 v-if="!isCollapsed" class="section-title">Actions</h3>
        <button
          class="sidebar-btn"
          @click="toggleTheme"
          :title="isCollapsed ? 'Toggle Theme' : ''"
        >
          <span class="btn-icon">{{ isDarkMode ? "Light" : "Dark" }}</span>
          <span v-if="!isCollapsed" class="btn-text">{{
            isDarkMode ? "Light Mode" : "Dark Mode"
          }}</span>
        </button> 
      </div> -->

      <!-- Settings Section -->
      <div class="settings-section">
        <h3 v-if="!isCollapsed" class="section-title">
          {{ $t("nav.settings") }}
        </h3>
        <hr v-if="isCollapsed" />
        <button
          class="sidebar-btn"
          @click="openSettings"
          :title="isCollapsed ? $t('nav.settings') : ''"
        >
          <span class="btn-icon"><IconCog :size="20" color="white" /></span>
          <span v-if="!isCollapsed" class="btn-text">{{
            $t("nav.settings")
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
