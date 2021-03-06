import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/ingredients/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as IngredientActions from '../../ingredients/store/ingredient-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  private subscription: Subscription;
  private ingredientSub: Subscription;
  editMode = false;
  editedItem: Ingredient;
  newItem: Ingredient;
  ingredients: Ingredient[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new IngredientActions.FetchIngredients());
    this.ingredientSub = this.store.select('ingredients').subscribe(stateData => {
      if (stateData.ingredients && stateData.ingredients.length > 0) {
        this.ingredients = [...stateData.ingredients];
      }
    });
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          groceryStore: this.editedItem.groceryStore ?? "",
          aisle: this.editedItem.aisle ?? "",
          units: this.editedItem.units ?? "",
          id: this.editedItem.id ?? "",
        });
      } else {
        this.editMode = false;
      }
    });
  }

  mySelectHandler($event) {
    if (this.ingredients && this.ingredients.length > 0) {
      const ingredient = this.ingredients.filter(ingredient => ingredient.name === $event.target.value)[0];
      if (ingredient) {
        this.newItem = ingredient;
        this.slForm.setValue({
          name: $event.target.value,
          amount: "",
          groceryStore: ingredient.groceryStore ?? "",
          aisle: ingredient.aisle ?? "",
          units: ingredient.units ?? "",
          id: ingredient.id ?? "",
        });
      }
    }
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, value.units, value.groceryStore, value.aisle, value.id);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    }
    else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.editedItem = null;
    this.newItem = null;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.DeleteIngredient()
      );
    }
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ingredientSub.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
