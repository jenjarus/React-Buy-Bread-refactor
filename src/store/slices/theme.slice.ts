import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utils/localStorage.ts";

export interface IInitialState {
  themeDark: boolean;
}

const initialState: IInitialState = {
  themeDark: false,
};
const loadStateTheme = loadState<IInitialState>("themeDark");
const themeState = Object.assign(initialState, loadStateTheme);

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeState,
  reducers: {
    toggleTheme: (state) => {
      state.themeDark = !state.themeDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
