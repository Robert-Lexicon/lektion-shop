// Fakestore API
export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    count: number;
    rate: number;
  };
}

// Pokemon API
export interface PokeResultList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

interface NamedAPIResource {
  name: string;
  url: string;
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

interface HeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroupDetail {
  level_learned_at: number;
  version_group: NamedAPIResource;
  move_learn_method: MoveLearnMethod;
}

interface Move {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  other?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  versions?: Record<string, any>;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

interface Type {
  slot: number;
  type: NamedAPIResource;
}

interface PastType {
  generation: NamedAPIResource;
  types: Type[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: NamedAPIResource;
  sprites: Sprites;
  cries: {
    latest: string;
    legacy: string;
  };
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
}
