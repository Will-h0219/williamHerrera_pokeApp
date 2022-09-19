import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { from } from 'rxjs';
import { responseMock } from '../../../../utils/mocks/response.mock';
import { PokemonService } from '../../../../data/services/pokemon.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  const servicio = new PokemonService(null!);
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PokemonListComponent,
        SearchBarComponent
      ],
      providers: [ PokemonService ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Debe hacer seteo inicial', waitForAsync(() => {
    const respMock = responseMock;
    
    spyOn(servicio, 'getPokemonList').and.callFake(() => {
      return from([ respMock ]);
    });
    
    component.ngOnInit();
    
    fixture.whenStable().then(() => {
      expect(component.pokeList.length).toBeGreaterThan(0);
      expect(component.prevPageUrl).toBeFalsy();
      expect(component.nextPageUrl).toBeTruthy();
    });
  }));
  
  it('Debe mostrar mensaje de no resultados', () => {
    component.searchMade('not-found');
    fixture.detectChanges();

    const elem = fixture.debugElement.query(By.css('.no-results')).nativeElement;
    expect(elem).toBeTruthy();
  });
});
