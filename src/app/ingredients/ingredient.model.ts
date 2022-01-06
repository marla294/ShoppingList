import { Optional } from "@angular/core";

export class Ingredient {
    public name: string;
    public amount: number;
    public units: string;
    public groceryStore: string;
    public aisle: string;

    constructor(
        name: string, 
        amount: number,
        @Optional() units?: string,
        @Optional() groceryStore?: string,
        @Optional() aisle?: string
    ) {
        this.name = name;
        this.amount = amount;
        this.units = units;
        this.groceryStore = groceryStore;
        this.aisle = aisle;
    }
}