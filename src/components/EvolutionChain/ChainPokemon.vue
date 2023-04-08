<template>
  <div class="flex flex-col items-center justify-between h-full">
    <img
      :src="sprite"
      class="drop-shadow-pokemon max-h-48 transition-all object-cover duration-200 hover:drop-shadow-pokemon-raised hover:-translate-y-1"
      :alt="`image of ${props.name}`" />
    <h4 class="capitalize font-pokemon-solid text-lg tracking-widest">{{ props.name }}</h4>
  </div>
</template>

<script setup lang="ts">
import { getOfficialArtworkLink } from '@/utils/getOfficialArtworkLink';
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  url: string;
}>();

const id = computed(() => {
  if (!props.url) return undefined;
  const urlParts = props.url.split('/');
  urlParts.splice(urlParts.length - 1, 1);
  urlParts.reverse();
  return urlParts[0];
});

const sprite = computed(() => {
  if (!id.value) return '';
  return getOfficialArtworkLink(id.value);
});
</script>
