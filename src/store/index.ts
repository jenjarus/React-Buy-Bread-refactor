import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "../utils/localStorage.ts";
import itemsSlice from "./slices/items.slice.ts";
import productsSlice from "./slices/products.slice.ts";
import themeSlice from "./slices/theme.slice.ts";

const store = configureStore({
  reducer: {
    itemsSlice: itemsSlice,
    productsSlice: productsSlice,
    themeSlice: themeSlice,
  },
});

store.subscribe(() => {
  saveState("items", {
    items: store.getState().itemsSlice.items,
  });
  saveState("products", {
    products: store.getState().productsSlice.products,
  });
  saveState("themeDark", {
    themeDark: store.getState().themeSlice.themeDark,
  });
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
