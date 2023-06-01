<template>
  <LoadingSpinner v-if="loading" width="50" />
  <div class="flex flex-col gap-4" v-else>
    <ChainGroup
      v-for="pokemon in evolutionsAtLevel"
      :key="pokemon.species.url"
      :pokemon="pokemon.species"
      :details="pokemon.evolution_details" />
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes';
import { computed, ref } from 'vue';
import ChainGroup from './ChainGroup.vue';

export interface EvolutionChainProps {
  chain: API.EvolutionChain;
  level: number;
}

const props = defineProps<EvolutionChainProps>();

const loading = ref(false);

const evolutionsAtLevel = computed(() => {
  let level = props.level;
  let evolutions = [props.chain];

  while (level > 1) {
    level -= 1;
    evolutions = evolutions[0]?.evolves_to ?? [];
  }

  return evolutions.filter(v => !!v) as API.EvolutionChain[];
});
</script>
