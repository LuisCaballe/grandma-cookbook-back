import { Types } from "mongoose";
import { type FailedValidationRequest } from "../server/routers/user/types.js";
import { type UserCredentials, type UserStructure } from "../server/types.js";

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
