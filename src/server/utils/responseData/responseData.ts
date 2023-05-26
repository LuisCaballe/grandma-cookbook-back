import { type ResponseStructure } from "./types";

export const notFoundResponse: ResponseStructure = {
  statusCode: 404,
  message: "Endpoint not found",
};

export const unauthorizedResponse: ResponseStructure = {
  statusCode: 401,
  message: "Wrong credentials",
};

export const generalErrorResponse: ResponseStructure = {
  statusCode: 500,
  message: "General error",
};

export const correctResponse: ResponseStructure = {
  statusCode: 200,
  message: "OK",
};

export const failedValidationResponse: ResponseStructure = {
  statusCode: 400,
  message: "Validation Failed",
};
