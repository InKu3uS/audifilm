import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipeService } from '../../services/recipes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../models/recipe';
import { RecipeTimePipe } from '../../pipes/recipe-time.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterModule, RecipeTimePipe, MatButtonModule, MatCardModule],
  templateUrl: './recipe-detail.html',
})
export class RecipeDetail implements OnInit {
  private readonly service = inject(RecipeService);
  private readonly route = inject(ActivatedRoute);

  constructor(private readonly router: Router) {}

  recipeId!: string;
  recipe: Recipe | undefined;
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') ?? '';

    this.service.getRecipeById(this.recipeId).subscribe({
      next: (recipe) => {
        console.log('Recipe:', recipe);
        this.recipe = recipe;
        this.isLoading = false;
        this.error = null;
      },
      error: (err) => {
        console.log('Error:', err);
        this.error = err.message;
        this.isLoading = false;
        this.recipe = undefined;
      },
    });
  }

  // Delete this recipe
  deleteRecipe() {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    this.service.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        alert(`Recipe ${this.recipe?.name} deleted`);
        this.router.navigate(['']);
      },
      error: (err) => alert(err.message),
    });
  }
}
