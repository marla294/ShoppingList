import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { IngredientListComponent } from "./ingredient-list/ingredient-list.component";

@NgModule({
    declarations: [
        IngredientListComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: IngredientListComponent }
        ]),
        SharedModule
    ]
})
export class IngredientsModule {

}