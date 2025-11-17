import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.html',
  imports: [CommonModule, RouterLink, ButtonModule],
})
export class RecipesList implements OnInit {
  private readonly service = inject(RecipeService);

  recipes: Recipe[] | undefined;

  ngOnInit(): void {
    this.service.getAllRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
}
