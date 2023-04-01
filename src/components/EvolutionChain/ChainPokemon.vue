<template>
  <div class="flex flex-col items-center">
    <img
      :src="sprite"
      class="drop-shadow-pokemon transition-all duration-300 hover:drop-shadow-pokemon-raised hover:-translate-y-1"
      :alt="`image of ${props.name}`" />
    <h4 class="capitalize font-bold">{{ props.name }}</h4>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  url: string
}>()

const id = computed(() => {
  if (!props.url) return undefined
  const urlParts = props.url.split('/')
  urlParts.splice(urlParts.length - 1, 1)
  urlParts.reverse()
  return urlParts[0]
})

const sprite = computed(() => {
  if (!id.value) return ''
  return `https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/other/official-artwork/${id.value}.png`
})
</script>
