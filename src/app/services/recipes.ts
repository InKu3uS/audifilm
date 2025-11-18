import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/recipes';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private readonly http: HttpClient) {}

  // Get all recipes
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(baseUrl).pipe(catchError(this.handleError));
  }

  // Get Recipe by id
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Add a new recipe
  addRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    return this.http.post<Recipe>(baseUrl, recipe).pipe(catchError(this.handleError));
  }

  // Delete a recipe by id
  deleteRecipe(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${baseUrl}/${id}`, recipe).pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 400:
          errorMessage = 'Bad request';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
