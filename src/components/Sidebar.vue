<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-content">
      <div class="nav-section">
        <div class="nav-header">
          <h3 v-if="!isCollapsed" class="section-title">Navigation</h3>
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
          <span v-if="!isCollapsed" class="btn-text">Junipy</span>
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
        <h3 v-if="!isCollapsed" class="section-title">Settings</h3>
        <hr v-if="isCollapsed" />
        <button
          class="sidebar-btn"
          @click="openSettings"
          :title="isCollapsed ? 'Settings' : ''"
        >
          <span class="btn-icon"><IconCog :size="20" color="white" /></span>
          <span v-if="!isCollapsed" class="btn-text">Settings</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import IconChat from "./icons/IconChat.vue";
import IconCog from "./icons/IconCog.vue";
import IconChevronLeft from "./icons/IconChevronLeft.vue";
import IconChevronRight from "./icons/IconChevronRight.vue";

const router = useRouter();

const isCollapsed = ref(true);
const isDarkMode = ref(false);

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

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background: #1c1c1c;
  color: white;
  transition: width 0.3s ease;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;
  flex-shrink: 0;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-content {
  padding: 20px 0 20px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 0.5rem;
}

.sidebar.collapsed .nav-header {
  justify-content: center;
  padding: 0 12px;
}

.nav-section,
.action-section,
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Special styling for section titles outside nav-header */
.settings-section .section-title,
.action-section .section-title {
  margin: 0 0 0.5rem 20px;
}

.sidebar-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  text-align: left;
  width: 100%;
  position: relative;
}

.sidebar.collapsed .sidebar-btn {
  justify-content: center;
  padding: 12px;
}

.sidebar-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar.collapsed .sidebar-btn:hover {
  transform: none;
}

.btn-icon {
  font-size: 18px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-text {
  font-weight: 500;
  white-space: nowrap;
}

/* Tooltip for collapsed state */
.sidebar.collapsed .sidebar-btn[title]:hover::after {
  content: attr(title);
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1001;
  pointer-events: none;
}

.sidebar.collapsed .sidebar-btn[title]:hover::before {
  content: "";
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: rgba(0, 0, 0, 0.8);
  z-index: 1001;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .sidebar.collapsed {
    width: 50px;
  }
}
</style>
