import { type Request, type Response } from "express";
import pingController from "./pingController.js";

describe("Given a pingController controller", () => {
  describe("When it receives a respnse", () => {
    const req = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response's method status with 200", () => {
      const expectedStatus = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with '🏓 Pong' message", () => {
      const expectedMessage = "🏓 Pong";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
