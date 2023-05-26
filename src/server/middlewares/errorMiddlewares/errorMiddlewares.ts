import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import { ValidationError } from "express-validation";
import CustomError from "../../../CustomError/CustomError.js";
import {
  generalErrorResponse,
  notFoundResponse,
} from "../../utils/responseData/responseData.js";

const debug = createDebug(
  "grandma-cookbook-api:server:middlewares:errorMiddlewares"
);

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    notFoundResponse.statusCode,
    notFoundResponse.message
  );

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(`Error: ${chalk.red(error.message)}`);
  if (error instanceof ValidationError && error.details.body) {
    const validationError = error.details.body
      .map((joiError) => joiError.message.replaceAll('"', ""))
      .join(" & ");

    (error as CustomError).publicMessage = validationError;
    debug(chalk.red(validationError));
  }

  const statusCode = error.statusCode || generalErrorResponse.statusCode;
  const message = error.statusCode
    ? error.message
    : generalErrorResponse.message;

  res.status(statusCode).json({ message });
};
