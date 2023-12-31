import { type NextFunction, type Response } from "express";
import {
  addRecipe,
  getRecipeById,
  getRecipes,
  removeRecipe,
  updateRecipe,
} from "./recipesControllers";
import Recipe from "../../../database/models/Recipe";
import { correctResponse } from "../../utils/responseData/responseData";
import { type CustomRequest } from "../../types";
import {
  mockAddedRecipe,
  mockRecipes,
  mockUpdatedRecipe,
} from "../../../mocks/mocks";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getRecipes controller", () => {
  const req: Partial<CustomRequest> = {
    query: {
      limit: "10",
      skip: "20",
      filter: "Easy",
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a request with an user id, a response, and a filter", () => {
    Recipe.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockRecipes),
    });

    Recipe.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue(mockRecipes.length),
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

      expect(res.json).toHaveBeenCalledWith({
        recipes: mockRecipes,
        totalRecipes: mockRecipes.length,
      });
    });
  });
  describe("When it receives a next function and the exec method rejects with an 'Error connecting to database' error", () => {
    test("Then it should call next function with the error 'Error connecting to databaset'", async () => {
      const expectedError = new Error("Error connecting to database");

      Recipe.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
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
  const req: Partial<CustomRequest> = {
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
        req as CustomRequest,
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
        req as CustomRequest,
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
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given an addRecipe controller", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  const req: Partial<CustomRequest> = {
    userId: "646fa0775a615cd9e3388ca8",
    body: mockAddedRecipe,
  };
  describe("When it receives a user id and a recipe", () => {
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatus = 201;

      Recipe.create = jest.fn().mockResolvedValue(mockAddedRecipe);

      await addRecipe(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with the recipe", async () => {
      Recipe.create = jest.fn().mockResolvedValue(mockAddedRecipe);

      await addRecipe(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ recipe: mockAddedRecipe });
    });
  });

  describe("When it receives a next function and the recipe cannot be added", () => {
    test("Then it should call next function with the error 'Error: The recipe has not been added'", async () => {
      const expectedError = new CustomError(
        400,
        "Error: The recipe has not been added"
      );

      Recipe.create = jest.fn().mockResolvedValue(undefined);

      await addRecipe(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a getRecipeById controller", () => {
  const req: Partial<CustomRequest> = {
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

      Recipe.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockRecipes[0]),
      });

      await getRecipeById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with the recipe", async () => {
      Recipe.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockRecipes[0]),
      });

      await getRecipeById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ recipeById: mockRecipes[0] });
    });
  });

  describe("When it receives a invalid recipe id", () => {
    test("Then it should call the response's method status with 404", async () => {
      const expectedError = new CustomError(404, "Recipe not found");

      Recipe.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await getRecipeById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given an updateRecipe controller", () => {
  const req: Partial<CustomRequest> = {
    params: {
      recipeId: mockRecipes[0]._id.toString(),
    },
    body: mockUpdatedRecipe,
  };
  const next = jest.fn();
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a valid recipe id and a valid updated recipe data", () => {
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatus = 200;

      Recipe.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await updateRecipe(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with the message 'Recipe updated successfully'", async () => {
      const expectedMessage = "Recipe updated successfully";

      await updateRecipe(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a next function and the exec method rejects with an error", () => {
    test("Then it should call the next function with the error", async () => {
      const expectedError = new Error("Error connecting to database");

      Recipe.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await updateRecipe(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
