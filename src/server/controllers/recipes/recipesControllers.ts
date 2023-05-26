import { type NextFunction, type Request, type Response } from "express";
import Recipe from "../../../database/models/Recipe.js";

export const getRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await Recipe.find().limit(10).exec();

    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};
