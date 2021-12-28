import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent {
  ingredients: Observable<{ingredients: Ingredient[]}>;

//   constructor(private store: Store<fromApp.AppState>) { }

//   ngOnInit(): void {
//     this.ingredients = this.store.select('shoppingList')
//   }

//   onEditItem(index: number) {
//     this.store.dispatch(new ShoppingListActions.StartEdit(index));
//   }

}