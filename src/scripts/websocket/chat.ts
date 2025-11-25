import { ref, type Ref } from "vue";
import { Client, type IMessage } from "@stomp/stompjs";
import { useTypedI18n } from "@/composables/useI18n";
import type { ChatMessage } from "@/models/models";

export function useChatSocket(userId: string, chatId: string) {
  const messages: Ref<ChatMessage[]> = ref([]);
  const isConnected: Ref<boolean> = ref(false);
  const hasReply: Ref<boolean> = ref(true);
  const client: Ref<Client | null> = ref(null);
  const localToken: Ref<string> = ref("");
  const { t } = useTypedI18n();

  function connect(token: string) {
    localToken.value = token;

    const wsUrl = `${import.meta.env.VITE_API_URL.replace(
      /^http/,
      "ws"
    )}api/ws/chat`;

    client.value = new Client({
      brokerURL: wsUrl,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      debug: (str: string) => console.log("[STOMP]", str),
      onConnect: () => {
        isConnected.value = true;

        client.value?.subscribe(
          `/topic/chat/${chatId}`,
          (message: IMessage) => {
            let data: { role?: string; message?: string; error?: boolean };
            try {
              data = JSON.parse(message.body);
            } catch {
              console.warn("Failed to parse STOMP message body", message.body);
              return;
            }

            if (data.error) {
              messages.value.push({
                role: "assistant",
                content: t("errors.ai.503"),
                timestamp: Date.now(),
              });
              hasReply.value = true;
            } else if (data.message) {
              messages.value.push({
                role: data.role || "assistant",
                content: data.message,
                timestamp: Date.now(),
              });
              hasReply.value = true;
            }
          }
        );
      },
      onDisconnect: () => {
        isConnected.value = false;
      },
    });

    client.value.activate();
  }

  function disconnect() {
    client.value?.deactivate();
    isConnected.value = false;
  }

  function sendMessage(content: string) {
    if (!client.value || !isConnected.value) return;

    const payload = {
      userId,
      message: content,
      token: localToken.value,
    };

    client.value.publish({
      destination: `/app/chat/${chatId}/send`,
      body: JSON.stringify(payload),
    });

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
