import { Router } from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  getRecipes,
  removeRecipe,
} from "../../controllers/recipes/recipesControllers.js";

const recipeRouter = Router();

recipeRouter.get("/", auth, getRecipes);

recipeRouter.delete("/:recipeId", auth, removeRecipe);

export default recipeRouter;
