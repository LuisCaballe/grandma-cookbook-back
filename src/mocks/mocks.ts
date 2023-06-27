import { Types } from "mongoose";
import { type FailedValidationRequest } from "../server/routers/user/types.js";
import { type UserCredentials, type UserStructure } from "../server/types.js";
import {
  type RecipeStructure,
  type RecipeDatabaseStructure,
  type RecipeDatabaseStructureId,
} from "../types.js";

export const mockUser: UserStructure = {
  name: "Luis",
  username: "luis",
  password: "$2y$10$o37TxhfaOAAp6TCDuku2teR/dVl4l9Rvp6jAYUD.hQwL26IYBkrhW",
};

export const mockUserCredentials: UserCredentials = {
  username: "luis",
  password: "luis",
};

export const mockWrongUserCredentials: UserCredentials = {
  username: "notLuis",
  password: "notLuis",
};

export const mockFailedValidationCredentials: FailedValidationRequest = {
  username: "luis",
  password: 1234,
};

export const mockedUser: UserStructure = {
  _id: new Types.ObjectId().toString(),
  username: "luis",
  password: "luis",
  name: "Luis",
};

export const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA3NzVhNjE1Y2Q5ZTMzODhjYTkiLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2ODYyNDA0ODMsImV4cCI6MTY4ODgzMjQ4M30.PWLMYB32veBysHcp1HDB0xYCSAqqu1plOzGO4UZktc8";

export const mockTokenPayload = {
  sub: "646fa0775a615cd9e3388ca9",
  name: "Admin",
  iat: 1685640021,
  exp: 1686072021,
};

export const mockRecipes: RecipeDatabaseStructure[] = [
  {
    _id: new Types.ObjectId("647100635a615cd9e3388cab"),
    name: "Fried egg",
    imageUrl: "image1",
    cookingTime: 10,
    difficulty: "Easy",
    directions: "Just fry a egg",
    ingredients: "Oil, egg",
    user: new Types.ObjectId("646fa0775a615cd9e3388ca9"),
  },
  {
    _id: new Types.ObjectId("647102745a615cd9e3388cae"),
    name: "Boiled egg",
    imageUrl: "image1",
    cookingTime: 10,
    difficulty: "Easy",
    directions: "Just boil a egg",
    ingredients: "Water, egg",
    user: new Types.ObjectId("646fa0775a615cd9e3388ca9"),
  },
];

export const mockAddedRecipe: RecipeStructure = {
  name: "Fried egg",
  imageUrl: "image1",
  cookingTime: 10,
  difficulty: "Easy",
  directions: "Just fry a egg",
  ingredients: "Oil, egg",
};

export const mockUpdatedRecipe: RecipeStructure = {
  name: "Delicious Fried egg",
  imageUrl: "image1",
  cookingTime: 10,
  difficulty: "Easy",
  directions: "Just fry a egg",
  ingredients: "Oil, egg",
};

export const mockRecipesId: RecipeDatabaseStructureId[] = [
  {
    id: "647100635a615cd9e3388cab",
    name: "Fried egg",
    imageUrl: "image1",
    cookingTime: 10,
    difficulty: "Easy",
    directions: "Just fry a egg",
    ingredients: "Oil, egg",
    user: "646fa0775a615cd9e3388ca9",
  },
];
