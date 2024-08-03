import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  inputEdit: boolean;
  idEdit: number;
}

const initialState: IInitialState = {
  inputEdit: false,
  idEdit: 0,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setEdit: (state, action: PayloadAction<IInitialState>) => {
      state.inputEdit = action.payload.inputEdit;
      state.idEdit = action.payload.idEdit;
    },
    // resetInputDeleteItem - если при редактировании удалить изменяемый продукт из списка, то сбросить значение инпута
    resetInputDeleteItem: (state, action: PayloadAction<number>) => {
      state.inputEdit = action.payload === state.idEdit ? false : state.inputEdit;
      state.idEdit = action.payload === state.idEdit ? 0 : state.idEdit;
    },
  },
});

export const { setEdit, resetInputDeleteItem } = inputSlice.actions;

export default inputSlice.reducer;
