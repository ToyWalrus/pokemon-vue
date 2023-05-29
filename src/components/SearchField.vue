<template>
  <div class="flex flex-col gap-1 items-start">
    <label class="text-xs">{{ props.label ?? 'Search' }}</label>
    <div class="w-full relative">
      <input
        ref="inputRef"
        :disabled="props.disabled"
        :class="[
          'w-full text-sm transition-colors duration-300 outline-none border-2 rounded px-10 py-1',
          !props.disabled && 'border-primary focus-within:border-accent',
        ]"
        type="text"
        v-model="searchValue" />
      <button
        tabindex="-1"
        :class="['absolute left-2 top-1', props.disabled && 'text-gray-400']"
        :disabled="props.disabled"
        @click="inputRef.focus()">
        <MagnifyIcon />
      </button>
      <button
        v-if="!props.disabled && !!searchValue"
        class="absolute right-2 top-1 transition-colors hover:text-secondary"
        @click="searchValue = ''">
        <CloseIcon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';

export interface SearchFieldProps {
  label?: string;
  disabled?: boolean;
  changeDebounce?: number;
}

const props = defineProps<SearchFieldProps>();
const emit = defineEmits<{
  (e: 'onChange', val: string): void;
}>();

const searchValue = ref('');
const inputRef = ref();
let debounceTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

watchEffect(() => {
  const val = searchValue.value;

  const emitChange = () => {
    emit('onChange', val);
    debounceTimeout = undefined;
  };

  if (typeof props.changeDebounce === 'undefined') {
    emitChange();
  } else {
    if (debounceTimeout !== undefined) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(emitChange, props.changeDebounce);
  }
});
</script>
