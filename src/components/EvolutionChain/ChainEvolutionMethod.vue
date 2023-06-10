<template>
  <div class="flex flex-col h-full max-w-xs items-center gap-4" v-if="props.details.length">
    <Icon :rounded="true" class="flex-1" size="XL">east</Icon>
    <div class="font-bold text-sm">{{ methodText }}</div>
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes';
import { kebabCaseToCamelCase } from '@/utils/stringHelpers';
import { computed } from 'vue';

interface EvolutionMethodProps {
  details: API.EvolutionDetails[];
}

const props = defineProps<EvolutionMethodProps>();

const methodText = computed(() => {
  const details: string[] = [];
  let tradeInfo = '';

  for (const detail of props.details) {
    switch (detail.trigger?.name) {
      case 'level-up':
        if (typeof detail.min_level === 'number' && !details.find(d => /Level \d+/.test(d))) {
          details.push(`Level ${detail.min_level}`);
        }
        if (typeof detail.min_happiness === 'number') {
          details.push(`Happiness ${detail.min_happiness}`);
        }
        if (typeof detail.min_affection === 'number') {
          details.push(`Friendship ${detail.min_affection}`);
        }
        if (typeof detail.gender === 'number') {
          details.push(`${detail.gender === 0 ? 'Male' : 'Female'}`);
        }
        if (detail.held_item) {
          details.push(`Level up holding ${kebabCaseToCamelCase(detail.held_item.name)}`);
        }
        if (detail.time_of_day) {
          details.push(detail.time_of_day.substring(0, 1).toUpperCase() + detail.time_of_day.substring(1));
        }
        if (detail.known_move) {
          details.push(`After ${kebabCaseToCamelCase(detail.known_move.name, true, false)} learned`);
        }
        if (detail.location) {
          details.push(`Level up at ${kebabCaseToCamelCase(detail.location.name)}`);
        }
        break;
      case 'use-item':
        details.push(kebabCaseToCamelCase(detail.item?.name));
        break;
      case 'trade':
        tradeInfo = 'Trade';
        if (detail.held_item) {
          tradeInfo += ` holding ${kebabCaseToCamelCase(detail.held_item.name, true, false)}`;
        }
        details.push(tradeInfo);
        break;
      case 'recoil-damage':
        details.push('Take enough recoil damage in battle');
        break;
      case 'three-critical-hits':
        details.push('Land 3 critical hits in battle');
        break;
      case 'other':
        details.push('???');
        break;
      default:
        console.warn('Evolution method not resolved', detail.trigger?.name);
        break;
    }
  }
  return details.join(', ');
});
</script>
