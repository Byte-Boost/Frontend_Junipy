<template>
  <CloudyBackground>
    <div class="diet-container p-8 flex flex-col min-h-screen w-full">
      <header class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Minha dieta</h1>

        <!-- Status badge -->
        <div
          v-if="statusLabel"
          :class="['px-3 py-1 rounded-full text-sm font-medium border', statusClass]"
        >
          {{ statusLabel }}
        </div>
      </header>

      <!-- Add padding-top here to push the card down -->
      <div class="pt-10 flex-1">
        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center h-full">
          <div
            class="w-6 h-6 border-4 border-gray-300 border-t-white rounded-full animate-spin"
          ></div>
        </div>

        <!-- Diet content -->
        <div
          v-else
          class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 overflow-y-auto text-gray-100 prose prose-invert max-w-none flex flex-col justify-between"
        >
          <div>
            <div v-html="renderMarkdown(diet?.markdownDiet)"></div>

            <div v-if="!diet?.markdownDiet" class="text-center mt-6">
              Nenhuma dieta disponível.
            </div>
          </div>

          <!-- Review button -->
          <div class="mt-10 flex justify-end">
            <button
              v-if="diet?.id && showReviewButton"
              @click="sendForReview(diet.id)"
              :disabled="isReviewing"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-all mt-6"
            >
              {{ isReviewing ? "Já está em análise" : "Enviar para análise" }}
            </button>
          </div>
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

// Badge text
const statusLabel = computed(() => status.value);

// Badge color
const statusClass = computed(() => {
  switch (status.value) {
    case "Em Revisão":
      return "bg-blue-500/40 text-blue-300 border-blue-400/60";
    case "Aprovado":
      return "bg-green-500/40 text-green-300 border-green-400/60";
    case "Recusado":
      return "bg-red-500/40 text-red-300 border-red-400/60";
    default:
      return "bg-yellow-500/40 text-yellow-300 border-yellow-400/60";
  }
});

// Show review button only if not approved or rejected
const showReviewButton = computed(() => {
  return status.value !== "Aprovado" && status.value !== "Recusado";
});

// Disable button when already under review
const isReviewing = computed(() => status.value === "Em Revisão");

// Load the user's diet
async function loadDiet() {
  try {
    isLoading.value = true;
    const data = await getDietData();
    diet.value = Array.isArray(data) && data.length > 0 ? data[2] : null;

    if (diet.value) {
      await checkDietStatus(diet.value.id);
    }
  } catch (err) {
    console.error("Error loading diet:", err);
    diet.value = null;
    status.value = "Error";
  } finally {
    isLoading.value = false;
  }
}

// Check the current status of the user's diet
async function checkDietStatus(dietId) {
  try {
    const requests = await getAnalisysRequests();

    const analysis = Array.isArray(requests)
      ? requests.find((req) => req.dietId === dietId)
      : null;

    if (analysis) {
      switch (analysis.status) {
        case "IN_PROGRESS":
          status.value = "Em Revisão";
          break;
        case "APPROVED":
          status.value = "Aprovado";
          break;
        case "DECLINED":
          status.value = "Recusado";
          break;
        default:
          status.value = "Pendente";
      }
    } else {
      status.value = "Pendente";
    }
  } catch (err) {
    console.error("Error fetching analysis:", err);
    status.value = "Pendente";
  }
}

// Send the diet for review
async function sendForReview(dietId) {
  if (!dietId) return;
  try {
    await dietRequestAnalisys(dietId);
    alert("Diet successfully sent for review.");
    status.value = "Em Revisão";
  } catch (err) {
    console.error("Error sending diet for review:", err);
    alert("Failed to send diet for review.");
  }
}

// Convert markdown to HTML
function renderMarkdown(text) {
  return marked.parse(text || "_(No content available)_");
}

onMounted(loadDiet);
</script>

<style scoped>
.diet-container {
  min-height: 100vh;
}
.diet-container * {
  color: var(--label-color)
}
.prose {
  max-width: none;
}
</style>
