import {
  type UnauthorizedErrorStructure as UnauthorizedResponseStructure,
  type NotFoundErrorStructure as NotFoundResponseStructure,
  type GeneralErrorStructure as GeneralErrorResponseStructure,
  type correctResponseStructure,
} from "./types";

export const notFoundResponse: NotFoundResponseStructure = {
  statusCode: 404,
  message: "Endpoint not found",
};

export const unauthorizedResponse: UnauthorizedResponseStructure = {
  statusCode: 401,
  message: "Wrong credentials",
};

export const generalErrorResponse: GeneralErrorResponseStructure = {
  statusCode: 500,
  message: "General error",
};

export const correctResponse: correctResponseStructure = {
  statusCode: 200,
  message: "OK",
};
