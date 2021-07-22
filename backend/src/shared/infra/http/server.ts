import "reflect-metadata";
import "dotenv/config";

import { errors } from "celebrate";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import "@shared/infra/typeorm";
import "@shared/container";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import rateLimiter from "./middlewares/rateLimiter";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    mess: err.message,
    message: "Internal server error",
  });
});

const PORT = 3333;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log("🚀 Server started on port 3333!");
});
