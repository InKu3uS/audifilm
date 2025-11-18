import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RECIPES } from '../mocks/recipes.mock';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  // Get all recipes
  getAllRecipes(): Observable<Recipe[]> {
    return of(RECIPES);
  }

  // Get Recipe by id
  getRecipeById(id: number): Observable<Recipe | undefined> {
    return of(RECIPES.find((r) => r.id === id));
  }

  // Add a new recipe
  addRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    const exists = RECIPES.some(
      (r) => r.name.toLocaleLowerCase() === recipe.name.toLocaleLowerCase()
    );
    if (exists) {
      return throwError(() => new Error('Recipe with this name already exists'));
    }

    const newId = Math.max(...RECIPES.map((r) => r.id), 0) + 1;

    const newRecipe: Recipe = { id: newId, ...recipe };

    RECIPES.push(newRecipe);

    return of(newRecipe);
  }

  // Delete a recipe by id
  deleteRecipe(id: number): Observable<boolean> {
    const index = RECIPES.findIndex((r) => r.id === id);

    if (index === -1) {
      return throwError(() => new Error('Recipe not found'));
    }

    RECIPES.splice(index, 1);
    return of(true);
  }
}
