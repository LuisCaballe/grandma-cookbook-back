import { Router } from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  addRecipe,
  getRecipeById,
  getRecipes,
  removeRecipe,
} from "../../controllers/recipes/recipesControllers.js";
import { validate } from "express-validation";
import recipeSchema from "../../../schemas/recipeSchema.js";

const recipeRouter = Router();

recipeRouter.get("/", auth, getRecipes);

recipeRouter.delete("/:recipeId", auth, removeRecipe);

recipeRouter.post(
  "/add",
  auth,
  validate(recipeSchema, {}, { abortEarly: false }),
  addRecipe
);

recipeRouter.get("/:recipeId", auth, getRecipeById);

export default recipeRouter;
