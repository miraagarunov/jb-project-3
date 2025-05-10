import { NextFunction, Request, Response } from "express";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";

export async function userValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== "user")
    return next(
      new AppError(
        StatusCodes.FORBIDDEN,
        'for this kind of action, you need to be a "user"'
      )
    );
  next();
}

export async function adminValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== "admin")
    return next(
      new AppError(
        StatusCodes.FORBIDDEN,
        'for this kind of action, you need to be "admin"'
      )
    );
  next();
}
