<template>
  <div class="checkbox-group">
    <p class="checkbox-title">{{ title }}</p>
    <div
      v-for="option in options"
      :key="option.value"
      class="checkbox-option"
    >
      <input
        type="checkbox"
        :id="option.value"
        :value="option.value"
        :checked="modelValue.includes(option.value)"
        @change="onChange(option.value, $event?.target?.checked)"
      />
      <label :for="option.value">{{ option.text }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import "../styles/components/InputGroup.css";

interface CheckboxOption {
  text: string;
  value: string;
}

const props = defineProps<{
  title: string;
  options: CheckboxOption[];
  modelValue: string[];
  exclusiveValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

function onChange(value: string, checked: boolean) {
  let newValue = [...props.modelValue];

  if (checked && props.exclusiveValue && value === props.exclusiveValue) {
    newValue = [props.exclusiveValue]; // clear everything else
  }

  else if (checked && props.exclusiveValue && newValue.includes(props.exclusiveValue)) {
    newValue = newValue.filter(v => v !== props.exclusiveValue);
    newValue.push(value);
  }

  else if (checked) {
    if (!newValue.includes(value)) newValue.push(value);
  } 
  
  else {
    newValue = newValue.filter(v => v !== value);
  }

  emit("update:modelValue", newValue);
}
</script>
