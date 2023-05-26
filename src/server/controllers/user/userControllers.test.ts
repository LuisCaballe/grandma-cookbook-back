import { type NextFunction, type Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type UserStructure, type UserCredentialsRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError";
import User from "../../../database/models/User";
import { loginUser } from "./userControllers";
import {
  correctResponse,
  unauthorizedResponse,
} from "../../utils/responseData/responseData";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const req: Partial<UserCredentialsRequest> = {
    body: {
      username: "luis",
      password: "luis",
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a request with valid credentials and a response", () => {
    const token = "mock-token";

    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = correctResponse.statusCode;
      const mockedUser: UserStructure = {
        _id: new Types.ObjectId().toString(),
        username: "luis",
        password: "luis",
        name: "Luis",
      };

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedUser),
      });

      bcrypt.compare = jest.fn().mockReturnValue(true);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with the token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with a wrong username and a next function", () => {
    test("Then it should call the next function with a 401 and 'Wrong credentials' message", async () => {
      const expectedError = new CustomError(
        unauthorizedResponse.statusCode,
        unauthorizedResponse.message
      );

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
