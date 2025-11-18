import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  ],
})
export class RecipesList implements OnInit {
  private readonly service = inject(RecipeService);

  recipes: Recipe[] | undefined;
  filters = {
    category: '',
    difficulty: '',
    duration: 0,
  };

  ngOnInit(): void {
    this.service.getAllRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

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
      .filter((r) => !this.filters.duration || r.duration <= this.filters.duration);
  }
}
