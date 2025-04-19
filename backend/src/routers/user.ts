import { Router } from "express";
import enforceAuth from "../middlewares/enforce-auth";
import { getAllUsers } from "../controllers/user/controller";
import { adminValidator } from "../middlewares/role-validation";

const usersRouter = Router();

usersRouter.use(enforceAuth);
usersRouter.get("/", adminValidator, getAllUsers);

export default usersRouter;
