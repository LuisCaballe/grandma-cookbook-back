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

export const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA3NzVhNjE1Y2Q5ZTMzODhjYTkiLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2ODU2NDAwMjEsImV4cCI6MTY4NjA3MjAyMX0.A_Pehhtah2R9DxQO2Hrb6GrFyWiXq3EKbdx2MrqnzIo";

export const mockTokenPayload = {
  sub: "646fa0775a615cd9e3388ca9",
  name: "Admin",
  iat: 1685640021,
  exp: 1686072021,
};
