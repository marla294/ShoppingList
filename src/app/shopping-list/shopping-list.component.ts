import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../ingredients/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    ingredients: Ingredient[];
    groceryStores: string[] = [];
    ingredientsByGroceryStore: any = [];
    ingredientsSubscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit(): void {
        this.ingredientsSubscription = this.store.select('shoppingList').subscribe(state => {
            this.ingredients = state.ingredients;
            this.getGroceryStores();
            this.groupIngredientsByGroceryStore();
        });
    }

    onEditItem(ingredient: Ingredient) {
        this.store.dispatch(new ShoppingListActions.StartEdit(ingredient));

        this.getGroceryStores();
        this.groupIngredientsByGroceryStore();
    }

    private getGroceryStores() {
        this.groceryStores = [];
        this.ingredients.forEach(ingredient => {
            const isNewGroceryStore = this.groceryStores.findIndex(groceryStore => groceryStore === ingredient.groceryStore) === -1;

            if (isNewGroceryStore) {
                this.groceryStores.push(ingredient.groceryStore);
            }
        });
    }

    private groupIngredientsByGroceryStore() {
        this.ingredientsByGroceryStore = [];
        this.groceryStores.forEach(groceryStore => {
            const groceryStoreIngredients = this.ingredients.filter(ingredient => ingredient.groceryStore === groceryStore);

            this.ingredientsByGroceryStore.push({groceryStore: groceryStore, ingredients: groceryStoreIngredients});
        });
    }

    ngOnDestroy(): void {
        this.ingredientsSubscription.unsubscribe();
    }
}
