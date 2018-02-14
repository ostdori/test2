
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipe/recipe.model';
import { RecipeService } from './../recipe/recipe.service';

@Injectable()

export class DataStorageService {
  constructor (private http: Http,
                private recipeService: RecipeService,
                private authService: AuthService) {}

storeRecipes() {
  const token = this.authService.getToken;

  return this.http.put('https://recbook-2987f.firebaseio.com/recipes.json?auth=' + token,
    this.recipeService.getRecipes());
}
getRecipes() {
   const token = this.authService.getToken();

  this.http.get('https://recbook-2987f.firebaseio.com/recipes.json?auth=' + token)
    .map(
    (response: Response) => {
      const recipes: Recipe[] = response.json();
      // tslint:disable-next-line:prefer-const
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
        }
      }
      return recipes;
    }
  )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
}

}
