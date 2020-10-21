import { environment } from './../../environments/environment';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';

import { LoadcocktailService } from './loadcocktail.service';

describe('LoadcocktailService', () => {
  let service: LoadcocktailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
   TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadcocktailService]
    });
   service = TestBed.inject(LoadcocktailService);
   httpMock = TestBed.inject(HttpTestingController);
  });
  it('should return the list of cocktails by name', () => {
    const data = {drinks: [{
      strDrink: 'margarita',
      strCategory: 'Alcoholic'
    }]};
    service.getByName('margerita').subscribe(resp => {
      expect(resp.length).toBe(1);
      expect(resp).toEqual(data.drinks);
  });
    const request = httpMock.expectOne( `${environment.apiUrl}search.php?s=margerita`);
    request.flush(data);
  });

  it('should return the list of cocktails by category', () => {
    const data = {drinks: [{
      strDrink: 'margarita',
      strCategory: 'Alcoholic'
    }, {
      strDrink: 'taquila',
      strCategory: 'Alcoholic'
    }]};
    service.getByCategory('Alcoholic').subscribe(resp => {
      expect(resp.length).toBe(2);
      expect(resp).toEqual(data.drinks);
  });
    const request = httpMock.expectOne( `${environment.apiUrl}filter.php?c=Alcoholic`);
    request.flush(data);
  });

  it('should return the list of cocktails by category', () => {
    const data = {drinks: [{
      strDrink: 'margarita',
      strCategory: 'Alcoholic',
      strIngredients: 'Lime'
    }, {
      strDrink: 'taquila',
      strCategory: 'Alcoholic',
      strIngredients: 'Lime'
    }]};
    service.getByIngredients('Lime').subscribe(resp => {
      expect(resp.length).toBe(2);
      expect(resp).toEqual(data.drinks);
  });
    const request = httpMock.expectOne( `${environment.apiUrl}filter.php?i=Lime`);
    request.flush(data);
  });
});
