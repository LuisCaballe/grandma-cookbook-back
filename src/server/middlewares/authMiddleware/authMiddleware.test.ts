import jwt from "jsonwebtoken";
import { type Request, type NextFunction, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { type CustomRequest } from "../../types.js";
import auth from "./authMiddleware.js";
import { mockToken, mockTokenPayload } from "../../../mocks/mocks.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an auth middleware", () => {
  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer ${mockToken}`),
  };
  const res = {};
  const next = jest.fn();

  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the received next function", () => {
      jwt.verify = jest.fn().mockReturnValue(mockTokenPayload);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an authorization header with an invalid token and a next function", () => {
    test("Then it should call the received next function with a 401 'Invalid token' error", () => {
      const expectedError = new CustomError(401, "Invalid token");
      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an authorization header without bearer and a next function", () => {
    test("Then it should call the received next function with a 401 'Missing token' error", () => {
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(mockToken),
      };

      const expectedError = new CustomError(401, "Missing token");

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
