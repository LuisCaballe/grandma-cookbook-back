import "../../../loadEnvironment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { correctResponse } from "../../utils/responseData/responseData.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import request from "supertest";
import Recipe from "../../../database/models/Recipe.js";
import { mockRecipes } from "../../../data/recipes.js";
import { mockToken } from "../../../mocks/mocks.js";
import app from "../../index.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Recipe.deleteMany();
});

describe("Given a GET '/recipes' endpoint", () => {
  beforeEach(async () => {
    await Recipe.create(mockRecipes);
  });

  describe("When it receives a request with valid authorization", () => {
    test("Then it should respond with status 200 and a collection of recipes", async () => {
      const expectedStatus = correctResponse.statusCode;

      const response = await request(app)
        .get("/recipes")
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(expectedStatus);

      expect(response.body.recipes).toHaveLength(2);
    });
  });
});
