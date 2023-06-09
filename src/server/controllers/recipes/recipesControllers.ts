import { type NextFunction, type Response } from "express";
import Recipe from "../../../database/models/Recipe.js";
import { type CustomRequest } from "../../types.js";
import { Types } from "mongoose";
import CustomError from "../../../CustomError/CustomError.js";

export const getRecipes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  try {
    const recipes = await Recipe.find({ user: userId }).limit(10).exec();

    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

export const removeRecipe = async (
  req: CustomRequest,
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

export const addRecipe = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const addedRecipe = req.body;

    const addedRecipeWithUserId = {
      ...addedRecipe,
      user: new Types.ObjectId(userId),
    };

    const newRecipe = await Recipe.create(addedRecipeWithUserId);

    if (!newRecipe) {
      const error = new CustomError(
        400,
        "Error: The recipe has not been added"
      );

      throw error;
    }

    res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    next(error);
  }
};
