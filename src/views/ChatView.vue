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
    </div>

    <form @submit.prevent="sendMessage" class="input-container">
      <textarea
        v-model="input"
        placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
        class="chat-input"
        rows="1"
        @keydown="handleKeydown"
        @input="adjustHeight"
        ref="textareaRef"
      ></textarea>
      <button type="submit" :disabled="!input.trim()">
        <IconSend :size="32" color="white" />
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import axios from "axios";
import { marked } from "marked";
import IconSend from "@/components/icons/IconSend.vue";

const defaultText =
  "Hi! I'm Junipy a virtual assistant. How can I help you today?";
const errorText = "⚠️ Error contacting server.";
const input = ref("");
const messages = ref([]);
const isLoading = ref(true);
const userId = ref("2");
const textareaRef = ref(null);

onMounted(async () => {
  await loadChatHistory();
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

async function loadChatHistory() {
  try {
    isLoading.value = true;
    const { data } = await axios.get(
      `http://localhost:3000/chat/history/${userId.value}`
    );

    if (data.messages && data.messages.length > 0) {
      messages.value = data.messages;
    } else {
      messages.value = [{ role: "assistant", content: defaultText }];
    }
  } catch (err) {
    console.error("Error loading chat history:", err);
    messages.value = [{ role: "assistant", content: defaultText }];
  } finally {
    isLoading.value = false;
  }
}

function renderMarkdown(text) {
  return marked.parse(text);
}

async function sendMessage() {
  if (!input.value.trim()) return;

  const userMessage = { role: "user", content: input.value };
  messages.value.push(userMessage);

  const messageContent = input.value;
  input.value = "";

  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = "auto";
    }
  });

  try {
    const { data } = await axios.post("http://localhost:3000/chat", {
      message: messageContent,
      userId: userId.value,
    });

    const assistantMessage = { role: "assistant", content: data.reply };
    messages.value.push(assistantMessage);
  } catch (err) {
    console.error(err);
    const errorMessage = {
      role: "assistant",
      content: errorText,
    };
    messages.value.push(errorMessage);
  }
}

async function saveChatMessage(message) {
  try {
    await axios.post(`http://localhost:3000/chat/history/${userId.value}`, {
      message: message,
    });
  } catch (err) {
    console.error("Error saving message:", err);
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #2a6f97 0%, #6bcb77 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.messages {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.messages::-webkit-scrollbar {
  width: 8px;
}

.messages::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.messages::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.message {
  max-width: 70%;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in;
  word-wrap: break-word;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  background: #f1f3f4;
  color: black;
  align-self: flex-end;
  border-bottom-right-radius: 5px;
}

.message.assistant {
  background: white;
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 5px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.plain-text {
  white-space: pre-wrap;
  line-height: 1.5;
}

.input-container {
  display: flex;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  gap: 1rem;
  align-items: flex-end;
  min-height: 10px;
  box-sizing: border-box;
}

.chat-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 25px;
  outline: none;
  font-size: 16px;
  background: white;
  transition: all 0.3s ease;
  resize: none;
  min-height: 60px;
  max-height: 150px;
  font-family: inherit;
  line-height: 1.4;
  overflow-y: auto;
}

.chat-input::-webkit-scrollbar {
  width: 4px;
}

.chat-input::-webkit-scrollbar-track {
  background: transparent;
}

.chat-input::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.3);
  border-radius: 2px;
}

.chat-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.chat-input::placeholder {
  color: #999;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.chat-input::-webkit-scrollbar {
  display: none;
}
.chat-input {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

button {
  padding: 0;
  background: linear-gradient(135deg, #2a6f97 0%, #6bcb77 100%);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  align-self: flex-end;
  margin-bottom: 4px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .messages {
    padding: 1rem;
  }

  .message {
    max-width: 85%;
  }

  .input-container {
    padding: 1rem;
  }

  .chat-input {
    font-size: 14px;
  }
}

.messages {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
}

.loading-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
