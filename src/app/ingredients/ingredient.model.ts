import { Optional } from "@angular/core";

export class Ingredient {
    public name: string;
    public amount: number;
    public units: string;
    public groceryStore: string;

    constructor(
        name: string, 
        amount: number,
        @Optional() units?: string,
        @Optional() groceryStore?: string
    ) {
        this.name = name;
        this.amount = amount;
        this.units = units;
        this.groceryStore = groceryStore;
    }
}