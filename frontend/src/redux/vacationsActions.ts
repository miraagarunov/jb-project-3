import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";
import User from "../models/user/User";

interface VacationAvailability {
  vacations: Vacation[];
  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: VacationAvailability = {
  vacations: [],
  isLoading: true,
  currentPage: 1,
  itemsPerPage: 10,
};

export const vacationsSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Vacation[]>) => {
      state.vacations = action.payload;
      state.isLoading = false;
    },
    newVacation: (state, action: PayloadAction<Vacation>) => {
      state.vacations = [action.payload, ...state.vacations];
    },
    remove: (state, action: PayloadAction<{ vacationId: string }>) => {
      state.vacations = state.vacations.filter(
        (v) => v.vacationId !== action.payload.vacationId
      );
    },
    update: (state, action: PayloadAction<Vacation>) => {
      const index = state.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      if (index > -1) {
        state.vacations[index] = action.payload;
      }
    },
    followVacation: (
      state,
      action: PayloadAction<{ vacationId: string; user: User }>
    ) => {
      const index = state.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      if (index > -1) {
        const vacation = state.vacations[index];
        if (!vacation.followers) {
          vacation.followers = [];
        }
        if (
          !vacation.followers.some(
            (f) => f.userId === action.payload.user.userId
          )
        ) {
          vacation.followers.push(action.payload.user);
        }
      }
    },
    unfollowVacation: (
      state,
      action: PayloadAction<{ vacationId: string; user: User }>
    ) => {
      const index = state.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      if (index > -1 && state.vacations[index].followers) {
        state.vacations[index].followers = state.vacations[
          index
        ].followers.filter((f) => f.userId !== action.payload.user.userId);
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  init,
  newVacation,
  remove,
  update,
  followVacation,
  unfollowVacation,
  setCurrentPage,
} = vacationsSlice.actions;

export default vacationsSlice.reducer;
