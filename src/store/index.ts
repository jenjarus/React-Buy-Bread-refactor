import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "../utils/localStorage.ts";
import themeSlice from "./slices/theme.slice.ts";

const store = configureStore({
  reducer: {
    themeSlice: themeSlice,
  },
});

store.subscribe(() => {
  saveState("themeDark", {
    themeDark: store.getState().themeSlice.themeDark,
  });
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
