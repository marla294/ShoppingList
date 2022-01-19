import { Ingredient } from "../ingredients/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public ingredients: Ingredient[];

    constructor(
        name: string, 
        desc: string, 
        ingredients: Ingredient[]
        ) {
        this.name = name;
        this.description = desc;
        this.ingredients = ingredients;
    }
}