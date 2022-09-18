import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DetailPokemon, PokemonResponse } from '../interfaces/pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl: string = environment.pokeApi;

  constructor(private http: HttpClient) { }

  getPokemonList(pageUrl?: string): Observable<PokemonResponse> {
    const url = !!pageUrl ? pageUrl : `${this.baseUrl}/pokemon?limit=4`;
    return this.http.get<PokemonResponse>(url);
  }

  getPokemon(pokeUrl?: string, pokeName?: string): Observable<DetailPokemon> {
    const url = !!pokeUrl ? pokeUrl : `${this.baseUrl}/pokemon/${pokeName}`;
    return this.http.get<DetailPokemon>(url);
  }

}
