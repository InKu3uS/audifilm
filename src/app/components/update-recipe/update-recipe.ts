import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';

// Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../utils/alert.service';

//i18n imports
import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'update-recipe',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    I18nPipe,
  ],
  templateUrl: './update-recipe.html',
})
export class UpdateRecipe implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(RecipeService);
  private readonly alertService = inject(AlertService);
  private readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  recipeForm!: FormGroup;
  recipeId!: string;
  originalRecipe: Recipe | undefined;
  isLoading = true;
  isSubmitting = false;
  error: string | null = null;

  categories = ['starter', 'main', 'dessert'];
  difficulties = ['easy', 'medium', 'hard'];

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadRecipe();
  }

  // Initialize form and validations
  private initializeForm(recipe: Recipe): void {
    this.recipeForm = this.fb.group({
      name: [recipe.name, [Validators.required]],
      category: [recipe.category, Validators.required],
      difficulty: [recipe.difficulty, Validators.required],
      duration: [recipe.duration, [Validators.required, Validators.minLength(1)]],
      imageUrl: [recipe.imageUrl, [Validators.required]],
      ingredients: [recipe.ingredients.join(', '), [Validators.required]],
      steps: [recipe.steps.join(', '), [Validators.required]],
    });
  }

  // Load original recipe
  private loadRecipe(): void {
    this.isLoading = true;
    this.error = null;

    this.service.getRecipeById(this.recipeId).subscribe({
      next: (recipe) => {
        this.originalRecipe = recipe;
        this.initializeForm(recipe);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
        console.log('Error loading recipe: ', err);
      },
    });
  }

  // Mark as touched form controls and show errors
  private markFormGroupTouched(): void {
    Object.keys(this.recipeForm.controls).forEach((key) => {
      const control = this.recipeForm.get(key);
      control?.markAsTouched();
    });
  }

  // On submit form
  onSubmit() {
    if (this.recipeForm.valid && this.originalRecipe) {
      this.isSubmitting = true;
      this.error = null;

      const formValue = this.recipeForm.value;

      const updatedRecipe: Recipe = {
        id: this.recipeId,
        name: formValue.name,
        category: formValue.category,
        difficulty: formValue.difficulty,
        duration: Number(formValue.duration),
        imageUrl: formValue.imageUrl,
        ingredients: formValue.ingredients
          .split(',')
          //Clear blank spaces
          .map((item: string) => item.trim())
          //Clear falsy content
          .filter(Boolean),
        steps: formValue.steps
          .split(',')
          //Clear blank spaces
          .map((step: string) => step.trim())
          //Clear falsy content
          .filter(Boolean),
      };

      this.service.updateRecipe(this.recipeId, updatedRecipe).subscribe({
        next: (recipe) => {
          this.isSubmitting = false;
          //Dinamic translation with parameter
          const message = this.i18n.t('swal.recipe_updated', { name: recipe.name }) as string;
          this.alertService.success(message);
          this.router.navigate(['/recipe', this.recipeId]);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.error = err.message;
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  // Verify if control form has errors
  hasError(controlName: string, errorName: string): boolean {
    const control = this.recipeForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }

  // Verify if control form is invalid
  isFieldInvalid(controlName: string): boolean {
    const control = this.recipeForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  // On cancel update
  onCancel(): void {
    const question = this.i18n.t('swal.sure') as string;
    const message = this.i18n.t('swal.confirm_cancel_update') as string;
    this.alertService.confirm(question, message).then((confirmed) => {
      if (!confirmed) return;
      this.router.navigate(['/recipe', this.recipeId]);
    });
  }

  // Reset form to original values
  resetForm(): void {
    if (this.originalRecipe) {
      this.initializeForm(this.originalRecipe);
    }
  }
}
