import { Router } from "express";
import enforceAuth from "../middlewares/enforce-auth";
import {
  followVacation,
  unfollowVacation,
} from "../controllers/follows/controller";
import paramsValidation from "../middlewares/params-validation";
import { followsVacationIdValidator } from "../controllers/follows/validator";
import { userValidator } from "../middlewares/role-validation";

const followsRouter = Router();

followsRouter.use(enforceAuth);

followsRouter.post(
  "/follow/:vacationId",
  userValidator,
  paramsValidation(followsVacationIdValidator),
  followVacation
);
followsRouter.delete(
  "/unfollow/:vacationId",
  userValidator,
  paramsValidation(followsVacationIdValidator),
  unfollowVacation
);

export default followsRouter;
