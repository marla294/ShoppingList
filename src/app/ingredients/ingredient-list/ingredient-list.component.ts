import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../ingredient.model';
import * as fromApp from '../../store/app.reducer';
import * as IngredientListActions from '../store/ingredient-list.actions';

@Component({
  selector: 'ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('ingredients');
  }

  onEditItem(index: number) {
    this.store.dispatch(new IngredientListActions.StartEdit(index));
  }

}