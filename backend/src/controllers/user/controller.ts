import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (e) {
    next(e);
  }
}
