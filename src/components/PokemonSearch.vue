<template>
  <div class="flex flex-row w-full gap-4">
    <div class="flex flex-col flex-[2] gap-4">
      <SearchField @on-change="onChangeSearchValue" :change-debounce="150" />
      <ul>
        <PokemonListItem
          v-for="pokemonRef in filteredPokemon"
          :key="pokemonRef.name"
          :id="pokemonRef.id"
          :show-gradient="selectedId === undefined ? undefined : selectedId === pokemonRef.id"
          @hover-change="hovering => onItemHoverChange(pokemonRef.id, hovering)"
          @click="selectedId === pokemonRef.id ? (selectedId = undefined) : (selectedId = pokemonRef.id)" />
      </ul>
    </div>
    <div class="flex-1">
      <QuickInfoPopover v-if="!!selectedId" :id="selectedId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes';
import { fetchListWithApi } from '@/utils/fetchWithApi';
import { computed, ref } from 'vue';
import SearchField from '@/components/SearchField.vue';
import { getIdFromUrl } from '@/utils/getIdFromUrl';
import PokemonListItem from '@/components/PokemonListItem.vue';
import QuickInfoPopover from './QuickInfoPopover.vue';

const pokemonRefList = ref<(API.GenericRefDef & { id: number })[]>([]);
const filterValue = ref('');
const hoveredId = ref<number | undefined>();
const selectedId = ref<number | undefined>();

async function getInitialList() {
  const list = await fetchListWithApi('pokemon', 3);
  pokemonRefList.value = list.map(item => ({ ...item, id: getIdFromUrl(item.url) }));
}

function onChangeSearchValue(newValue: string) {
  filterValue.value = newValue;
}

const filteredPokemon = computed(() => {
  if (!filterValue.value) return pokemonRefList.value;
  return pokemonRefList.value.filter(
    ({ name, id }) => name.includes(filterValue.value) || id.toString().includes(filterValue.value)
  );
});

function onItemHoverChange(id: number, isHovering: boolean) {
  if (isHovering) {
    hoveredId.value = id;
  } else {
    hoveredId.value = undefined;
  }
}
getInitialList();
</script>