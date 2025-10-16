<template>
  <CloudyBackground>
    <div class="chat-container">
      <div v-if="isLoading" class="loading-container">
        <div
          class="w-6 h-6 border-4 border-gray-300 border-t-white rounded-full animate-spin"
        ></div>
      </div>
      <div v-else class="chat-layout w-full h-full flex-row flex">
        <!-- Sidebar (Black) -->
        <section class="chat-selector-sidebar w-1/5 bg-black">
          <div class="chat-sidebar">
            <div class="chat-selector-header">
              <button class="new-chat-button">New Chat</button>
              <button class="new-chat-button">Another Button</button>
            </div>
          </div>
        </section>

        <section class="chat flex flex-col w-4/5">
          <div class="messages">
            <div
              v-for="(msg, i) in messages"
              :key="i"
              :class="['message', msg.role]"
            >
              <div
                v-if="msg.role === 'assistant'"
                v-html="renderMarkdown(msg.content)"
              />
              <div v-else class="plain-text">{{ msg.content }}</div>
            </div>
            <div v-if="!hasReply" class="assistant loader-message">
              <div class="jumping-balls-loader">
                <span class="ball"></span>
                <span class="ball"></span>
                <span class="ball"></span>
              </div>
            </div>
          </div>
          <section class="chat-box">
            <form
              @submit.prevent="sendMessage"
              class="input-container input-relative"
            >
              <textarea
                :disabled="!hasReply || !isConnected"
                v-model="input"
                :placeholder="$t('chat.placeholder')"
                class="chat-input"
                :class="{ blocked: !hasReply || !isConnected }"
                rows="1"
                @keydown="handleKeydown"
                @input="adjustHeight"
                ref="textareaRef"
              ></textarea>
              <button
                type="submit"
                :disabled="!input.trim() || !hasReply || !isConnected"
              >
                <IconSend :size="32" color="white" />
              </button>
              <!-- 
              <div v-if="!hasReply" class="input-blocked-overlay">
                <div class="input-spinner"></div>
                <span class="input-blocked-text">{{
                  $t("chat.waitingForResponse")
                }}</span>
              </div> -->
              <!-- <div v-if="!isConnected" class="input-blocked-overlay">
                <span class="input-blocked-text">{{
                  $t("errors.ai.503")
                }}</span>
              </div> -->
            </form>
          </section>
        </section>
      </div>
    </div>
  </CloudyBackground>
</template>
<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { marked } from "marked";
import IconSend from "@/components/icons/IconSend.vue";
import { useChatSocket } from "@/scripts/websocket/chat";
import { useTypedI18n } from "@/composables/useI18n";
import "../styles/views/ChatView.css";
import CloudyBackground from "@/components/CloudyBackground.vue";

const { t } = useTypedI18n();

const defaultText = t("chat.greetingMessage");
const errorText = t("errors.ai.503");
const isLoading = ref(true);

const userId = ref("");
const token = ref("");

const textareaRef = ref(null);
const input = ref("");

const {
  messages,
  isConnected,
  connect,
  disconnect,
  hasReply,
  sendMessage: socketSendMessage,
} = useChatSocket(userId.value);

onMounted(async () => {
  token.value = localStorage.getItem("token") || "";
  if (token.value) {
    if (messages.value.length === 0) {
      messages.value.push({ role: "assistant", content: defaultText });
    }
  } else {
    console.warn("No token found in localStorage.");
    messages.value.push({ role: "assistant", content: errorText });
  }
  isLoading.value = false;
  connect(token.value);
});

watch(isConnected, (newVal) => {
  if (newVal) {
    isLoading.value = false;
  } else {
    isLoading.value = true;
    setTimeout(() => {
      if (!isConnected.value) {
        isLoading.value = false;
        if (
          messages.value.length === 1 &&
          messages.value[0].content === defaultText
        ) {
          messages.value[0].content = errorText;
        } else {
          messages.value.push({ role: "assistant", content: errorText });
        }
      }
    }, 5000);
  }
});
function adjustHeight() {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = "auto";

      if (textareaRef.value.value.trim() === "") {
        textareaRef.value.style.height = "60px";
      } else {
        textareaRef.value.style.height =
          Math.min(textareaRef.value.scrollHeight, 150) + "px";
      }
    }
  });
}

function handleKeydown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function renderMarkdown(text) {
  return marked.parse(text);
}

function sendMessage() {
  if (!input.value.trim()) return;
  socketSendMessage(input.value);
  input.value = "";
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = "auto";
    }
  });
}
</script>
