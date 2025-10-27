import { ref } from "vue";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { Ref } from "vue";
import { useTypedI18n } from "@/composables/useI18n";

export function useChatSocket(userId: string) {
  const messages = ref<{ role: string; content: string }[]>([]);
  const isConnected = ref(false);
  const hasReply = ref(true);
  const client: Ref<Client | null> = ref(null);
  let localtoken: string = "";
  const { t } = useTypedI18n();
  function connect(token: string) {
    localtoken = token;
    client.value = new Client({
      brokerURL: `${import.meta.env.VITE_API_URL.replace(
        /^http/,
        "ws"
      )}api/ws/chat`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        isConnected.value = true;
        client.value?.subscribe("/topic/chat", (message) => {
          const data = JSON.parse(message.body);
          console.log("Received message:", data);
          if (data.error) {
            messages.value.push({
              role: "assistant",
              content: t("errors.ai.503"),
            });
            hasReply.value = true;
          } else if (data.message) {
            setTimeout(() => {
              messages.value.push({ role: "assistant", content: data.message });
              hasReply.value = true;
            }, 1000);
          }
        });
      },
      onDisconnect: () => {
        isConnected.value = false;
      },
      debug: (str: string) => console.log(str),
    });
    client.value.activate();
  }

  function disconnect() {
    client.value?.deactivate();
    isConnected.value = false;
  }

  function sendMessage(content: string) {
    if (!client.value || !isConnected.value) return;
    client.value.publish({
      destination: "/app/chat",
      body: JSON.stringify({
        message: content,
        token: localtoken,
        userId,
      }),
    });
    messages.value.push({ role: "user", content });
    hasReply.value = false;
  }

  return {
    messages,
    isConnected,
    hasReply,
    connect,
    disconnect,
    sendMessage,
  };
}
