import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../../utils/localStorage.ts";
import { IDataItems } from "../../types/itemsTypes.ts";

export interface IInitialState {
  items: IDataItems[];
}

const initialState: IInitialState = {
  items: [
    {
      id: 1,
      done: false,
      show: true,
      color: "yellow",
      text: "Хлеб",
    },
    {
      id: 2,
      done: false,
      show: true,
      color: "blue",
      text: "Молоко",
    },
    {
      id: 3,
      done: false,
      show: true,
      color: "red",
      text: "Курица",
    },
  ],
};

const loadStateItems = loadState<IInitialState>("items");
const itemsState = Object.assign(initialState, loadStateItems);

export const itemsSlice = createSlice({
  name: "items",
  initialState: itemsState,
  reducers: {
    addItem: (state, action: PayloadAction<IDataItems>) => {
      state.items = [...state.items, action.payload];
    },
    updateItem: (state, action: PayloadAction<IDataItems>) => {
      state.items = [
        ...state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item,
        ),
      ];
    },
    setDoneItem: (state, action: PayloadAction<number>) => {
      state.items = [
        ...state.items.map((item) =>
          item.id === action.payload ? { ...item, done: !item.done } : item,
        ),
      ];
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = [...state.items.filter((item) => item.id !== action.payload)];
    },
    deleteDoneItems: (state) => {
      state.items = [...state.items.filter((item) => !item.done)];
    },
  },
});

export const { addItem, updateItem, setDoneItem, deleteItem, deleteDoneItems } = itemsSlice.actions;

export default itemsSlice.reducer;
