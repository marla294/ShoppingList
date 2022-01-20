import { Ingredient } from "../ingredients/ingredient.model";

export class Recipe {
    public name: string;
    public ingredients: Ingredient[];

    constructor(
            name: string, 
            ingredients: Ingredient[]
        ) {
            this.name = name;
            this.ingredients = ingredients;
        }
}