import request from "supertest";
import app from ".";
import { correctResponse } from "./utils/responseData/responseData";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a response", () => {
    test("Then it should respond with a status 200 and '🏓 Pong' message", async () => {
      const expectedStatus = correctResponse.statusCode;
      const expectedMesssage = "🏓 Pong";

      const response = await request(app).get("/").expect(expectedStatus);

      expect(response.body).toHaveProperty("message", expectedMesssage);
    });
  });
});
