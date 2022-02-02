import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as IngredientActions from '../../ingredients/store/ingredient-list.actions';
import { Ingredient } from 'src/app/ingredients/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  editIngredient = false;
  ingredients: Ingredient[];

  private storeSub: Subscription;
  private ingredientSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new IngredientActions.FetchIngredients());
    
    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.ingredientSub = this.store.select('ingredients').subscribe(stateData => {
              if (stateData.ingredients && stateData.ingredients.length > 0) {
                this.ingredients = [...stateData.ingredients];
              }
              else {
                this.ingredients = [];
              }
              this.initForm();
            });
          }
        );
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({
          index: this.id,
          newRecipe: this.recipeForm.value
        }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.store.dispatch(new RecipeActions.StoreRecipes());
    this.onCancel();
  }

  onAddIngredient() {
    this.editIngredient = true;
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'units': new FormControl(null),
        'groceryStore': new FormControl(null),
        'aisle': new FormControl(null),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.ingredientSub) {
      this.ingredientSub.unsubscribe();
    }
  }

  mySelectHandler($event, index) {
    if (this.ingredients && this.ingredients.length > 0) {
      let ingredient = this.ingredients.filter(ingredient => ingredient.name === $event)[0];
      if (ingredient) {
        (<FormArray>this.recipeForm.get('ingredients'))["controls"][index].patchValue({units: ingredient.units});
        (<FormArray>this.recipeForm.get('ingredients'))["controls"][index].patchValue({groceryStore: ingredient.groceryStore});
        (<FormArray>this.recipeForm.get('ingredients'))["controls"][index].patchValue({aisle: ingredient.aisle});
      }
    }
  }

  private initForm() {
    let recipeName = '';
    let recipeIngredients = new FormArray([]);

    this.recipeForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'ingredients': new FormArray([]),
    });

    if (this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe(recipe => {
        if (recipe) {
          recipeName = recipe.name;
        }
        if (recipe && recipe['ingredients'] && this.ingredients) {
          for (let ingredient of recipe.ingredients) {
            const ing = this.ingredients.filter(i => i.name == ingredient.name)[0];
            if (ing) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ]),
                  'units': new FormControl(ing.units),
                  'groceryStore': new FormControl(ing.groceryStore),
                  'aisle': new FormControl(ing.aisle),
                })
              );
            }
          }
        }
        this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'ingredients': recipeIngredients,
        });
      });
    }
  }
}
