<template>
  <div class="flex flex-row items-center w-full" :class="loading ? 'justify-center' : 'justify-around gap-2'">
    <LoadingSpinner v-if="loading" width="50" />
    <template v-else v-for="[pokemon, evolvesTo] in evolutions.entries()" :key="pokemon.name">
      <ChainGroup :pokemon="pokemon" :details="getEvolutionDetailsFor(pokemon)" />
      <div class="flex flex-col">
        <ChainGroup
          v-for="evolve in evolvesTo"
          :key="evolve.name"
          :pokemon="evolve"
          :details="getEvolutionDetailsFor(evolve)" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes';
import { fetchWithApi } from '@/utils/fetchWithApi';
import { computed, ref, watchEffect } from 'vue';
import ChainGroup from './ChainGroup.vue';
import { getIdFromUrl } from '@/utils/getIdFromUrl';

export interface EvolutionChainProps {
  // Either full url or chainId
  chain: number | string;
}

const props = defineProps<EvolutionChainProps>();

const chain = ref<API.EvolutionChain | undefined>();
const loading = ref(false);

watchEffect(async () => {
  loading.value = true;
  const id = typeof props.chain === 'number' ? props.chain : getIdFromUrl(props.chain);
  const response = await fetchWithApi('evolution-chain', id);
  chain.value = response.chain;
  loading.value = false;
});

const evolutions = computed(() => {
  const evolutionMap: Map<API.GenericRefDef, API.GenericRefDef[]> = new Map();

  const setChainLink = (link?: API.EvolutionChain) => {
    if (!link) return;
    if (!evolutionMap.has(link.species) && link.evolves_to.length) {
      evolutionMap.set(link.species, []);
    }

    for (let i = 0; i < link.evolves_to.length; ++i) {
      evolutionMap.get(link.species)!.push(link.evolves_to[i].species);
      setChainLink(link.evolves_to[i]);
    }
  };

  setChainLink(chain.value);

  return evolutionMap;
});

function getEvolutionDetailsFor(pokemon: API.GenericRefDef) {
  let current = chain.value;
  while (current && pokemon !== current.species) {
    current = current.evolves_to.find(item => item.species.name === pokemon.name);
  }
  return current?.evolution_details ?? [];
}
</script>
