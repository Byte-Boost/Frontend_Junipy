import type { useToast } from "vue-toastification";

function copyToClipboard(
  content: string,
  toast: ReturnType<typeof useToast>,
  t: (key: string) => string
) {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      toast.success(t("common.actions.copy.success"));
    })
    .catch((err) => {
      toast.error(t("common.actions.copy.error"));
      console.error("Failed to copy text: ", err);
    });
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export { copyToClipboard, formatTimestamp };
