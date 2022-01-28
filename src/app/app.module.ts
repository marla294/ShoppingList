import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipeEffects } from './recipes/store/recipe.effects';
import { IngredientListEffects } from './ingredients/store/ingredient-list.effects';
import { ShoppingListEffects } from './shopping-list/store/shopping-list.effects';
import { UnitsEffects } from './units/store/units.effects';
import { GroceryStoresEffects } from './groceryStores/store/groceryStores.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      AuthEffects, 
      RecipeEffects, 
      IngredientListEffects, 
      ShoppingListEffects,
      UnitsEffects,
      GroceryStoresEffects,
    ]),
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
