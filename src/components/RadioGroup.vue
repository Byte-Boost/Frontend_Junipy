<template>
  <div class="radio-group">
    <p class="radio-title">{{ title }}</p>
    <div v-for="option in options" :key="option.value" class="radio-option">
      <input
        type="radio"
        :id="option.value"
        :value="option.value"
        :name="name"
        :checked="modelValue === option.value"
        @change="onChange(option.value)"
      />
      <label :for="option.value">{{ option.text }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import "../styles/components/InputGroup.css";

interface RadioOption {
  text: string;
  value: string;
}

const props = defineProps<{
  title: string;
  options: RadioOption[];
  modelValue: string;
  name?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const name = props.name || `radio-${Math.random().toString(36).substr(2, 9)}`;

function onChange(value: string) {
  emit("update:modelValue", value);
}
</script>