import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadcocktailService {
  constructor(private http: HttpClient) { }

  // Call cocktail service to get list of cocktails based on selected name
  // Using pipe to return list of drinks
  loadByName(name: string): Observable<any>{
   // tslint:disable-next-line:no-string-literal
   return this.http.get(`${environment.apiUrl}search.php?s=${name}`).pipe(map(resp => resp['drinks']));
  }

  // Call cocktail service to get list of cocktails based on selected category
  // Using pipe to return list of drinks
  loadByCategory(name: string): Observable<any>{
    // tslint:disable-next-line:no-string-literal
    return this.http.get(`${environment.apiUrl}filter.php?c=${name}`).pipe(map(resp => resp['drinks']));
   }

  // Call cocktail service to get list of cocktails based on selected ingredients
  // Using pipe to return list of drinks
   loadByIngredients(name: string): Observable<any>{
    // tslint:disable-next-line:no-string-literal
    return this.http.get(`${environment.apiUrl}filter.php?i=${name}`).pipe(map(resp => resp['drinks']));
   }
  }
