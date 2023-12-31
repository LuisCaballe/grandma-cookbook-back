import { type Types } from "mongoose";

export interface RecipeDatabaseStructure {
  name: string;
  imageUrl: string;
  ingredients: string;
  directions: string;
  difficulty: string;
  cookingTime: number;
  user: Types.ObjectId;
  _id: Types.ObjectId;
}

export interface RecipeDatabaseStructureId {
  name: string;
  imageUrl: string;
  ingredients: string;
  directions: string;
  difficulty: string;
  cookingTime: number;
  user: string;
  id: string;
}

export interface RecipeStructure {
  name: string;
  imageUrl: string;
  ingredients: string;
  directions: string;
  difficulty: string;
  cookingTime: number;
}
