import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DetailPokemon } from 'src/app/data/interfaces/pokemon.interfaces';

import { PokemonService } from '../../../../data/services/pokemon.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() onSearch: EventEmitter<DetailPokemon | string> = new EventEmitter();
  stringRgx: RegExp = /^[a-zA-Z]*$/;
  searchInput: FormControl = new FormControl('', [
    Validators.pattern(this.stringRgx)
  ])

  constructor(private pokemonService: PokemonService) { }

  search() {
    if (this.searchInput.value === '') {
      this.onSearch.emit('reset');
      return;
    }
    this.pokemonService.getPokemon('', this.searchInput.value).subscribe({
      next: (resp) => this.onSearch.emit(resp),
      error: (err: HttpErrorResponse) => {
        if (err.error === 'Not Found') {
          this.onSearch.emit('not-found');
        }
      }
    })
  }

  clear() {
    this.searchInput.reset('');
    this.onSearch.emit('reset');
  }

  validateInput(formControl: FormControl) {
    if (formControl.errors?.['pattern']) {
      return 'Ingrese un nombre valido';
    }
    return;
  }
}
