import { LoadcocktailService } from './service/loadcocktail.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FilterType} from './service/filterType';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  filterType = FilterType;
  selectedFilterType: FilterType;
  cockTailList: any = [];
  ingredients = ['Gin', 'Vodka', 'Tequila', 'Lime juice', 'Salt', 'Triple sec'];
  categories = ['Ordinary_Drink', 'Cocktail'];
  searchByNameValue = '';
  searchByCategoryValue = this.categories[0];
  searchByIngredientValue = this.ingredients[0];
  isAscending: boolean;
  searchByNameSubscriptions: Subscription;
  searchByCategorySubscriptions: Subscription;
  searchByIngredientSubscriptions: Subscription;

  constructor(private loadCocktailService: LoadcocktailService){}
  // Initialize value for first launch
  ngOnInit(): void{
    this.selectedFilterType = FilterType.name;
    this.searchByNameValue = 'Margarita';
    this.searchByName();
   }
   // Destroy subscription to release memory
   ngOnDestroy(): void {
     if (this.searchByNameSubscriptions) {this.searchByNameSubscriptions.unsubscribe(); }
     if (this.searchByCategorySubscriptions) {this.searchByCategorySubscriptions.unsubscribe(); }
     if (this.searchByIngredientSubscriptions) {this.searchByIngredientSubscriptions.unsubscribe(); }
   }
   // On change of filter type update the data and filter dropdowns
   onChangeFilter(): void{
    if (this.selectedFilterType === FilterType.name) {  this.searchByName(); }
    if (this.selectedFilterType === FilterType.category) { this.searchByCategory(); }
    if (this.selectedFilterType === FilterType.ingredient) { this.searchByIngredient(); }
  }
  // Get List of cocktails based on selected ingredient
  searchByIngredient(): void{
    this.searchByIngredientSubscriptions = this.loadCocktailService
                                                  .loadByIngredients(this.searchByIngredientValue)
                                                  .subscribe(resp => this.cockTailList = resp);
  }
  // Get list of cocktails based on selected category
  searchByCategory(): void{
  this.searchByCategorySubscriptions = this.loadCocktailService
                                          .loadByCategory(this.searchByCategoryValue)
                                          .subscribe(resp => this.cockTailList = resp);
  }
  // Get list of cocktails based on selected name
  searchByName(): void{
   this.searchByNameSubscriptions = this.loadCocktailService
                                            .loadByName(this.searchByNameValue)
                                            .subscribe(resp => this.cockTailList = resp);
  }
  // Returns the sorted data
  sortData(): void{
    this.cockTailList.sort((a, b) => ((a.strDrink > b.strDrink) && this.isAscending) ? 1 : -1);
    this.isAscending = !this.isAscending;
  }
}
