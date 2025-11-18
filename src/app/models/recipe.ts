export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  ingredients: string[];
  steps: string[];
  difficulty: string;
  duration: number;
}
