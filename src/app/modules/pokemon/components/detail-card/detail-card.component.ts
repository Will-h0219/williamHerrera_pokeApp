import { Component, Input } from '@angular/core';

import { DetailPokemon } from '../../../../data/interfaces/pokemon.interfaces';

import { typeColor } from "../../../../utils/colours";

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent {

  @Input() pokemon!: DetailPokemon;
  numberOfMoves: number = 8;

  get moves() {
    return this.pokemon.moves.slice(0, this.numberOfMoves);
  }

  checkImg(imgSrc: string | object) {
    return !!imgSrc && typeof imgSrc !== 'object';
  }

  setColor(type: string) {
    return typeColor(type);
  }

}
