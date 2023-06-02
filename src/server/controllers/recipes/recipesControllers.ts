import { type NextFunction, type Response } from "express";
import Recipe from "../../../database/models/Recipe.js";
import { type CustomRequest } from "../../types.js";

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
