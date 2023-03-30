<script setup lang="ts">
import TypeTag from './TypeTag.vue'
import type { PokemonType } from '@/model/PokemonTypes'
import { computed } from 'vue'

export interface QuickInfoPopoverProps {
  pokemonName: string
  dexNumber?: string | number
  species?: string
  types?: PokemonType[]
  flavorText?: string
}

const props = defineProps<QuickInfoPopoverProps>()

const dexFormatted = computed(() => {
  if (typeof props.dexNumber === 'undefined') return ''
  if (typeof props.dexNumber === 'string') return props.dexNumber
  const num = props.dexNumber as number
  return num < 10 ? `00${num}` : num < 100 ? `0${num}` : num.toString()
})
</script>

<template>
  <div
    class="flex flex-col gap-4 bg-slate-100 border-primary items-center border-4 rounded-[10px] p-4 pl-6 max-w-xl min-w-[250px] shadow-lg relative">
    <div
      class="absolute -left-[13px] w-5 h-5 border-b-primary border-l-primary border-b-4 border-l-4 bg-slate-100 rotate-45" />
    <div class="flex flex-row flex-1 gap-4 items-center self-start justify-between flex-wrap w-full">
      <h1 class="text-4xl font-bold">{{ props.pokemonName }}</h1>
      <div class="flex flex-col justify-center text-sm">
        <span v-if="!!dexFormatted"> <span class="font-bold">National:&nbsp;</span>#{{ dexFormatted }} </span>
        <span v-if="!!props.species" class="italic">{{ props.species }}</span>
      </div>
      <div class="flex flex-col self-start justify-start gap-1" v-if="types?.length">
        <type-tag v-for="type in types" :type="type" :key="type" :clickable="false" :compact="true" />
      </div>
    </div>
    <span class="italic self-start" v-if="!!props.flavorText">{{ props.flavorText }}</span>
    <slot name="evolution-chain" />
  </div>
</template>
