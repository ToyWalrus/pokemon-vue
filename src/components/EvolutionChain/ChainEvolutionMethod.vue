<template>
  <div class="flex flex-col h-full max-w-xs items-center gap-4" v-if="props.details.length">
    <Icon :rounded="true" class="flex-1" size="XL">east</Icon>
    <div class="font-bold text-sm">{{ methodText }}</div>
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes'
import { computed } from 'vue'

interface EvolutionMethodProps {
  details: API.EvolutionDetails[]
}

const props = defineProps<EvolutionMethodProps>()

const methodText = computed(() => {
  const details: string[] = []
  for (const detail of props.details) {
    switch (detail.trigger?.name) {
      case 'level-up':
        if (typeof detail.min_level === 'number') {
          details.push(`Level ${detail.min_level}`)
        }
        if (typeof detail.min_happiness === 'number') {
          details.push(`Happiness ${detail.min_happiness}`)
        }
        if (typeof detail.min_affection === 'number') {
          details.push(`Friendship ${detail.min_affection}`)
        }
        break
      case 'use-item':
        // TODO: make call for item name?
        details.push(prettifyString(detail.item?.name))
        break
      default:
        console.warn('Evolution method not resolved', detail.trigger?.name)
        break
    }
  }
  return details.join(', ')
})

function prettifyString(str?: string) {
  if (!str) return ''
  const parts = str.split('-')
  const capitalize = (str: string) => str.substring(0, 1).toUpperCase() + str.substring(1)
  return parts.map(capitalize).join(' ')
}
</script>
