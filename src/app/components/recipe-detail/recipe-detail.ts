import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe';
import { RecipeTimePipe } from '../../pipes/recipe-time.pipe';

//Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

//SweetAlert2 service import
import { AlertService } from '../../utils/alert.service';

//i18n imports
import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterModule, RecipeTimePipe, MatButtonModule, MatCardModule, I18nPipe],
  templateUrl: './recipe-detail.html',
})
export class RecipeDetail implements OnInit {
  private readonly service = inject(RecipeService);
  private readonly alertService = inject(AlertService);
  private readonly i18n = inject(I18nService);
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
    const question = this.i18n.t('swal.sure') as string;
    const message = this.i18n.t('swal.confirm_delete_recipe') as string;
    this.alertService.confirm(question, message).then((confirmed) => {
      if (!confirmed) return;

      this.service.deleteRecipe(this.recipeId).subscribe({
        next: () => {
          //Dinamic translation with parameter
          const message = this.i18n.t('swal.recipe_deleted', { name: this.recipe?.name }) as string;
          this.alertService.success(message);
          this.router.navigate(['']);
        },
        error: (err) => {
          this.alertService.error(err.message);
        },
      });
    });
  }

  // Get the translation of the category name received as parameter
  getCategoryTranslation(key: string): string {
    return this.i18n.t(`recipe.category.${key}`) as string;
  }

  // Get the translation of the difficulty name received as parameter
  getDifficultyTranslation(key: string): string {
    return this.i18n.t(`recipe.difficulties.${key}`) as string;
  }
}
