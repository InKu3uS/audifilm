import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

//i18n imports
import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';

//Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.html',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    I18nPipe,
  ],
})
export class RecipesList implements OnInit {
  private readonly service = inject(RecipeService);
  public readonly i18n = inject(I18nService);

  recipes: Recipe[] | undefined;
  filters = {
    name: '',
    category: '',
    difficulty: '',
    duration: 0,
  };
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadRecipes();
  }

  // Get recipes from json-server
  loadRecipes(): void {
    this.service.getAllRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.isLoading = false;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
        this.recipes = [];
      },
    });
  }

  // Filters for recipes
  get filteredRecipes() {
    return this.recipes
      ?.filter(
        (r) =>
          !this.filters.category ||
          r.category.toLocaleLowerCase() === this.filters.category.toLocaleLowerCase()
      )
      .filter(
        (r) =>
          !this.filters.difficulty ||
          r.difficulty.toLocaleLowerCase() === this.filters.difficulty.toLocaleLowerCase()
      )
      .filter((r) => !this.filters.duration || r.duration <= this.filters.duration)
      .filter(
        (r) =>
          !this.filters.name ||
          r.name.toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase())
      );
  }
}
