import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Ingredient } from "../ingredient.model";
import * as fromApp from '../../store/app.reducer';
import * as IngredientListActions from "../store/ingredient-list.actions";

@Component({
    selector: 'ingredient-edit',
    templateUrl: './ingredient-edit.component.html',
    styleUrls: ['./ingredient-edit.component.css']
  })
  export class IngredientEditComponent {
    @ViewChild('f', {static: false}) ingForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(private store: Store<fromApp.AppState>) { }

    onClear() {
        this.ingForm.reset();
        this.editMode = false;
        this.store.dispatch(new IngredientListActions.StopEdit());
      }
  }