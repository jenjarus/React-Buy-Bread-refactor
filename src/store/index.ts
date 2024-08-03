import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "../utils/localStorage.ts";
import itemsSlice from "./slices/items.slice.ts";
import themeSlice from "./slices/theme.slice.ts";

const store = configureStore({
  reducer: {
    itemsSlice: itemsSlice,
    themeSlice: themeSlice,
  },
});

store.subscribe(() => {
  saveState("items", {
    items: store.getState().itemsSlice.items,
  });
  saveState("themeDark", {
    themeDark: store.getState().themeSlice.themeDark,
  });
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
