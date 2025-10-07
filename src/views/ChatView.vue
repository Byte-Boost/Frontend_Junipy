<template>
  <div class="chat-container">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>

    <div v-else class="messages">
      <div v-for="(msg, i) in messages" :key="i" :class="['message', msg.role]">
        <div
          v-if="msg.role === 'assistant'"
          v-html="renderMarkdown(msg.content)"
        />
        <div v-else class="plain-text">{{ msg.content }}</div>
      </div>
      <!-- Loader for assistant reply -->
      <div v-if="!hasReply" class="message assistant loader-message">
        <div class="jumping-balls-loader">
          <span class="ball"></span>
          <span class="ball"></span>
          <span class="ball"></span>
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="input-container input-relative">
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
      <div v-if="!hasReply" class="input-blocked-overlay">
        <div class="input-spinner"></div>
        <span class="input-blocked-text">{{
          $t("chat.waitingForResponse")
        }}</span>
      </div>
      <div v-if="!isConnected" class="input-blocked-overlay">
        <span class="input-blocked-text">{{ $t("errors.ai.503") }}</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { marked } from "marked";
import IconSend from "@/components/icons/IconSend.vue";
import { useChatSocket } from "@/scripts/websocket/chat";
import { useTypedI18n } from "@/composables/useI18n";
import "../styles/views/ChatView.css";

const { t } = useTypedI18n();

const defaultText = t("chat.grettingMessage");
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
