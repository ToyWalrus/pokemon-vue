<template>
  <ul class="overflow-y-auto relative" :class="hideScrollbar && 'no-scrollbar'" ref="listRef">
    <template v-for="(item, index) in items" :key="item.id">
      <slot v-if="indexIsInRange(index)" :item="item" :style="getItemStyleProp(index)" :index="index" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref, watchEffect, type HTMLAttributes } from 'vue';

export interface VirtualizedListProps {
  items: { id: string | number }[];
  itemHeight: number;
  maxItemsShown?: number;
  renderBuffer?: number;
  hideScrollbar?: boolean;
}

const props = defineProps<VirtualizedListProps>();

const renderedRange = ref<[number, number]>([0, 0]);
const listRef = ref<HTMLUListElement>();

watchEffect(() => {
  const listHeight = props.items.length * props.itemHeight;
  const heightDiff = renderedRange.value[1] - listHeight;
  if (heightDiff > 0) {
    setRenderedRange(renderedRange.value[0] - heightDiff, renderedRange.value[1] - heightDiff);
  }
});

function calculateRenderedRange() {
  const listEl = listRef.value;
  if (!listEl) return;

  const elHeight = listEl.clientHeight;
  const currentScroll = listEl.scrollTop;

  const maxSeenElements = Math.min(
    props.maxItemsShown ?? Number.POSITIVE_INFINITY,
    Math.ceil(elHeight / props.itemHeight)
  );
  const firstElementIndex = Math.floor(currentScroll / props.itemHeight);

  setRenderedRange(firstElementIndex, maxSeenElements);
}

function setRenderedRange(firstIndex: number, maxItemsSeen: number) {
  const renderBuffer = props.renderBuffer ?? 2;
  const min = Math.max(firstIndex - renderBuffer, 0);
  const max = Math.min(firstIndex + maxItemsSeen + renderBuffer, props.items.length - 1);
  renderedRange.value = [min, max];
}

function indexIsInRange(index: number) {
  return index >= renderedRange.value[0] && index <= renderedRange.value[1];
}

function getItemStyleProp(index: number): HTMLAttributes['style'] {
  return {
    top: `${index * props.itemHeight}px`,
    height: `${props.itemHeight}px`,
    position: 'absolute',
    width: '100%',
  };
}

watchEffect(() => {
  const listEl = listRef.value;
  if (listEl) {
    listEl.addEventListener('scroll', calculateRenderedRange);
    window.addEventListener('resize', calculateRenderedRange);
    calculateRenderedRange();
  }
});
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
