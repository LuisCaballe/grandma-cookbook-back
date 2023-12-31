import { type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type CustomRequest } from "../../types.js";
import CustomError from "../../../CustomError/CustomError.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(401, "Missing token");

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const { sub: id } = jwt.verify(token, process.env.JWT_SECRET!);

    req.userId = id as string;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
