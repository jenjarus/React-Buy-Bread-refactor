import { FC } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { deleteDoneItems } from "../../store/slices/items.slice.ts";
import { ListProductsItem } from "./listProductsItem.tsx";

interface IProps {
  isDoneList: boolean;
}

export const ListProducts: FC<IProps> = ({ isDoneList }) => {
  const { items: stateItems } = useAppSelector((state) => state.itemsSlice);
  const dispatch = useAppDispatch();
  const items = isDoneList
    ? stateItems.filter((item) => item.done)
    : stateItems.filter((item) => !item.done);
  const classListProduct = classNames({
    "list-products": true,
    "list-products-bought": isDoneList,
  });

  const handleClickDeleteDone = () => {
    dispatch(deleteDoneItems());
  };

  return (
    <div className={classListProduct}>
      <div className="container">
        {isDoneList && !!items.length && (
          <div className="bought-top">
            <div className="bought-count">Выполнено: {items.length}</div>
            <span className="link link-delete" onClick={() => handleClickDeleteDone()}>
              Очистить список
            </span>
          </div>
        )}
        <div className="items">
          {!isDoneList && !items.length && <div className="empty-item">Список пуст</div>}
          {items.map((el) => (
            <ListProductsItem key={el.id} item={el} />
          ))}
        </div>
      </div>
    </div>
  );
};
