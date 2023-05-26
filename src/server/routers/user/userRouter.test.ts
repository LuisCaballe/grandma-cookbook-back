import "../../../loadEnvironment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import connectToDatabase from "../../../database/connectToDatabase";
import User from "../../../database/models/User";
import app from "../../index.js";
import {
  correctResponse,
  failedValidationResponse,
} from "../../utils/responseData/responseData";
import { unauthorizedResponse } from "../../utils/responseData/responseData";
import {
  mockFailedValidationCredentials,
  mockUser,
  mockUserCredentials,
  mockWrongUserCredentials,
} from "../../../mocks/mocks.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

beforeEach(async () => {
  await User.create(mockUser);
});

afterEach(async () => {
  await User.deleteMany();
});

const loginPath = "/user/login";

describe("Given a POST 'user/login' endpoint", () => {
  describe("When it receives a request with valid credentials with the username 'luis' and the password 'luis'", () => {
    test("Then it should respond with status 200 and a token", async () => {
      const expectedStatus = correctResponse.statusCode;

      const newUser = await User.findOne({
        username: mockUser.username,
      }).exec();

      const response: { body: { token: string } } = await request(app)
        .post(loginPath)
        .send(mockUserCredentials)
        .expect(expectedStatus);

      const { sub: userId } = jwt.verify(
        response.body.token,
        process.env.JWT_SECRET!
      );

      expect(userId).toBe(newUser?._id.toString());
    });
  });

  describe("When it receives an invalid credentials with username 'notLuis' and password 'notLuis'", () => {
    test("Then it should respond with status 401 and 'Wrong credentials' message", async () => {
      const expectedStatus = unauthorizedResponse.statusCode;

      const expectedMessage = unauthorizedResponse.message;

      const response = await request(app)
        .post(loginPath)
        .send(mockWrongUserCredentials)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives an invalid format credentials with username 'luis' and password 1234 number", () => {
    test("Then it sholud respond with status 400 and 'Validation Failed' message", async () => {
      const expectedStatus = failedValidationResponse.statusCode;

      const expectedMessage = failedValidationResponse.message;

      const response = await request(app)
        .post(loginPath)
        .send(mockFailedValidationCredentials)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
