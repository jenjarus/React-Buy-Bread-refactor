import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  isUpdatedItem: boolean;
  idUpdatedItem: number;
}

const initialState: IInitialState = {
  /*inputEdit: false,
  idEdit: 0,*/
  isUpdatedItem: false,
  idUpdatedItem: 0,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInputUpdatedItem: (state, action: PayloadAction<IInitialState>) => {
      state.isUpdatedItem = action.payload.isUpdatedItem;
      state.idUpdatedItem = action.payload.idUpdatedItem;
    },
    // resetInputDeleteItem - если при редактировании удалить изменяемый продукт из списка, то сбросить значение инпута
    resetInputDeleteItem: (state, action: PayloadAction<number>) => {
      state.isUpdatedItem = action.payload === state.idUpdatedItem ? false : state.isUpdatedItem;
      state.idUpdatedItem = action.payload === state.idUpdatedItem ? 0 : state.idUpdatedItem;
    },
  },
});

export const { setInputUpdatedItem, resetInputDeleteItem } = inputSlice.actions;

export default inputSlice.reducer;
