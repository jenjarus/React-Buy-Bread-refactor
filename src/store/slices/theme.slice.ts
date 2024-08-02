import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utils/localStorage.ts";

interface IInitialState {
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
    setThemeDark: (state) => {
        console.log(state.themeDark);
      state.themeDark = !state.themeDark;
    },
  },
});

export const { setThemeDark } = themeSlice.actions;

export default themeSlice.reducer;
