import express from "express";
import cors from "cors";
import morgan from "morgan";
import pingController from "./controllers/ping/pingController.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import paths from "./paths/paths.js";

const app = express();

const trustedOrigins = [process.env.ALLOWED_ORIGINS!];

app.use(
  cors({
    origin: trustedOrigins,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.disable("x-powered-by");

app.get(paths.pingController, pingController);

app.use(notFoundError);

app.use(generalError);

export default app;
