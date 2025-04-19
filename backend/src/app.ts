import express, { json } from "express";
import config from "config";
import sequelize from "./db/sequelize";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import cors from "cors";
import authRouter from "./routers/auth";
import fileUpload from "express-fileupload";
import { createAppBucketIfNotExist } from "./aws/aws";
import vacationsRouter from "./routers/vacation";
import followsRouter from "./routers/follow";
import usersRouter from "./routers/user";

const force = config.get<boolean>("sequelize.sync.force");

const app = express();

export async function start() {
  await sequelize.sync({ force });
  await createAppBucketIfNotExist();

  app.use(cors());
  app.use(json());
  app.use(fileUpload());

  app.use("/auth", authRouter);
  app.use("/vacations", vacationsRouter);
  app.use("/follows", followsRouter);
  app.use("/users", usersRouter);

  app.use(errorLogger);
  app.use(errorResponder);
}

export default app;
