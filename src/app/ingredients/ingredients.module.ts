import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IngredientListComponent } from "./ingredient-list/ingredient-list.component";

@NgModule({
    declarations: [
        IngredientListComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: IngredientListComponent }
        ]),
    ]
})
export class IngredientsModule {

}