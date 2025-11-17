import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RECIPES } from '../mocks/recipes.mock';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  getAllRecipes(): Observable<Recipe[]> {
    return of(RECIPES);
  }

  getRecipeById(id: number): Observable<Recipe | undefined> {
    return of(RECIPES.find((r) => r.id === id));
  }
}
