import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAppDispatch } from "../../redux/hooks";
import { io } from "socket.io-client";
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

    socket.onAny((eventName, payload) => {
      console.log(eventName, payload);

      if (payload?.from !== xClientId) {
        switch (eventName) {
          case SocketMessages.ADD_VACATION: {
            const newVacationPayload = payload?.data as Vacation;
            if (newVacationPayload) {
              dispatch(newVacation(newVacationPayload));
            }
            break;
          }
          case SocketMessages.REMOVE_VACATION: {
            const deleteVacationPayload = payload?.data as {
              vacationId: string;
            };
            if (deleteVacationPayload) {
              dispatch(remove(deleteVacationPayload));
            }
            break;
          }
          case SocketMessages.UPDATE_VACATION: {
            const updateVacationPayload = payload?.data as Vacation;
            if (updateVacationPayload) {
              dispatch(update(updateVacationPayload));
            }
            break;
          }
          case SocketMessages.FOLLOW_VACATION: {
            const followVacationsPayload = payload?.data as {
              vacationId: string;
              user: User;
            };
            if (followVacationsPayload) {
              dispatch(followVacation(followVacationsPayload));
            }
            break;
          }
          case SocketMessages.UNFOLLOW_VACATION: {
            const unfollowVacationsPayload = payload?.data as {
              vacationId: string;
              user: User;
            };
            if (unfollowVacationsPayload) {
              dispatch(unfollowVacation(unfollowVacationsPayload));
            }
            break;
          }
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, xClientId]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
