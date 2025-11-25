import Swal from "sweetalert2";
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

function hasNullValues(obj: Record<string, any>): boolean {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      console.log(`Property "${key}" is null.`);
      return true;
    }
  }
  return false;
}

const successAlert = (text: string, log: string, cb: Function=()=>{}) : void =>{
  Swal.fire({
    title: 'Sucesso',
    text: text,
    icon: 'success',
    showConfirmButton: false,
    timer: 1750,
    timerProgressBar: true,
  })
  console.log(log)
  cb()
}

export const confirmationAlert = (text:string, log: string, confirmCb:Function=()=>{}): void =>{
  Swal.fire({
    title: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText:"Cancelar",
    confirmButtonText: "Sim, deletar",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCb()
    }
  });
  console.log(log)
}

export { copyToClipboard, formatTimestamp, hasNullValues, successAlert };
