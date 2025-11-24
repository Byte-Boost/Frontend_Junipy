<template>
  <div class="bg-[#EFE9E3]">
    <div class="chat-container">
      <div v-if="isLoading" class="loading-container">
        <div
          class="w-6 h-6 border-4 border-gray-300 border-t-[#48b684] rounded-full animate-spin"
        ></div>
      </div>

      <div v-else class="w-full h-full flex justify-center">
        <section class="chat flex flex-col w-3/5">
          <div class="messages">
            <div
              v-for="(msg, i) in messages"
              :key="i"
              class="message-container"
            >
              <div v-if="msg.role === 'assistant'">
                <div
                  :class="['message', msg.role]"
                  v-html="renderMarkdown(msg.content)"
                />
                <div
                  v-if="msg.role === 'assistant'"
                  class="message-toolbar-container flex flex-cols-4"
                >
                  <div class="flex flex-row w-2/4">
                    <div class="toolbar-icons">
                      <div class="toolbar-icon copy-icon-container">
                        <button
                          @click="copyToClipboard(msg.content, toast, t)"
                          class="toolbar-button group"
                          :aria-label="$t('common.actions.copy.label')"
                          :title="$t('common.actions.copy.label')"
                        >
                          <IconCopy
                            :size="24"
                            class="fill-black group-hover:fill-green-500"
                          />
                        </button>
                      </div>
                      <!-- <div class="toolbar-icon download-icon-container">
                        <button
                          @click="downloadPDF(msg.content, toast, t)"
                          class="toolbar-button"
                        >
                          <IconDownload :size="24" color="#007bff" />
                        </button>
                      </div> -->
                    </div>
                  </div>
                  <div class="message-time">
                    <span>{{ formatTimestamp(msg.timestamp) }}</span>
                  </div>
                </div>
              </div>
              <div v-else :class="['message', 'user']">
                {{ msg.content }}
              </div>
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
            <form @submit.prevent="sendMessage" class="input-container">
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
                <IconSend :size="48" color="gray" />
              </button>
            </form>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { marked } from "marked";
import IconSend from "@/components/icons/IconSend.vue";
import { useChatSocket } from "@/scripts/websocket/chat";
import { useTypedI18n } from "@/composables/useI18n";
import "../styles/views/ChatView.scss";
import { copyToClipboard, formatTimestamp } from "@/scripts/utils/utils";
import IconCopy from "@/components/icons/IconCopy.vue";
import { useToast } from "vue-toastification";
import { getChatList } from "@/scripts/http-requests/endpoints";
import { useRouter } from "vue-router";

const toast = useToast();
const { t } = useTypedI18n();
const props = defineProps({ uuid: String });

const router = useRouter();
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
} = useChatSocket(userId.value, ref(props.uuid).value);

watch(
  () => props.uuid,
  async (newUuid) => {
    if (!newUuid) {
      const firstOrNewChat =
        (await getChatList())[0]?.id ?? (await createNewChat()).id;
      router.push(`/chat/${firstOrNewChat}`);
    } else {
      messages.value = [];

      const chats = await getChatList();
      const chat = chats.find((c) => c.id === newUuid);

      if (chat && chat.messages?.length) {
        for (const message of chat.messages) {
          console.log(message);
          messages.value.push({
            role: message.role,
            content: message.message,
            timestamp: message.timestamp,
          });
        }
      } else {
        messages.value.push({
          role: "assistant",
          content: defaultText,
          timestamp: Date.now(),
        });
      }

      token.value = localStorage.getItem("token") || "";
      if (token.value) {
        if (messages.value.length === 0) {
          messages.value.push({
            role: "assistant",
            content: defaultText,
            timestamp: Date.now(),
          });
        }
      } else {
        console.warn("No token found in localStorage.");
        messages.value.push({
          role: "assistant",
          content: errorText,
          timestamp: Date.now(),
        });
      }
    }
  },
  { immediate: true }
);

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
onMounted(() => {
  token.value = localStorage.getItem("token") || "";
  connect(token.value);
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
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
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
