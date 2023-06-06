import { type Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface UserStructure extends UserCredentials {
  _id?: string;
  name: string;
}

export interface CustomRequest extends Request {
  id: string;
}

export interface CustomParamsRequest extends Request {
  userId: string;
  params: {
    recipeId: string;
  };
}
