import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../types";

export type AppState = {
  user: User | undefined;
};

const initialState: AppState = {
  user: undefined,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state: AppState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state: AppState) => {
      state.user = undefined;
    },
  },
});

export const { setUser, clearUser } = appSlice.actions;

export default appSlice.reducer;
