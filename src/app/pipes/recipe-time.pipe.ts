import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeTime',
})
export class RecipeTimePipe implements PipeTransform {
  transform(value: number): string {
    if (value < 60) {
      return `${value} mins`;
    }

    const hours = Math.floor(value / 60);
    const mins = value % 60;

    if (mins === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${mins} mins`;
  }
}
