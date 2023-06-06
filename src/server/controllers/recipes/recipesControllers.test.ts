import { type NextFunction, type Response } from "express";
import { getRecipes, removeRecipe } from "./recipesControllers";
import Recipe from "../../../database/models/Recipe";
import { mockRecipes } from "../../../data/recipes";
import { correctResponse } from "../../utils/responseData/responseData";
import { type CustomParamsRequest, type CustomRequest } from "../../types";

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

describe("Given a removeRecipe controller", () => {
  const req: Partial<CustomParamsRequest> = {
    params: {
      recipeId: mockRecipes[0]._id.toString(),
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a valid recipe id", () => {
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatus = 200;

      Recipe.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockRecipes[0]),
      });

      await removeRecipe(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a invalid recipe id", () => {
    test("Then it should call the response's method status with 404", async () => {
      const expectedStatus = 404;

      Recipe.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await removeRecipe(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a next function and the exec method rejects with a 'Error connecting to database'", () => {
    test("Then it should call next function with the error 'Error connecting to database'", async () => {
      const expectedError = new Error("Error connecting to database");

      Recipe.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await removeRecipe(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
