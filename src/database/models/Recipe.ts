import { Schema, Types, model } from "mongoose";
import User from "./User";

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Recipe = model("Recipe", recipeSchema, "recipes");

export default Recipe;
