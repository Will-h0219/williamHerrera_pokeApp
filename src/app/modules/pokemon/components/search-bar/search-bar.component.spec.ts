import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { detailPokemonMock } from 'src/app/utils/mocks/pikachu.mock';
import { PokemonService } from '../../../../data/services/pokemon.service';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  const pokemon = detailPokemonMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      providers: [ PokemonService ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El valor buscado debe ser valido', () => {
    const control = component.searchInput;
    control?.setValue('pikachu');
    expect(control?.valid).toBeTruthy();
    
    control?.setValue('pika_+');
    expect(control?.valid).toBeFalsy();
  });

  it('Debe emitir reset si no hay un valor', () => {
    const elem = fixture.debugElement.query(By.css('.form__field')).nativeElement;
    const control = component.searchInput;

    control?.setValue('pikachu');
    fixture.detectChanges();
    expect(elem.value).toBe('pikachu');
    
    control?.setValue('');
    fixture.detectChanges();
    expect(elem.value).toBe('');

    spyOn(component.onSearch, 'emit');
    
    const ev = new KeyboardEvent("keyup", {
      key: 'Enter'
    });
    elem.dispatchEvent(ev);
    fixture.detectChanges();

    expect(component.onSearch.emit).toHaveBeenCalledWith('reset');
  });

  it('Debe limpiar en el click y emitir reset', () => {
    const elem = fixture.debugElement.query(By.css('.form__field')).nativeElement;
    const btn = fixture.debugElement.query(By.css('.clear-btn'));
    const control = component.searchInput;

    spyOn(component.onSearch, 'emit');

    control?.setValue('pikachu');
    fixture.detectChanges();
    expect(elem.value).toBe('pikachu');
    
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(elem.value).toBe('');
    expect(component.onSearch.emit).toHaveBeenCalledWith('reset');
  });
});
