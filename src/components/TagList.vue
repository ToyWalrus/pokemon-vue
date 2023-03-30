<template>
  <ul class="flex flex-wrap gap-2" :class="props.row ? 'flex-row' : 'flex-col'">
    <li v-for="type in PokemonTypes" :key="type">
      <type-tag
        :type="type"
        :selected="props.selectedTags?.includes(type)"
        :clickable="props.selectable"
        :disabled="props.disabledTags?.includes(type)"
        :fill-container="true"
        @click.stop="onClick(type)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import TypeTag from './TypeTag.vue'
import type { PokemonType } from '@/model/PokemonTypes'
import { PokemonTypes } from '@/model/PokemonTypes'

export interface TagListProps {
  selectable?: boolean
  disabledTags?: PokemonType[]
  selectedTags?: PokemonType[]
  row?: boolean
}

const props = defineProps<TagListProps>()
const emit = defineEmits<{
  (e: 'click', type: PokemonType): void
}>()

function onClick(type: PokemonType) {
  console.log({ type })
  emit('click', type)
}
</script>
