import { type NextFunction, type Request, type Response } from "express";
import Recipe from "../../../database/models/Recipe";

export const getRecipes = (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipes = Recipe.find().limit(10).exec();

    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};
