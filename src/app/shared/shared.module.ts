import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoggingService } from "../logging.service";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { IngredientEditComponent } from "../ingredients/ingredient-edit/ingredient-edit.component";

@NgModule({
    declarations:  [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        IngredientEditComponent
    ],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        IngredientEditComponent,
        DropdownDirective,
        CommonModule
    ],
    providers: [LoggingService]
})
export class SharedModule {

}