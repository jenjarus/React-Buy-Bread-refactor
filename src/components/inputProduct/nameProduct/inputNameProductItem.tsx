import { FC } from "react";
import classNames from "classnames";
import { IDataProducts } from "../../../types/productsTypes.ts";

interface IProps {
  item: IDataProducts;
  setProduct: (id: number) => void;
}

export const InputNameProductItem: FC<IProps> = ({ item, setProduct }) => {
  const classColorBtn = classNames("item", "btn", item.color);

  return (
    <button className={classColorBtn} onClick={() => setProduct(item.id)}>
      {item.name}
    </button>
  );
};
