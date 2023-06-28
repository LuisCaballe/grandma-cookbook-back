import { type Request } from "express";
import { type RecipeStructure } from "../types";

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
  userId: string;
  params: {
    recipeId: string;
  };
  body: RecipeStructure;
  query: {
    skip: string;
    limit: string;
    filter?: "Easy" | "Moderate" | "Advanced";
  };
}
