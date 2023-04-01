<template>
  <img src="Pokeball.svg" class="animate-loading-spin duration-300" :width="props.width" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ width?: number | string }>(), { width: 50 })
</script>
