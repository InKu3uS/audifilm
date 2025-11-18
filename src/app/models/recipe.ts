export interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  ingredients: string[];
  steps: string[];
  difficulty: string;
  duration: number;
}
