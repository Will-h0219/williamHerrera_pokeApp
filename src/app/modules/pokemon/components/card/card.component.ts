import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PokemonService } from '../../../../data/services/pokemon.service';

import { DetailPokemon, ResultItem } from '../../../../data/interfaces/pokemon.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() resultItem!: ResultItem;
  @Output() onPokeClick: EventEmitter<DetailPokemon> = new EventEmitter();
  pokemon!: DetailPokemon;
  imgUrl: string = "";
  pokeId: string = "";
  name: string = "";

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.setPokemon();
  }

  setPokemon() {
    this.pokemonService.getPokemon(this.resultItem.url).subscribe({
      next: (resp) => {
        this.pokemon = resp;
        this.name = resp.name;
        this.imgUrl = resp.sprites.other["official-artwork"].front_default;
        this.pokeId = `# ${resp.id}`;
      }
    })
  }
  
  emitPokemon() {
    this.onPokeClick.emit(this.pokemon);
  }
}
