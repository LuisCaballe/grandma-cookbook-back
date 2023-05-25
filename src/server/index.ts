import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

const trustedOrigins = [process.env.ALLOWED_ORIGINS!];

app.use(
  cors({
    origin: trustedOrigins,
  })
);

app.use(morgan("dev"));

export default app;
