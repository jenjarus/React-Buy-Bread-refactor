import { useAppSelector } from "../../store/hooks.ts";
import { InputProduct } from "./index.ts";
import { InputEditProduct } from "./index.ts";

export const InputProductsSection = () => {
  const { isUpdatedItem } = useAppSelector((state) => state.inputSlice);

  return isUpdatedItem ? <InputEditProduct /> : <InputProduct />;
};
