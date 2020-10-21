import { LoadcocktailService } from './service/loadcocktail.service';
import { Component, OnInit } from '@angular/core';
import {FilterType} from './service/filterType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  filterType = FilterType;
  selectedFilterType: FilterType;
  cockTailList: any = [];
  ingredients = ['Gin', 'Vodka', 'Tequila', 'Lime juice', 'Salt', 'Triple sec'];
  categories = ['Ordinary_Drink', 'Cocktail'];
  searchByNameValue = '';
  searchByCategoryValue = this.categories[0];
  searchByIngredientValue = this.ingredients[0];
  isAscending: boolean;

  constructor(private loadCocktailService: LoadcocktailService){}
  ngOnInit(): void{
    this.selectedFilterType = FilterType.name;
    this.searchByNameValue = 'margarita';
    this.searchByName();
   }
   onChangeFilter(event): void{
    this.selectedFilterType = event.target.value;
    if (this.selectedFilterType === FilterType.name) { this.searchByName(); }
    if (this.selectedFilterType === FilterType.category) { this.searchByCategory(); }
    if (this.selectedFilterType === FilterType.ingredient) { this.searchByIngredient(); }
  }
  searchByIngredient(): void{
  this.loadCocktailService.loadCockTailByIngredients(this.searchByIngredientValue).subscribe(resp => {
    this.cockTailList = resp;
  });
  }
  searchByCategory(): void{
  this.loadCocktailService.loadCockTailByCategory(this.searchByCategoryValue).subscribe(resp => {
    this.cockTailList = resp;
  });
  }
  searchByName(): void{
    console.log(this.searchByNameValue)
    this.loadCocktailService.loadCockTailByName(this.searchByNameValue).subscribe(resp => {
      this.cockTailList = resp;
    });
  }
  sortData(): void{
    this.cockTailList.sort((a, b) => ((a.strDrink > b.strDrink) && this.isAscending) ? 1 : -1);
    this.isAscending = !this.isAscending;
  }
}
