// https://pokeapi.co/docs/v2
export namespace API {
  // #region Misc
  type Language = GenericDef;

  interface VersionGroup extends GenericDef {
    order: number;
    generation: GenericDef;
    versions: GenericDef[];
  }

  interface Name {
    name: string;
    language: GenericDef;
  }

  interface GenericDef {
    id: number;
    name: string;
  }

  export interface GenericRefDef {
    name: string;
    url: string;
  }

  interface FlavorText {
    flavor_text: string;
    language: GenericDef;
  }
  // #endregion

  // #region Pokemon
  export interface Pokemon extends GenericDef {
    base_experience: number;
    height: number;
    weight: number;
    is_default: boolean;
    order: number;
    moves: { move: Move }[];
    held_items: { item: Item }[];
    game_indices: { game_index: number; version: GenericRefDef }[];
    abilities: { is_hidden: boolean; slot: number; ability: Ability }[];
    stats: { effort: number; base_stat: number; stat: GenericDef }[];
    types: { type: PokemonType }[];
    sprites: PokemonSprites;
    species: GenericRefDef;
  }

  export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
  }

  export interface Ability extends GenericDef {
    is_main_series: boolean;
    generation: GenericDef;
    flavor_text_entries: FlavorText[];
  }

  export interface PokemonType extends GenericDef {
    move_damage_class: GenericDef;
    names: Name[];
  }

  export interface PokemonSpecies extends GenericDef {
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    evolution_chain: { url: string };
    genera: { genus: string; language: Language }[];
    flavor_text_entries: FlavorText[];
    growth_rate: GenericDef & {
      formula: string;
      descriptions: { description: string; language: Language }[];
      levels: { level: number; experience: number }[];
    };
  }

  export interface Move extends GenericDef {
    accuracy: number;
    effect_chance: number;
    pp: number;
    priority: number;
    power: number;
    type: GenericDef;
    damage_class: GenericDef & { names: Name[] };
    flavor_text_entries: { flavor_text: string; language: Language; version_group: VersionGroup };
    stat_changes: { change: number; stat: GenericDef }[];
    meta: MoveMeta;
    target: GenericDef;
  }

  export interface MoveMeta {
    category: GenericDef;
    ailment?: GenericDef;
    min_hits?: number;
    max_hits?: number;
    min_turns?: number;
    max_turns?: number;
    drain?: number;
    healing?: number;
    crit_rate?: number;
    ailment_chance?: number;
    flinch_chance?: number;
    stat_chance?: number;
  }
  // #endregion

  // #region Evolution
  export interface EvolutionBase {
    id: number;
    chain: EvolutionChain;
    baby_trigger_item?: any;
  }

  export interface EvolutionChain {
    is_baby: boolean;
    species: GenericRefDef;
    evolution_details?: EvolutionDetails[];
    evolves_to: EvolutionChain[];
  }

  export interface EvolutionDetails {
    item?: Item;
    trigger?: GenericRefDef;
    gender?: number;
    held_item?: Item;
    known_move?: Move;
    known_move_type?: GenericDef;
    min_level?: number;
    min_happiness?: number;
    min_beauty?: number;
    min_affection?: number;
    trade_species?: any;
    time_of_day?: string;
    needs_overworld_rain?: boolean;
    turn_upside_down?: boolean;
    location?: any;
  }
  // #endregion

  // #region Other
  export interface Item extends GenericDef {
    category: GenericDef & { names: Name[] };
    effect_entries: { effect: string; short_effect: string; language: Language }[];
    flavor_text_entries: { text: string; language: Language; version_group: VersionGroup }[];
    sprites: { default: string }[];
  }
  // #endregion
}
