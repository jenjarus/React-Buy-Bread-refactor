import { FC } from "react";
import { useAppSelector } from "../../../store/hooks.ts";
import { InputNameProductItem } from "./inputNameProductItem.tsx";
import { IDataProducts } from "../../../types/productsTypes.ts";

interface IProps {
  inputValue: string;
  setProduct: (id: number) => void;
}

export const InputNameProductList: FC<IProps> = ({ inputValue, setProduct }) => {
  const { products } = useAppSelector((state) => state.productsSlice);

  // Сортировка по убыванию количества вызовов продукта
  const sortCount = (prev: IDataProducts, next: IDataProducts) => next.count - prev.count;

  // Сначала вывод сохраненных продуктов которые начинаются на input...
  const productsList: IDataProducts[] = products
    .filter((a) => a.name.startsWith(inputValue))
    .sort(sortCount);
  // Потом которые имеют в теле input
  productsList.push(
    ...products
      .filter((a) => a.name.includes(inputValue) && !a.name.startsWith(inputValue))
      .sort(sortCount),
  );

  if (inputValue && productsList.length) {
    return (
      <div className="input-product-list">
        {productsList.slice(0, 10).map((el) => (
          <InputNameProductItem key={el.id} item={el} setProduct={setProduct} />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};
