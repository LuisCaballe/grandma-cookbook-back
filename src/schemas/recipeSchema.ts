import { Joi } from "express-validation";
import { type RecipeStructure } from "../types";

const recipeSchema = {
  body: Joi.object<RecipeStructure>({
    name: Joi.string().required(),
    imageUrl: Joi.string().required(),
    cookingTime: Joi.number().required(),
    ingredients: Joi.string().required(),
    directions: Joi.string().required(),
    difficulty: Joi.string().required(),
  }),
};

export default recipeSchema;
