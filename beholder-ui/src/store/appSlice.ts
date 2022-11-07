import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Trait } from "../types";

export type AppState = {
  menuOpen: boolean;
  traits: Trait[];
};

const initialState: AppState = {
  menuOpen: true,
  traits: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openMenu: (state: AppState) => {
      state.menuOpen = true;
    },
    closeMenu: (state: AppState) => {
      state.menuOpen = false;
    },
    toggleMenu: (state: AppState, action: PayloadAction<boolean>) => {
      state.menuOpen = !action.payload;
    },
    setTraits: (state: AppState, action: PayloadAction<Trait[]>) => {
      state.traits = action.payload;
    },
  },
});

export const { setTraits, openMenu, closeMenu, toggleMenu } = appSlice.actions;

export default appSlice.reducer;
