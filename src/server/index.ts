import express from "express";
import cors from "cors";

const app = express();

const trustedOrigins = [process.env.ALLOWED_ORIGINS!];

app.use(
  cors({
    origin: trustedOrigins,
  })
);

export default app;