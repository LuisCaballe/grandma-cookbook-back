import { type NextFunction, type Response } from "express";
import Recipe from "../../../database/models/Recipe.js";
import { type CustomParamsRequest, type CustomRequest } from "../../types.js";

export const getRecipes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req;
  try {
    const recipes = await Recipe.find({ user: id }).limit(10).exec();

    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

export const removeRecipe = async (
  req: CustomParamsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;

    const removedRecipe = await Recipe.findByIdAndDelete(recipeId).exec();

    if (!removedRecipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    next(error);
  }
};
