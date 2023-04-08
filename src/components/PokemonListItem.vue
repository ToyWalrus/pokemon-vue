<script setup lang="ts">
import type { API } from '@/model/APITypes';
import { fetchWithApi } from '@/utils/fetchWithApi';
import { formatIdNumber } from '@/utils/formatIdNumber';
import { getOfficialArtworkLink } from '@/utils/getOfficialArtworkLink';
import { computed, ref, watchEffect } from 'vue';
import TypeTag from './TypeTag.vue';

export interface PokemonListItemProps {
  id: number | string;
  compact?: boolean;
  showGradient?: boolean;
}

const props = defineProps<PokemonListItemProps>();
const pokemon = ref<API.Pokemon>();
const loading = ref(true);
const hovering = ref(false);

watchEffect(async () => {
  loading.value = true;
  pokemon.value = await fetchWithApi('pokemon', props.id);
  loading.value = false;
});

const imgUrl = computed(() => {
  return getOfficialArtworkLink(props.id);
});

const formattedId = computed(() => {
  return formatIdNumber(props.id);
});

const heightClass = computed(() => {
  return props.compact ? 'max-h-16' : 'max-h-22';
});

const imgHeight = computed(() => {
  return props.compact ? 'max-h-12' : 'max-h-16';
});

const bgClass = computed(() => {
  if (!pokemon.value || loading.value) return 'from-gray-600';
  const classes: string[] = [];
  switch (pokemon.value.types[0].type.name) {
    case 'bug':
      classes.push('from-type-bug');
      break;
    case 'dark':
      classes.push('from-type-dark');
      break;
    case 'electric':
      classes.push('from-type-electric');
      break;
    case 'water':
      classes.push('from-type-water');
      break;
    case 'grass':
      classes.push('from-type-grass');
      break;
    case 'fire':
      classes.push('from-type-fire');
      break;
    case 'flying':
      classes.push('from-type-flying');
      break;
    case 'fighting':
      classes.push('from-type-fighting');
      break;
    case 'psychic':
      classes.push('from-type-psychic');
      break;
    case 'rock':
      classes.push('from-type-rock');
      break;
    case 'ground':
      classes.push('from-type-ground');
      break;
    case 'dragon':
      classes.push('from-type-dragon');
      break;
    case 'steel':
      classes.push('from-type-steel');
      break;
    case 'fairy':
      classes.push('from-type-fairy');
      break;
    case 'ghost':
      classes.push('from-type-ghost');
      break;
    case 'normal':
      classes.push('from-type-normal');
      break;
    case 'ice':
      classes.push('from-type-ice');
      break;
    case 'poison':
      classes.push('from-type-poison');
      break;
  }

  return classes;
});
</script>

<template>
  <li
    @mouseover="hovering = true"
    @mouseout="hovering = false"
    class="relative flex flex-row justify-between min-w-list-item p-3 items-center max-h cursor-pointer border-1 border-gray-600 first:rounded-t-md last:rounded-b-md [&:not(:first-child)]:border-t-0"
    :class="heightClass">
    <div
      class="absolute transition-all top-0 bottom-0 left-0 bg-gradient-to-r -z-10 duration-200 to-80%"
      :class="[bgClass, hovering || showGradient ? 'w-full' : 'w-0']" />
    <div class="flex flex-row gap-4 items-center">
      <loading-spinner v-if="loading" />
      <img v-else :src="imgUrl" alt="official artwork" :class="imgHeight" class="drop-shadow-md" />
      <loading-spinner v-if="loading" />
      <div v-else class="flex flex-col justify-center">
        <span class="italic" :class="compact ? 'text-sm' : 'text-md'">#{{ formattedId }}</span>
        <h1 class="font-bold capitalize" :class="compact ? 'text-md' : 'text-xl'">
          {{ pokemon?.name }}
        </h1>
      </div>
    </div>
    <div class="flex gap-1 h-full" :class="compact ? 'flex-row justify-end' : 'flex-col items-end'">
      <loading-spinner v-if="loading" />
      <type-tag
        v-else
        v-for="type in pokemon?.types ?? []"
        :key="type.type.name"
        :type="type.type.name"
        :icon-only="compact"
        :size="compact ? 'S' : 'M'" />
    </div>
  </li>
</template>
