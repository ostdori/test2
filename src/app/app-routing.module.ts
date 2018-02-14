import { AuthGuard } from './auth/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';


import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ContactComponent } from './contact/contact.component';


const appRoutes: Routes = [
    { path: ' ', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipeComponent, children: [
      {path: '', component: RecipeStartComponent },
      {path: 'new',  component: RecipeEditComponent, canActivate: [AuthGuard]},
      {path: ':id', component: RecipeDetailComponent },
      {path: ':id/edit',  component: RecipeEditComponent, canActivate: [AuthGuard]}
    ]},
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'contact', component: ContactComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
