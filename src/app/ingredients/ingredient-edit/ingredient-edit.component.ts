import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Ingredient } from "../ingredient.model";
import * as fromApp from '../../store/app.reducer';
import * as IngredientListActions from "../store/ingredient-list.actions";
import * as UnitsActions from '../../units/store/units.actions';
import * as GroceryStoresActions from '../../groceryStores/store/groceryStores.actions';

@Component({
    selector: 'ingredient-edit',
    templateUrl: './ingredient-edit.component.html',
    styleUrls: ['./ingredient-edit.component.css']
  })
  export class IngredientEditComponent {
    @ViewChild('f', {static: false}) ingForm: NgForm;
    subscription: Subscription;
    unitsSubscription: Subscription;
    groceryStoresSubscription: Subscription;
    editMode = false;
    editedItem: Ingredient;
    units: string[] = [];
    groceryStores: string[] = [];
    aisles = [
        "Baby",
        "Bakery",
        "Canned Goods",
        "Cheese",
        "Cleaning",
        "Condiments",
        "Dairy",
        "Deli",
        "Frozen",
        "Meat",
        "Online",
        "Paper",
        "Pharmacy",
        "Produce",
        "Sandwich Things",
        "Snacks",
        "Soups",
        "Spices",
        "Wellness",
    ];

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit(): void {
        this.store.dispatch(new IngredientListActions.FetchIngredients());
        this.store.dispatch(new UnitsActions.FetchUnits());
        this.store.dispatch(new GroceryStoresActions.FetchGroceryStores());
        this.unitsSubscription = this.store.select('units').subscribe(unitsState => {
            this.units = unitsState.units;
        });
        this.groceryStoresSubscription = this.store.select('groceryStores').subscribe(groceryStoresState => {
            this.groceryStores = groceryStoresState.groceryStores;
        });
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

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, null, value.units, value.groceryStore, value.aisle);
        if (this.editMode) {
            this.store.dispatch(new IngredientListActions.UpdateIngredient(newIngredient));
        }
        else {
            this.store.dispatch(new IngredientListActions.AddIngredient(newIngredient));
        }
        this.store.dispatch(new IngredientListActions.StoreIngredients());
        this.onClear();
    }

    onClear() {
        this.ingForm.reset();
        this.editMode = false;
        this.store.dispatch(new IngredientListActions.StopEdit());
    }

    onDelete() {
        if (this.editMode) {
            this.store.dispatch(new IngredientListActions.DeleteIngredient());
            this.store.dispatch(new IngredientListActions.StoreIngredients());
        }
        this.onClear();
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.unitsSubscription.unsubscribe();
        this.groceryStoresSubscription.unsubscribe();
        this.onClear();
    }
  }