import { Types } from "mongoose";
import { type RecipeDatabaseStructure } from "../types";

export const mockRecipes: RecipeDatabaseStructure[] = [
  {
    _id: new Types.ObjectId("647100635a615cd9e3388cab"),
    name: "Fried egg",
    imageUrl: "image1",
    cookingTime: 10,
    difficulty: "Easy",
    directions: "Just fry a egg",
    ingredients: "Oil, egg",
    user: new Types.ObjectId("646fa0775a615cd9e3388ca9"),
  },
  {
    _id: new Types.ObjectId("647102745a615cd9e3388cae"),
    name: "Boiled egg",
    imageUrl: "image1",
    cookingTime: 10,
    difficulty: "Easy",
    directions: "Just boil a egg",
    ingredients: "Water, egg",
    user: new Types.ObjectId("646fa0775a615cd9e3388ca9"),
  },
];
