import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import "@shared/container/index";
import createConnection from "../typeorm";
import express, { Request, Response, NextFunction } from "express";
import { errors } from "celebrate";
import { AppError } from "@shared/errors/AppError";
import { routers } from "./routes/index";

const currentHour = new Date(Date.now()).getHours();
const currentMinutes = new Date(Date.now()).getMinutes();
const currentSeconds = new Date(Date.now()).getSeconds();

createConnection()
  .then(_ => {
    console.info(
      "\x1b[32m",
      `[DATABASE] ${currentHour}:${currentMinutes}:${currentSeconds} > database online`,
      "\x1b[0m",
    );
  })
  .catch(error => {
    console.error(
      "\x1b[31m",
      `[ERROR] ${currentHour}:${currentMinutes}:${currentSeconds} > ${error}`,
      "\x1b[0m",
    );
  });

const app = express();

app.use(express.json());
app.use(routers);
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    message: err.message,
  });
});

export { app };
