<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Autorizar Dietas</h1>

    <!-- Lista de Dietas -->
    <table class="min-w-full border border-gray-300 rounded-lg">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">Paciente</th>
          <th class="px-4 py-2 text-left">Descrição</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="dieta in dietas"
          :key="dieta.id"
          class="border-t hover:bg-gray-50"
        >
          <td class="px-4 py-2">{{ dieta.paciente }}</td>
          <td class="px-4 py-2">{{ dieta.descricao }}</td>
          <td class="px-4 py-2">
            <span
              :class="{
                'text-green-600 font-semibold': dieta.status === 'Aprovada',
                'text-yellow-600 font-semibold': dieta.status === 'Pendente',
                'text-red-600 font-semibold': dieta.status === 'Reprovada'
              }"
            >
              {{ dieta.status }}
            </span>
          </td>
          <td class="px-4 py-2 text-center">
            <button
              @click="autorizarDieta(dieta.id)"
              class="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
              v-if="dieta.status === 'Pendente'"
            >
              Autorizar
            </button>
            <button
              @click="reprovarDieta(dieta.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              v-if="dieta.status === 'Pendente'"
            >
              Reprovar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="dietas.length === 0" class="text-center text-gray-500 mt-4">
      Nenhuma dieta encontrada.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Exemplo de dietas (em produção, você buscaria da API)
const dietas = ref([
  { id: 1, paciente: "Maria Souza", descricao: "Dieta para emagrecimento", status: "Pendente" },
  { id: 2, paciente: "João Lima", descricao: "Dieta para hipertrofia", status: "Aprovada" },
  { id: 3, paciente: "Ana Paula", descricao: "Dieta para intolerância à lactose", status: "Pendente" },
]);

function autorizarDieta(id: number) {
  const dieta = dietas.value.find((d) => d.id === id);
  if (dieta) dieta.status = "Aprovada";
}

function reprovarDieta(id: number) {
  const dieta = dietas.value.find((d) => d.id === id);
  if (dieta) dieta.status = "Reprovada";
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
</style>
