<template>
  <CloudyBackground>
    <div class="diet-container p-8 flex flex-col h-full w-full">
      <!-- Cabeçalho -->
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-white">Minha dieta</h1>

        <!-- Indicador de status dinâmico -->
        <div
          v-if="statusLabel"
          :class="['px-3 py-1 rounded-full text-sm font-medium border', statusClass]"
        >
          {{ statusLabel }}
        </div>
      </header>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center items-center h-full">
        <div
          class="w-6 h-6 border-4 border-gray-300 border-t-white rounded-full animate-spin"
        ></div>
      </div>

      <!-- Conteúdo -->
      <div
        v-else
        class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 overflow-y-auto text-gray-100 prose prose-invert max-w-none flex flex-col justify-between"
      >
        <div>
          <div v-html="renderMarkdown(diet?.markdownDiet)"></div>

          <div v-if="!diet?.markdownDiet" class="text-center text-gray-400 mt-6">
            Nenhuma dieta disponível.
          </div>
        </div>

        <!-- Botão -->
        <div class="mt-10 flex justify-end">
          <button
            v-if="diet?.id && showReviewButton"
            @click="sendForReview(diet.id)"
            :disabled="status.value === 'Em análise'"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-all mt-6"
          >
            {{ status.value === 'Em análise' ? 'Já está em análise' : 'Enviar para análise' }}
          </button>
        </div>
      </div>
    </div>
  </CloudyBackground>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { marked } from "marked";
import CloudyBackground from "@/components/CloudyBackground.vue";
import {
  getDietData,
  dietRequestAnalisys,
  getAnalisysRequests,
} from "@/scripts/http-requests/endpoints";

const isLoading = ref(true);
const diet = ref(null);
const status = ref("Pendente");

// texto do badge
const statusLabel = computed(() => status.value);

// cor do badge
const statusClass = computed(() => {
  switch (status.value) {
    case "Em análise":
      return "bg-blue-500/20 text-blue-300 border-blue-400/40";
    case "Aprovada":
      return "bg-green-500/20 text-green-300 border-green-400/40";
    case "Recusada":
      return "bg-red-500/20 text-red-300 border-red-400/40";
    default:
      return "bg-yellow-500/20 text-yellow-300 border-yellow-400/40";
  }
});

// controla visibilidade do botão
const showReviewButton = computed(() => {
  return status.value !== "Aprovada" && status.value !== "Recusada";
});

async function loadDiet() {
  try {
    isLoading.value = true;

    // 1️⃣ busca dieta
    const data = await getDietData();
    diet.value = Array.isArray(data) && data.length > 0 ? data[1] : null; // MUDAR PARA 0 DEPOIS HEIN N ESQUECE NAO MAMACO

    // 2️⃣ se existir dieta, busca status de análise
    if (diet.value) {
      await checkDietStatus(diet.value.id);
    }
  } catch (err) {
    console.error("Erro ao carregar dieta:", err);
    diet.value = null;
    status.value = "Erro";
  } finally {
    isLoading.value = false;
  }
}

// verifica status atual da análise
async function checkDietStatus(dietId) {
  try {
    const requests = await getAnalisysRequests();

    const analysis = Array.isArray(requests)
      ? requests.find((req) => req.dietId === dietId)
      : null;

    if (analysis) {
      switch (analysis.status) {
        case "REVIEW":
          status.value = "Em análise";
          break;
        case "APPROVED":
          status.value = "Aprovada";
          break;
        case "DECLINED":
        case "REJECTED":
          status.value = "Recusada";
          break;
        default:
          status.value = "Pendente";
      }
    } else {
      status.value = "Pendente";
    }
  } catch (err) {
    console.error("Erro ao buscar análises:", err);
    status.value = "Pendente";
  }
}

// envia para análise
async function sendForReview(dietId) {
  if (!dietId) return;
  try {
    await dietRequestAnalisys(dietId);
    alert("✅ Dieta enviada para análise com sucesso!");
    status.value = "Em análise";
  } catch (err) {
    console.error("Erro ao enviar dieta para análise:", err);
    alert("❌ Erro ao enviar a dieta para análise.");
  }
}

// markdown → html
function renderMarkdown(text) {
  return marked.parse(text || "_(Sem conteúdo disponível)_");
}

onMounted(loadDiet);
</script>

<style scoped>
.diet-container {
  min-height: 100vh;
}
.prose {
  max-width: none;
}
</style>
