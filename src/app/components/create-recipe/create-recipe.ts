import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../services/recipes';
import { AlertService } from '../../utils/alert.service';

import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'create-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    I18nPipe,
  ],
  templateUrl: './create-recipe.html',
})
export class CreateRecipe {
  private readonly service = inject(RecipeService);
  private readonly alertService = inject(AlertService);
  private readonly i18n = inject(I18nService);

  categories = ['starter', 'main', 'dessert'];
  difficulties = ['easy', 'medium', 'hard'];
  form: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router) {
    // Inicializamos el formulario dentro del constructor
    this.form = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: this.fb.array([], Validators.required),
      steps: this.fb.array([], Validators.required),
      difficulty: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Getters for ingredients and steps
  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  // Add new ingredient to form
  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  // Remove an ingredient from form
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  // Add a step to form
  addStep() {
    this.steps.push(this.fb.control('', Validators.required));
  }

  // Remove a step from form
  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  // Submit
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.info('Please fill in all fields');
      return;
    }

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    const newRecipeData = this.form.value;

    this.service.addRecipe(newRecipeData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.alertService.error(err.message);
      },
    });
  }
}
