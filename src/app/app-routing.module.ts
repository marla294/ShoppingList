import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: 'ingredient-list', loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'units', loadChildren: () => import('./units/units.module').then(m => m.UnitsModule) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}