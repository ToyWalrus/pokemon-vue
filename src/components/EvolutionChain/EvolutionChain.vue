<template>
  <div class="flex flex-row items-center w-full" :class="loading ? 'justify-center' : 'justify-around gap-2'">
    <LoadingSpinner v-if="loading" width="50" />
    <ChainPokemon v-else v-for="pokemon in pokemons" :name="pokemon.name" :url="pokemon.url" :key="pokemon.name" />
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes'
import { fetchWithApi } from '@/utils/fetchWithApi'
import { computed, ref, watchEffect } from 'vue'
import ChainPokemon from './ChainPokemon.vue'

export interface EvolutionChainProps {
  // Found from the pokemon-species/:id call
  chainId: number
}

const props = defineProps<EvolutionChainProps>()

const chain = ref<API.EvolutionChain | undefined>()
const loading = ref(false)

watchEffect(async () => {
  loading.value = true
  const response = await fetchWithApi('evolution-chain', props.chainId)
  chain.value = response.chain
  loading.value = false
})

const pokemons = computed(() => {
  const pokemons: API.GenericRefDef[] = []

  let currentLink = chain.value
  while (currentLink) {
    pokemons.push(currentLink.species)
    currentLink = currentLink.evolves_to[0]
  }

  return pokemons
})
</script>
