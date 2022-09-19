import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { from, Observable } from 'rxjs';
import { ResultItem } from 'src/app/data/interfaces/pokemon.interfaces';
import { detailPokemonMock } from 'src/app/utils/mocks/pikachu.mock';
import { resultItemMock } from 'src/app/utils/mocks/resultItem.mock';
import { PokemonService } from '../../../../data/services/pokemon.service';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const itemMock: ResultItem = resultItemMock;
  const pokemonMock = detailPokemonMock;

  const servicio = new PokemonService(null!);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      providers: [ PokemonService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.resultItem = itemMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Init: Debe llamar el seteo del pokemon', () => {
    const spySetter = spyOn(component, 'setPokemon');
    component.ngOnInit();
    expect(spySetter).toHaveBeenCalled();
  });

  it('Debe emitir el pokemon en el click', () => {
    component.pokemon = pokemonMock;
    
    spyOn(component.onPokeClick, 'emit');

    const elem = fixture.debugElement.query(By.css('.card'));
    elem.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.onPokeClick.emit).toHaveBeenCalledWith(component.pokemon);
  });
});
