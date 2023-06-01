<template>
  <div class="flex flex-row items-center w-full justify-around gap-2">
    <EvolutionChain v-for="level in levels" :key="level" :chain="chain" :level="level" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import EvolutionChain from './EvolutionChain.vue';
import type { API } from '@/model/APITypes';
import { fetchWithApi } from '@/utils/fetchWithApi';
import { getIdFromUrl } from '@/utils/getIdFromUrl';

export interface EvolutionChainWrapperProps {
  chain: number | string;
}

const props = defineProps<EvolutionChainWrapperProps>();

const chain = ref<API.EvolutionChain | undefined>();
const loading = ref(false);

watchEffect(async () => {
  loading.value = true;
  const id = typeof props.chain === 'number' ? props.chain : getIdFromUrl(props.chain);
  const response = await fetchWithApi('evolution-chain', id);
  chain.value = response.chain;
  loading.value = false;
});

const levels = computed(() => {
  if (!chain.value) return 0;

  const getLevelCount = (chain: API.EvolutionChain, currentLevel = 0) => {
    let count = currentLevel;

    if (chain.evolves_to.length) {
      count += 1;

      const subsequentChainLengths: number[] = [];
      for (const evolution of chain.evolves_to) {
        subsequentChainLengths.push(getLevelCount(evolution, count));
      }

      count = Math.max(count, ...subsequentChainLengths);
    }

    return count;
  };

  return getLevelCount(chain.value, 1);
});
</script>
