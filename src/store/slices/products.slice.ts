import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../../utils/localStorage.ts";
import { IDataProducts } from "../../types/productsTypes.ts";

export interface IInitialState {
  products: IDataProducts[];
}

interface ISetEditProductItemAction {
  id: number;
  item: IDataProducts;
}

const initialState: IInitialState = {
  products: [
    {
      id: 1,
      name: "Хлеб",
      color: "yellow",
      count: 2,
    },
    {
      id: 2,
      name: "Батон",
      color: "yellow",
      count: 1,
    },
    {
      id: 3,
      name: "Курица",
      color: "red",
      count: 1,
    },
    {
      id: 4,
      name: "Бекон",
      color: "red",
      count: 1,
    },
    {
      id: 5,
      name: "Гречка",
      color: "orange",
      count: 1,
    },
    {
      id: 6,
      name: "Яблоки",
      color: "green",
      count: 1,
    },
    {
      id: 7,
      name: "Кукуруза",
      color: "orange",
      count: 1,
    },
  ],
};
const loadStateProducts = loadState<IInitialState>("products");
const productsState = Object.assign(initialState, loadStateProducts);

export const productsSlice = createSlice({
  name: "products",
  initialState: productsState,
  reducers: {
    addProduct: (state, action: PayloadAction<IDataProducts>) => {
      state.products = [...state.products, action.payload];
    },
    updateProduct: (state, action: PayloadAction<ISetEditProductItemAction>) => {
      state.products = [
        ...state.products.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.item } : item,
        ),
      ];
    },
  },
});

export const { addProduct, updateProduct } = productsSlice.actions;

export default productsSlice.reducer;
