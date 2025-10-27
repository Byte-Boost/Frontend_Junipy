<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    fill="currentColor"
    strolke
    viewBox="0 0 16 16"
  >
    <path
      d="M10 1.5a.5.5 0 0 1 .5.5v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3H1.5a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h9zM6 4v9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H6zm-1 8H2V2h8v1H5a2 2 0 0 0-2 2v7z"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String,
    default: "currentColor",
  },
});
</script>
