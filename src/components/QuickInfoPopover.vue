<script setup lang="ts">
import TypeTag from './TypeTag.vue';
import type { PokemonType } from '@/model/PokemonTypes';
import { computed, ref, watchEffect } from 'vue';
import { fetchWithApi } from '@/utils/fetchWithApi';
import type { API } from '@/model/APITypes';
import EvolutionChain from './EvolutionChain/EvolutionChain.vue';
import { prettifyFlavorText } from '@/utils/stringHelpers';
import { formatIdNumber } from '@/utils/formatIdNumber';

export interface QuickInfoPopoverProps {
  id: number;
  types?: PokemonType[];
}

const props = defineProps<QuickInfoPopoverProps>();

const species = ref<API.PokemonSpecies | undefined>();
const pokemonTypes = ref<PokemonType[]>(props.types ?? []);

watchEffect(async () => {
  species.value = await fetchWithApi('pokemon-species', props.id);
});

watchEffect(async () => {
  if (props.types) return;
  const pokemon = await fetchWithApi('pokemon', props.id);
  pokemonTypes.value = [];
  for (const type of pokemon.types) {
    pokemonTypes.value.push(type.type.name as PokemonType);
  }
});

const dexFormatted = computed(() => {
  return formatIdNumber(props.id);
});

const genus = computed(() => {
  if (!species.value) return '';
  return species.value.genera.find(g => g.language.name === 'en')?.genus;
});

const flavorText = computed(() => {
  if (!species.value) return '';
  const text = species.value.flavor_text_entries.find(item => item.language.name === 'en')?.flavor_text;
  return prettifyFlavorText(text);
});
</script>

<template>
  <!-- TODO: maybe make border and background match primary type color -->
  <div
    class="flex flex-col gap-4 bg-slate-100 border-primary items-center border-4 rounded-[10px] p-4 pl-6 max-w-xl min-w-[250px] shadow-lg relative">
    <!-- <div
      class="absolute -left-[13px] w-5 h-5 border-b-primary border-l-primary border-b-4 border-l-4 bg-slate-100 rotate-45" /> -->
    <LoadingSpinner v-if="!species" />
    <template v-else>
      <div class="flex flex-row flex-1 gap-4 items-center self-start justify-between flex-wrap w-full">
        <h1 class="text-4xl font-bold capitalize">{{ species?.name }}</h1>
        <div class="flex flex-col justify-center text-sm">
          <span v-if="dexFormatted"><span class="font-bold">National:&nbsp;</span>#{{ dexFormatted }}</span>
          <span class="italic">{{ genus }}</span>
        </div>
        <div class="flex flex-col self-start justify-start gap-1" v-if="pokemonTypes?.length">
          <type-tag v-for="type in pokemonTypes" :type="type" :key="type" :clickable="false" size="S" />
        </div>
      </div>
      <span class="italic self-start" v-if="flavorText">{{ flavorText }}</span>
      <h3 class="font-bold text-center">Evolution Chain</h3>
      <evolution-chain :chain="species.evolution_chain.url" />
    </template>
  </div>
</template>
