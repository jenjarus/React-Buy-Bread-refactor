import { FC } from "react";
import classNames from "classnames";
import { useAppDispatch } from "../../store/hooks.ts";
import { deleteItem, setDoneItem } from "../../store/slices/items.slice.ts";
import { resetInputDeleteItem, setInputUpdatedItem } from "../../store/slices/input.slice.ts";
import { IDataItems } from "../../types/itemsTypes.ts";

interface IProps {
  item: IDataItems;
}

export const ListProductsItem: FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const classColor = classNames("list-products__item-color", item.color);

  const handleClickDone = () => {
    dispatch(setDoneItem(item.id));
  };

  const handleClickEdit = () => {
    const setEditParam = {
      isUpdatedItem: true,
      idUpdatedItem: item.id,
    };
    dispatch(setInputUpdatedItem(setEditParam));
  };

  const handleClickDelete = () => {
    dispatch(deleteItem(item.id));
    dispatch(resetInputDeleteItem(item.id));
  };

  return (
    <div className="list-products__item">
      <div className={classColor}></div>
      <p className="list-products__item-text" onClick={() => handleClickDone()}>
        {item.text}
      </p>
      <button className="icon icon-edit" onClick={() => handleClickEdit()}></button>
      <button className="icon icon-delete" onClick={() => handleClickDelete()}></button>
    </div>
  );
};
