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
              color="black"
              class="toggle-icon"
            />
            <IconChevronRight
              v-else
              :size="20"
              color="black"
              class="toggle-icon"
            />
          </button>
        </div>
        <button v-for="chatId in chatIds" :key="chatId"
          class="sidebar-btn"
          @click="navigateTo(`/chat/${chatId}`)"
          :title="isCollapsed ? 'Chat' : ''"
        >
          <IconChat :size="20" color="black" class="btn-icon" />
          <span v-if="!isCollapsed" class="btn-text">{{ chatId }}</span>
        </button>
      </div>

      <!-- Settings Section -->
      <div class="settings-section">
        <h3 v-if="!isCollapsed" class="section-title">
          {{ $t("nav.settings") }}
        </h3>
        <hr v-if="isCollapsed" />

        <button
          class="sidebar-btn"
          @click="navigateTo('/config')"
          :title="isCollapsed ? $t('nav.settings') : ''"
        >
          <span class="btn-icon"><IconCog :size="20" color="black" /></span>
          <span v-if="!isCollapsed" class="btn-text">{{
            $t("nav.settings")
          }}</span>
        </button>

        <button
          class="sidebar-btn"
          @click="navigateTo('/login')"
          :title="isCollapsed ? $t('nav.logout') : ''"
        >
          <span class="btn-icon"><IconLogout color="black" /></span>
          <span v-if="!isCollapsed" class="btn-text">{{
            $t("nav.logout")
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import IconChat from "./icons/IconChat.vue";
  import IconCog from "./icons/IconCog.vue";
  import IconChevronLeft from "./icons/IconChevronLeft.vue";
  import IconChevronRight from "./icons/IconChevronRight.vue";
  import "../styles/components/Sidebar.css";
  import IconLogout from "./icons/IconLogout.vue";
import { getChatList } from "@/scripts/http-requests/endpoints";

  const chatIds = ref<string[]>([]);
  const router = useRouter();
  const isCollapsed = ref(true);


  onMounted(async () => {
    chatIds.value = await getChatList();
  });

  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };
</script>
