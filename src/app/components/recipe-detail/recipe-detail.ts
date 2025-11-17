import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipes';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { RecipeTimePipe } from '../../pipes/recipe-time.pipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [RecipeTimePipe],
  templateUrl: './recipe-detail.html',
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
