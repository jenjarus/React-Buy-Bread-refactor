import { FC } from "react";
import classNames from "classnames";
import { useAppDispatch } from "../../store/hooks.ts";
import { deleteItem, setDoneItem } from "../../store/slices/items.slice.ts";
import { resetInputDeleteItem, setEdit } from "../../store/slices/input.slice.ts";
import { IDataItems } from "../../types/itemsTypes.ts";

interface IProps {
  item: IDataItems;
}

export const ListProductsItem: FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const classColor = classNames({
    color: true,
    [item.color]: !!item.color,
  });

  const handleClickDone = () => {
    dispatch(setDoneItem(item.id));
  };

  const handleClickEdit = () => {
    const setEditParam = {
      inputEdit: true,
      idEdit: item.id,
    };
    dispatch(setEdit(setEditParam));
  };

  const handleClickDelete = () => {
    dispatch(deleteItem(item.id));
    dispatch(resetInputDeleteItem(item.id));
  };

  return (
    <div className="item">
      <div className={classColor}></div>
      <p className="text" onClick={() => handleClickDone()}>
        {item.text}
      </p>
      <button className="icon icon-edit" onClick={() => handleClickEdit()}></button>
      <button className="icon icon-delete" onClick={() => handleClickDelete()}></button>
    </div>
  );
};
