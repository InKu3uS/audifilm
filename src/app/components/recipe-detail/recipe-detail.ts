import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipeService } from '../../services/recipes';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../models/recipe';
import { RecipeTimePipe } from '../../pipes/recipe-time.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterModule, RecipeTimePipe, MatButtonModule, MatCardModule],
  templateUrl: './recipe-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetail implements OnInit {
  private readonly service = inject(RecipeService);
  private readonly route = inject(ActivatedRoute);

  recipe: Recipe | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getRecipeById(id).subscribe((recipe) => {
      this.recipe = recipe;
    });
  }
}
