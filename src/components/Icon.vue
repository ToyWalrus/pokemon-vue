<template>
  <span class="material-icons" :class="className"><slot /></span>
</template>

<script setup lang="ts">
// https://fonts.google.com/icons?icon.set=Material+Icons

import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    rounded?: boolean
    size?: 'S' | 'M' | 'L' | 'XL'
  }>(),
  { rounded: true, size: 'M' }
)

const className = computed(() => {
  return [
    props.rounded && 'material-icons-round',
    {
      'md-18': props.size === 'S',
      'md-24': props.size === 'M',
      'md-36 scale-100': props.size === 'L',
      'md-48 scale-200': props.size === 'XL',
    },
  ]
})
</script>
