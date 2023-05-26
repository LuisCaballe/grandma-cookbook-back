import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type UserCredentialsRequest } from "../../types";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import { unauthorizedResponse } from "../../utils/responseData/responseData";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        unauthorizedResponse.statusCode,
        unauthorizedResponse.message
      );

      throw error;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "5d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
