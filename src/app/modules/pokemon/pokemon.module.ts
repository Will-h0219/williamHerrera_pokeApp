import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { PokemonRoutingModule } from './pokemon-routing.module';

import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { CardComponent } from './components/card/card.component';
import { DetailCardComponent } from './components/detail-card/detail-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    PokemonListComponent,
    CardComponent,
    DetailCardComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule
  ]
})
export class PokemonModule { }
