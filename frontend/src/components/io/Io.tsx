import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAppDispatch } from "../../redux/hooks";
import io from "socket.io-client";
import SocketMessages from "../../../../lib/socket-enums/src/socket-enums";
import Vacation from "../../models/vacation/Vacation";
import User from "../../models/user/User";
import {
  followVacation,
  newVacation,
  remove,
  unfollowVacation,
  update,
} from "../../redux/vacationsActions";

interface SocketContextInterface {
  xClientId: string;
}

export const SocketContext = createContext<SocketContextInterface>({
  xClientId: "",
});

export default function Io(props: PropsWithChildren): JSX.Element {
  const { children } = props;
  const [xClientId] = useState<string>(v4());
  const value = { xClientId };
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_IO_SERVER_URL);

    socket.on(SocketMessages.ADD_VACATION, (payload: { data: Vacation }) => {
      const newVacationPayload = payload?.data;
      if (newVacationPayload) {
        dispatch(newVacation(newVacationPayload));
      }
    });

    socket.on(
      SocketMessages.REMOVE_VACATION,
      (payload: { data: { vacationId: string } }) => {
        const deleteVacationPayload = payload?.data;
        if (deleteVacationPayload) {
          dispatch(remove(deleteVacationPayload));
        }
      }
    );

    socket.on(SocketMessages.UPDATE_VACATION, (payload: { data: Vacation }) => {
      const updateVacationPayload = payload?.data;
      if (updateVacationPayload) {
        dispatch(update(updateVacationPayload));
      }
    });

    socket.on(
      SocketMessages.FOLLOW_VACATION,
      (payload: { data: { vacationId: string; user: User } }) => {
        const followVacationsPayload = payload?.data;
        if (followVacationsPayload) {
          dispatch(followVacation(followVacationsPayload));
        }
      }
    );

    socket.on(
      SocketMessages.UNFOLLOW_VACATION,
      (payload: { data: { vacationId: string; user: User } }) => {
        const unfollowVacationsPayload = payload?.data;
        if (unfollowVacationsPayload) {
          dispatch(unfollowVacation(unfollowVacationsPayload));
        }
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [dispatch, xClientId]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
