import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../../../../data/services/pokemon.service';

import { DetailPokemon, PokemonResponse, ResultItem } from '../../../../data/interfaces/pokemon.interfaces';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokeList: ResultItem[] = [];
  detailedPokemon: DetailPokemon | null = null;
  prevPageUrl: string | null = null;
  nextPageUrl: string | null = null;
  noResults: boolean = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.initialSearch();
  }

  initialSearch() {
    this.pokemonService.getPokemonList().subscribe({
      next: (resp) => this.setProps(resp)
    });
  }

  setDetail(pokemon: DetailPokemon) {
    this.detailedPokemon = pokemon;
  }

  navigate(url: string) {
    this.pokemonService.getPokemonList(url).subscribe({
      next: (resp) => {
        this.setProps(resp);
        this.detailedPokemon = null;
      }
    })
  }

  setProps(resp: PokemonResponse) {
    this.pokeList = resp.results;
    this.prevPageUrl = resp.previous;
    this.nextPageUrl = resp.next;
    this.noResults = false;
  }

  searchMade(result: DetailPokemon | string) {
    if (result === 'reset') {
      this.detailedPokemon = null;
      this.pokeList = [];
      this.initialSearch();
      return;
    }
    if (result === 'not-found') {
      this.noResults = true;
      return;
    }

    this.setDetail(result as DetailPokemon);
    this.pokeList = [{
      name: (result as DetailPokemon).name,
      url: `${environment.pokeApi}/pokemon/${(result as DetailPokemon).id}/`
    }];
    this.nextPageUrl = null;
    this.prevPageUrl = null;
    this.noResults = false;
  }

}
