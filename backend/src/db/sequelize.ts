import { Sequelize } from "sequelize-typescript";
import config from "config";
import { User } from "../models/user";
import { Follow } from "../models/follow";
import { Vacation } from "../models/vacation";

const logging = config.get<boolean>("sequelize.logging") ? console.log : false;

const sequelize = new Sequelize({
  models: [User, Vacation, Follow],
  dialect: "mysql",
  ...config.get("db"),
  logging,
});

export default sequelize;
