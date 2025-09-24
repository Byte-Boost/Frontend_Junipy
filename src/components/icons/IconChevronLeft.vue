<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="['icon-chevron-left', className]"
  >
    <g id="Arrow / Chevron_Left_Duo">
      <path
        id="Vector"
        d="M17 16L13 12L17 8M11 16L7 12L11 8"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number;
  color?: string;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: "currentColor",
  className: "",
});
</script>

<style scoped>
.icon-chevron-left {
  display: inline-block;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.icon-chevron-left:hover {
  transform: scale(1.05) translateX(-2px);
}
</style>
