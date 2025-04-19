import { Router } from "express";
import {
  createVacation,
  getFollowersCSV,
  getAllVacations,
  getOneVacation,
  deleteVacation,
  updateVacation,
} from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import {
  newVacationFilesValidator,
  newVacationValidator,
  updateVacationFilesValidator,
  UpdateVacationValidator,
  vacationIdValidator,
} from "../controllers/vacations/validator";
import validation from "../middlewares/validation";
import enforceAuth from "../middlewares/enforce-auth";
import fileUploader from "../middlewares/file-uploader";
import filesValidation from "../middlewares/file-validation";
import { adminValidator } from "../middlewares/role-validation";

const vacationsRouter = Router();

vacationsRouter.use(enforceAuth);

vacationsRouter.get("/", getAllVacations);
vacationsRouter.get(
  "/:vacationId",
  adminValidator,
  paramsValidation(vacationIdValidator),
  getOneVacation
);
vacationsRouter.post(
  "/",
  adminValidator,
  validation(newVacationValidator),
  filesValidation(newVacationFilesValidator),
  fileUploader,
  createVacation
);
vacationsRouter.delete(
  "/:vacationId",
  adminValidator,
  paramsValidation(vacationIdValidator),
  deleteVacation
);
vacationsRouter.patch(
  "/:vacationId",
  adminValidator,
  paramsValidation(vacationIdValidator),
  validation(UpdateVacationValidator),
  filesValidation(updateVacationFilesValidator),
  fileUploader,
  updateVacation
);
vacationsRouter.get("/reports/followers", adminValidator, getFollowersCSV);

export default vacationsRouter;
