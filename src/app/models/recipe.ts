export interface Recipe {
  id: number;
  name: string;
  category: string;
  ingredients: string[];
  steps: string[];
  difficulty: string;
  duration: number;
}
