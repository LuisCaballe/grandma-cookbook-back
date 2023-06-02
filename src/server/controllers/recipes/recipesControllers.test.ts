import { type NextFunction, type Response } from "express";
import { getRecipes } from "./recipesControllers";
import Recipe from "../../../database/models/Recipe";
import { mockRecipes } from "../../../data/recipes";
import { correctResponse } from "../../utils/responseData/responseData";
import { type CustomRequest } from "../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getRecipes controller", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response", () => {
    Recipe.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockRecipes),
    });
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatus = correctResponse.statusCode;

      await getRecipes(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a list of recipes", async () => {
      await getRecipes(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ recipes: mockRecipes });
    });
  });
  describe("When it receives a next function and the exec method rejects with an 'tot malament' error", () => {
    test("Then it should call next function with the error 'tot malament'", async () => {
      const expectedError = new Error("Error connecting to database");

      Recipe.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getRecipes(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
