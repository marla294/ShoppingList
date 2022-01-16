import { Component, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Ingredient } from "../ingredient.model";
import * as fromApp from '../../store/app.reducer';
import * as IngredientListActions from "../store/ingredient-list.actions";
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
    selector: 'ingredient-edit',
    templateUrl: './ingredient-edit.component.html',
    styleUrls: ['./ingredient-edit.component.css']
  })
  export class IngredientEditComponent {
    @ViewChild('f', {static: false}) ingForm: NgForm;
    @Input() isShoppingList = false;
    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(private store: Store<fromApp.AppState>) { }

    units = [
        "box",
        "can(s)",
        "each",
        "gallon(s)",
        "lb(s)",
        "link(s)",
        "oz",
        "pack",
        "tbsp",
        "tsp",
    ];

    groceryStores = [
        "Amazon",
        "HyVee",
        "Family Fare",
        "Whole Foods",
    ];

    aisles = [
        "Bakery",
        "Canned Goods",
        "Dairy",
        "Meat",
        "Online",
        "Pharmacy",
        "Produce",
    ];

    ngOnInit(): void {
        this.fetchIngredients();
        if (this.isShoppingList) {
            this.subscription = this.store.select('shoppingList').subscribe(stateData => {
                if (stateData.editedIngredientIndex > -1) {
                    this.editMode = true;
                    this.editedItem = stateData.editedIngredient;
                    this.ingForm.setValue({
                        name: this.editedItem.name,
                        units: this.editedItem.units ?? "",
                        groceryStore: this.editedItem.groceryStore ?? "",
                        aisle: this.editedItem.aisle ?? "",
                        amount: this.editedItem.amount ?? ""
                    });
                } 
                else {
                    this.editMode = false;
                }
            });
        }
        else {
            this.subscription = this.store.select('ingredients').subscribe(stateData => {
                if (stateData.editedIngredientIndex > -1) {
                    this.editMode = true;
                    this.editedItem = stateData.editedIngredient;
                    this.ingForm.setValue({
                        name: this.editedItem.name,
                        units: this.editedItem.units ?? "",
                        groceryStore: this.editedItem.groceryStore ?? "",
                        aisle: this.editedItem.aisle ?? ""
                    });
                } 
                else {
                    this.editMode = false;
                }
            });
        }
      }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, null, value.units, value.groceryStore, value.aisle);
        if (this.isShoppingList) {
            newIngredient.amount = value.amount;
        }
        if (this.editMode) {
            this.updateIngredient(newIngredient);
        }
        else {
            this.addIngredient(newIngredient);
        }
        this.storeIngredients();
        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.ingForm.reset();
        this.editMode = false;
        this.stopEdit();
    }

    onDelete() {
        if (this.editMode) {
            this.deleteIngredient();
            this.storeIngredients();
        }
        this.onClear();
    }
    
    ngOnDestroy() {
    this.subscription.unsubscribe();
    this.stopEdit();
    }

    private fetchIngredients() {
        if (!this.isShoppingList) {
            this.store.dispatch(new IngredientListActions.FetchIngredients());
        }
        else {
            this.store.dispatch(new ShoppingListActions.FetchIngredients());
        }
    }

    private updateIngredient(ingredient: Ingredient) {
        if (!this.isShoppingList) {
            this.store.dispatch(new IngredientListActions.UpdateIngredient(ingredient));
        }
        else {
            this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
        }
    }

    private addIngredient(ingredient: Ingredient) {
        if (!this.isShoppingList) {
            this.store.dispatch(new IngredientListActions.AddIngredient(ingredient));
        }
        else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
        }
    }

    private storeIngredients() {
        if (!this.isShoppingList) {
            this.store.dispatch(new IngredientListActions.StoreIngredients());
        }
        else {
            this.store.dispatch(new ShoppingListActions.StoreIngredients());
        }
    }

    private deleteIngredient() {
        if (!this.isShoppingList) {
            this.store.dispatch(new IngredientListActions.DeleteIngredient());
        }
        else {
            this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        }
    }

    private stopEdit() {
        if (!this.isShoppingList) {
            this.store.dispatch(new IngredientListActions.StopEdit());
        }
        else {
            this.store.dispatch(new ShoppingListActions.StopEdit());
        }
    }
  }