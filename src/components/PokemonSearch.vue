<template>
  <div class="flex flex-row w-full gap-4 max-h-screen p-4">
    <div class="flex flex-col flex-[2] gap-4">
      <div class="flex flex-row w-full items-end gap-2">
        <SearchField class="flex-1" @on-change="onChangeSearchValue" :change-debounce="150" />
        <span> Compact <input type="checkbox" v-model="compact" /></span>
      </div>
      <ul class="flex-1 overflow-y-auto border-1 border-gray-600 rounded-md">
        <PokemonListItem
          v-for="(pokemonRef, idx) in filteredPokemon"
          :compact="compact"
          :key="pokemonRef.name"
          :id="pokemonRef.id"
          :show-gradient="
            selectedId === undefined ? undefined : selectedId === pokemonRef.id || hoveredId === pokemonRef.id
          "
          @hover-change="hovering => onItemHoverChange(pokemonRef.id, hovering)"
          @click="selectedId === pokemonRef.id ? (selectedId = undefined) : (selectedId = pokemonRef.id)"
          :class="idx !== 0 && 'border-gray-600 border-t-1'" />
      </ul>
    </div>
    <div class="flex-1 flex-col flex justify-center items-center">
      <QuickInfoPopover v-if="!!selectedId" :id="selectedId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes';
import { getAllPokemon } from '@/utils/fetchWithApi';
import { computed, ref } from 'vue';
import SearchField from '@/components/SearchField.vue';
import { getIdFromUrl } from '@/utils/getIdFromUrl';
import PokemonListItem from '@/components/PokemonListItem.vue';
import QuickInfoPopover from './QuickInfoPopover.vue';
import Fuse from 'fuse.js';

type PokemonRef = API.GenericRefDef & { id: number };

const fullPokemonList = ref<PokemonRef[] | undefined>();
const virtualizedList = ref<PokemonRef[]>([]);
const fuzzySearch = ref<Fuse<PokemonRef> | undefined>();

const filterValue = ref('');
const hoveredId = ref<number | undefined>();
const selectedId = ref<number | undefined>();
const compact = ref<boolean>(false);

const queryLimit = 100;

async function getInitialList() {
  const allPokemon = await getAllPokemon();
  const mapped = allPokemon.map(item => ({ ...item, id: getIdFromUrl(item.url) }));

  fullPokemonList.value = mapped;
  virtualizedList.value = mapped.slice(0, queryLimit);

  fuzzySearch.value = new Fuse(mapped, { keys: ['id', 'name'], threshold: 0.4 });
}

function onChangeSearchValue(newValue: string) {
  filterValue.value = newValue;
}

const filteredPokemon = computed(() => {
  if (!filterValue.value || !fuzzySearch.value) return virtualizedList.value;
  return fuzzySearch.value.search(filterValue.value).map(result => result.item);
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
