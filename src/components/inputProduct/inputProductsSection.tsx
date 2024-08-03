import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks.ts";
import { InputProduct } from "./index.ts";
import { InputEditProduct } from "./index.ts";

export const InputProductsSection = () => {
  const { inputEdit } = useAppSelector((state) => state.inputSlice);
  const { idEdit } = useAppSelector((state) => state.inputSlice);
  const [viewEdit, setViewEdit] = useState(false);

  useEffect(() => {
    setViewEdit(inputEdit);
  }, [inputEdit, idEdit]);

  return viewEdit ? <InputEditProduct /> : <InputProduct />;
};
