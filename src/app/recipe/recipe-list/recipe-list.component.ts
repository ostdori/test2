import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../recipe.service';

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

// @Output() recipeWasSelected = new EventEmitter<Recipe>();
recipes: Recipe[];
subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }
onNewRecipe() {
  this.router.navigate(['new'], { relativeTo: this.route});
}
ngOnDestroy() {
  // Called once, before the instance is destroyed.
  // Add 'implements OnDestroy' to the class.
  this.subscription.unsubscribe();
}
}
