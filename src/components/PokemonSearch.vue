<template>
  <div class="flex flex-col w-full gap-4">
    <SearchField @on-change="onChangeSearchValue" :change-debounce="150" />
    <ul>
      <PokemonListItem v-for="pokemonRef in filteredPokemon" :key="pokemonRef.name" :id="pokemonRef.id" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { API } from '@/model/APITypes';
import { fetchListWithApi } from '@/utils/fetchWithApi';
import { computed, ref } from 'vue';
import SearchField from '@/components/SearchField.vue';
import { getIdFromUrl } from '@/utils/getIdFromUrl';
import PokemonListItem from '@/components/PokemonListItem.vue';

const pokemonRefList = ref<(API.GenericRefDef & { id: number })[]>([]);
const filterValue = ref('');

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

getInitialList();
</script>
