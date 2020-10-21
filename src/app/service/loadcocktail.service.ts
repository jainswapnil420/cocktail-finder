import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadcocktailService {

  constructor(private http: HttpClient) { }

  loadCockTailByName(name: string): Observable<any>{
   // tslint:disable-next-line:no-string-literal
   return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name).pipe(map(resp => resp['drinks']));
  }

  loadCockTailByCategory(name: string): Observable<any>{
    // tslint:disable-next-line:no-string-literal
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + name).pipe(map(resp => resp['drinks']));
   }
   loadCockTailByIngredients(name: string): Observable<any>{
    // tslint:disable-next-line:no-string-literal
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + name).pipe(map(resp => resp['drinks']));
   }

  }
