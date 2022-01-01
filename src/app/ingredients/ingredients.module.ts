import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IngredientEditComponent } from "./ingredient-edit/ingredient-edit.component";
import { IngredientListComponent } from "./ingredient-list/ingredient-list.component";

@NgModule({
    declarations: [
        IngredientListComponent,
        IngredientEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: IngredientListComponent }
        ]),
    ]
})
export class IngredientsModule {

}