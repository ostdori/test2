import { Subscription } from 'rxjs/Subscription';
import { ShoppingListService } from './../shopping-list.service';

import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit,  OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slFrom: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

//   @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slFrom.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onSubmit(form: NgForm ) {
  const value = form.value;
  const newIngredient = new Ingredient( value.name , value.amount);
  if (this.editMode) {
    this.slService.updateIngredient(this.editedItemIndex, newIngredient);
  } else {
    this.slService.addIngredient(newIngredient);
  }
  this.editMode = false;
  form.reset();
  }
onClear() {
  this.slFrom.reset();
  this.editMode = false;
}
onDelete() {
  this.slService.deleteIngredient(this.editedItemIndex);
  this.onClear();
}
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
