import type { API } from '@/model/APITypes';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface FetchOptions {
  limit?: number;
  offset?: number;
}

const pokemonNames: API.GenericRefDef[] = [];

export async function getAllPokemon() {
  if (pokemonNames.length) return pokemonNames;
  const response = await fetch(`${BASE_URL}/pokemon?limit=1010`);
  const body = await response.json();
  pokemonNames.push(...body.results);
  return pokemonNames;
}

export async function fetchListWithApi(endpoint: PokeEndpoint, options?: FetchOptions): Promise<API.GenericRefDef[]> {
  const response = await fetch(`${BASE_URL}/${endpoint}/?limit=${options?.limit ?? 200}`);
  const body = await response.json();
  return body.results;
}

export async function fetchWithApi<T extends PokeEndpoint>(
  endpoint: T,
  id?: string | number
): Promise<ApiReturnType<T>> {
  const response = await fetch(`${BASE_URL}/${endpoint}/${id}`);
  const body = await response.json();
  return body;
}

export type PokeEndpoint = 'pokemon' | 'pokemon-species' | 'evolution-chain' | 'move' | 'ability' | 'nature';

type ApiReturnType<T extends PokeEndpoint> = T extends 'pokemon'
  ? API.Pokemon
  : T extends 'pokemon-species'
  ? API.PokemonSpecies
  : T extends 'evolution-chain'
  ? API.EvolutionBase
  : T extends 'move'
  ? API.Move
  : T extends 'ability'
  ? API.Ability
  : T extends 'nature'
  ? Record<string, any> // TODO: create nature type
  : never;
