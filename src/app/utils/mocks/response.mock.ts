import { PokemonResponse } from "../../data/interfaces/pokemon.interfaces";

export const responseMock: PokemonResponse = {
  count: 1154,
  next: "https://pokeapi.co/api/v2/pokemon?offset=4&limit=4",
  previous: '',
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/"
    }
  ]
}