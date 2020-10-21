import { LoadcocktailServiceMock } from './service/loadcocktail.service.mock';
import { LoadcocktailService } from './service/loadcocktail.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FilterType } from './service/filterType';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{provide: LoadcocktailService, useClass: LoadcocktailServiceMock}]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));

  it('should create the app', () => {

    expect(app).toBeTruthy();
  });

  describe('change Filter', () => {
    it('searching by name', () => {
      const data = [{
        strDrink: 'margarita',
        strCategory: 'Alcoholic'
      }];
      spyOn(app.loadCocktailService, 'getByName').and.returnValue(of(data));
      app.selectedFilterType = FilterType.name;
      app.onChangeFilter();
      expect(app.cockTailList.length).toBe(1);
    });

    it('searching by category', () => {
      const data = [{
        strDrink: 'margarita',
        strCategory: 'Alcoholic'
      }, {
        strDrink: 'taquila',
        strCategory: 'Alcoholic'
      }];
      spyOn(app.loadCocktailService, 'getByCategory').and.returnValue(of(data));
      app.selectedFilterType = FilterType.category;
      app.onChangeFilter();
      expect(app.cockTailList.length).toBe(2);
    });
    it('searching by ingredients', () => {
      const data = [{
        strDrink: 'margarita',
        strCategory: 'Alcoholic'
      }, {
        strDrink: 'taquila',
        strCategory: 'Alcoholic'
      }];
      spyOn(app.loadCocktailService, 'getByIngredients').and.returnValue(of(data));
      app.selectedFilterType = FilterType.ingredient;
      app.onChangeFilter();
      expect(app.cockTailList.length).toBe(2);
    });

  });

});
