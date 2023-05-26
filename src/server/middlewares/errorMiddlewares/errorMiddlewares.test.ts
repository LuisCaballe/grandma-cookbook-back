import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";
import {
  generalErrorResponse,
  notFoundResponse,
} from "../../utils/responseData/responseData";

const expectedError = new CustomError(
  notFoundResponse.statusCode,
  notFoundResponse.message
);
const req = {};
const next = jest.fn();

describe("Given a notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the received next function with a 404 'Endpoint not found' error", () => {
      const res = {};

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a generalError middleware", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a 404 'Endpoint not found' error and a response", () => {
    test("Then it should call the response's method status with 404", () => {
      const expectedStatusCode = notFoundResponse.statusCode;

      generalError(
        expectedError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json with a 'Endpoint not found' message", () => {
      const expectedMessage = notFoundResponse.message;

      generalError(
        expectedError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("when it receives an error without status code and a response", () => {
    const error = new Error();
    test("Then it should call the response's method status with 500", () => {
      const expectedStatus = generalErrorResponse.statusCode;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a message 'General error", () => {
      const expectedMessage = generalErrorResponse.message;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
