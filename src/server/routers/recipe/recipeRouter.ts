import { Router } from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import { getRecipes } from "../../controllers/recipes/recipesControllers.js";

const recipeRouter = Router();

recipeRouter.get("/", auth, getRecipes);

export default recipeRouter;
