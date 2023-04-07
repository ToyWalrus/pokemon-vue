<template>
  <div class="flex items-center flex-row">
    <ChainEvolutionMethod v-if="props.details?.length" :details="props.details" />
    <ChainPokemon v-bind="props.pokemon" class="flex-1" />
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes'
import ChainEvolutionMethod from './ChainEvolutionMethod.vue'
import ChainPokemon from './ChainPokemon.vue'

interface ChainGroupProps {
  pokemon: API.GenericRefDef
  details?: API.EvolutionDetails[]
}

const props = defineProps<ChainGroupProps>()
</script>
