import { of, Observable } from 'rxjs';
export class LoadcocktailServiceMock {
    constructor() { }
     getByName(name: string): Observable<any>{
    return of(); }
    getByCategory(name: string): Observable<any>{
      return of();   }
    getByIngredients(name: string): Observable<any>{
        return of();   }
    }
