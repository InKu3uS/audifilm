import { Routes } from '@angular/router';
import { RecipesList } from './components/recipes-list/recipes-list';
import { RecipeDetail } from './components/recipe-detail/recipe-detail';
import { CreateRecipe } from './components/create-recipe/create-recipe';
import { UpdateRecipe } from './components/update-recipe/update-recipe';

export const routes: Routes = [
  { path: '', component: RecipesList },
  { path: 'recipe/:id', component: RecipeDetail },
  { path: 'new', component: CreateRecipe },
  { path: 'update/:id', component: UpdateRecipe },
];
