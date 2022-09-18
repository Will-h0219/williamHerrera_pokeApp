export interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: ResultItem[];
}

export interface ResultItem {
  name: string;
  url: string;
}

// Interface for Detail search
export interface DetailPokemon {
  name: string;
  id: number;
  types: Type[];
  weight: number;
  sprites: Sprites;
  moves: Move[];
}

export interface Type {
  slot: number;
  type: TypeClass;
}

export interface TypeClass {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: Other;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
}

export interface DreamWorld {
  front_default: string;
  front_female: string;
}

export interface Home {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface Move {
  move:                  MoveClass;
  version_group_details: VersionGroupDetail[];
}

export interface MoveClass {
  name: string;
  url:  string;
}

export interface VersionGroupDetail {
  level_learned_at:  number;
  move_learn_method: MoveClass;
  version_group:     MoveClass;
}
