import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import SocketMessages from "../../../../lib/socket-enums/src/socket-enums";
import { Follow } from "../../models/follow";

export async function followVacation(
  req: Request<{ vacationId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    const userId = req.user.userId;

    const { vacationId } = req.params;

    const newFollowVacation = await Follow.create({
      userId: userId,
      vacationId: vacationId,
    });
    res.json(newFollowVacation);

    socket.emit(SocketMessages.FOLLOW_VACATION, {
      from: req.headers["x-client-id"],
      data: { vacationId: vacationId, user: user },
    });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return next(
        new AppError(
          StatusCodes.CONFLICT,
          "This vacation is already being followed by you"
        )
      );
    }
    next(e);
  }
}

export async function unfollowVacation(
  req: Request<{ vacationId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    const userId = req.user.userId;

    const { vacationId } = req.params;

    const unfollowVacation = await Follow.destroy({
      where: {
        userId: userId,
        vacationId: vacationId,
      },
    });

    if (!unfollowVacation)
      return next(
        new AppError(
          StatusCodes.NOT_FOUND,
          `The record you're trying to delete doesn't exist, ${vacationId}`
        )
      );

    res.json({ success: true });

    socket.emit(SocketMessages.UNFOLLOW_VACATION, {
      from: req.headers["x-client-id"],
      data: { vacationId: vacationId, user: user },
    });
  } catch (e) {
    next(e);
  }
}
