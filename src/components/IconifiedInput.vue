<template>
  <div class="iconified-input">
    <label :for="props.id" v-if="!props.labelHidden">{{
      t(props.labelText)
    }}</label>
    <div class="relative flex items-center">
      <input
        :id="props.id"
        v-model="props.inputModel"
        :type="props.type"
        class="peer pl-10"
        :placeholder="t(props.placeholderText)"
        @input="onInput"
      />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTypedI18n } from "@/composables/useI18n";
import type { I18nKeys } from "@/types/global";
import type { InputTypeHTMLAttribute } from "vue";

const { t } = useTypedI18n();
const props = withDefaults(
  defineProps<{
    id?: string;
    type: InputTypeHTMLAttribute;
    inputModel: any;
    labelText: I18nKeys;
    placeholderText: I18nKeys;
    labelHidden?: boolean;
  }>(),
  {
    labelHidden: true,
  }
);
const emit = defineEmits(["update:inputModel"]);

function onInput(event: Event) {
  emit("update:inputModel", (event.target as HTMLInputElement).value);
}
</script>
