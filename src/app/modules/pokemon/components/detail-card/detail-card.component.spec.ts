import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { detailPokemonMock } from 'src/app/utils/mocks/pikachu.mock';

import { DetailCardComponent } from './detail-card.component';

describe('DetailCardComponent', () => {
  let component: DetailCardComponent;
  let fixture: ComponentFixture<DetailCardComponent>;
  let pokemonMock = detailPokemonMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar nombre y id', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const name = 'Pikachu';
    const id = pokemonMock.id;
    
    expect(paragraphs[0].nativeElement.innerHTML).toContain(id);
    expect(paragraphs[1].nativeElement.innerHTML).toContain(name);
  });
  
  it('Debe tener los tipos', () => {
    const container: HTMLElement = fixture.debugElement.query(By.css('.types')).nativeElement;
    const paragraphs = container.querySelectorAll('p');
    const pokemonTypes = pokemonMock.types;
    
    expect(paragraphs.length).toBe(pokemonTypes.length);
  });
  
  it('Debe mostrar el peso', () => {
    const container: HTMLElement = fixture.debugElement.query(By.css('.weight')).nativeElement;
    const paragraph = container.querySelector('p');
    const weight = pokemonMock.weight;

    expect(paragraph?.innerText).toContain(weight);
  });

  it('Debe tener los sprites', () => {
    const container: HTMLElement = fixture.debugElement.query(By.css('.sprites')).nativeElement;
    const paragraphs = container.querySelectorAll('p');
    const sprites = Object.values(pokemonMock.sprites).filter(x => !x && typeof x !== 'object');

    expect(paragraphs.length).toBe(sprites.length);
  });

  it('Debe mostrar los movimientos segun el limite: numberOfMoves', () => {
    const container: HTMLElement = fixture.debugElement.query(By.css('.movements')).nativeElement;
    
    component.numberOfMoves = 15;
    fixture.detectChanges();
    
    const paragraphs = container.querySelectorAll('p');

    expect(paragraphs.length).toBe(component.moves.length + 1);
  });
});
