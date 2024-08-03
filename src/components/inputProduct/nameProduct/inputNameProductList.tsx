import { FC } from "react";
import { useAppSelector } from "../../../store/hooks.ts";
import { InputNameProductItem } from "./inputNameProductItem.tsx";
import { IDataProducts } from "../../../types/productsTypes.ts";

interface IProps {
  input: string;
  setProduct: (id: number) => void;
}

export const InputNameProductList: FC<IProps> = ({ input, setProduct }) => {
  const { products } = useAppSelector((state) => state.productsSlice);

  // Сортировка по убыванию количества вызовов продукта
  const sortCount = (prev: IDataProducts, next: IDataProducts) => next.count - prev.count;

  // Сначала вывод сохраненных продуктов которые начинаются на input...
  let newArr: IDataProducts[] = products.filter((a) => a.name.startsWith(input)).sort(sortCount);
  // Потом которые имеют в теле input
  newArr.push(
    ...products.filter((a) => a.name.includes(input) && !a.name.startsWith(input)).sort(sortCount),
  );
  // Не выводить если input пустой
  newArr = !input ? [] : newArr;

  return (
    <div className="input-product-list">
      {newArr.slice(0, 10).map((el) => (
        <InputNameProductItem key={el.id} item={el} setProduct={setProduct} />
      ))}
    </div>
  );
};
