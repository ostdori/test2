import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()


export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
        new Recipe(
      'A test1 Recipe',
        'FOOD CRAZY',
        'http://maxpixel.freegreatpicture.com/static/photo/2x/Food-Dishes-Eat-Gastronomy-Lunch-Recipe-2760200.jpg',
        [
          new Ingredient('Qenua', 3),
          new Ingredient('Olive Oil', 1)
        ]),
        new Recipe('A test2 Recipe',
        'SUSHI HOMEMADE',
        'https://c1.staticflickr.com/3/2453/3748516440_a64797c7d3_b.jpg',
        [
          new Ingredient('Lax', 1),
          new Ingredient('Noori', 5)
        ])
      ];
    constructor(private slService: ShoppingListService) {

    }
    setRecipes(recipes: Recipe[]) {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
      return this.recipes.slice();

    }
    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
