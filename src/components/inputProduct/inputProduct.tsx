import { useEffect, useRef, useState, KeyboardEvent, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { IDataProducts } from "../../types/productsTypes.ts";
import { setInputUpdatedItem } from "../../store/slices/input.slice.ts";
import { updateProduct, addProduct } from "../../store/slices/products.slice.ts";
import { addItem, updateItem } from "../../store/slices/items.slice.ts";
import { InputColorList, InputNameProductList } from "./";
import { IDataItems } from "../../types/itemsTypes.ts";

interface IProps {
  isUpdatedItem: boolean;
}

export const InputProduct: FC<IProps> = ({ isUpdatedItem }) => {
  const { idUpdatedItem: id } = useAppSelector((state) => state.inputSlice);
  const { items } = useAppSelector((state) => state.itemsSlice);
  const { products } = useAppSelector((state) => state.productsSlice);
  const dispatch = useAppDispatch();
  const updatableItem = items.find((item) => item.id === id) as IDataItems;
  const [input, setInput] = useState("");
  const [color, setColor] = useState("transparent");
  const inputRef = useRef<HTMLInputElement>(null);
  const defaultEditParam = {
    isUpdatedItem: false,
    idUpdatedItem: 0,
  };

  useEffect(() => {
    if (updatableItem) {
      setInput(updatableItem.text);
      setColor(updatableItem.color);
    }
  }, [updatableItem]);

  const addingItem = () => {
    let newText = input.replace(/\s+/g, " ");
    newText = newText.trim();

    const newItem = isUpdatedItem
      ? { ...updatableItem, text: newText, color: color }
      : {
          id: new Date().getTime(),
          done: false,
          show: true,
          color: color,
          text: newText,
        };

    const newProduct = {
      id: new Date().getTime(),
      count: 1,
      color: color,
      name: newText,
    };

    if (input.trim()) {
      isUpdatedItem ? dispatch(updateItem(newItem)) : dispatch(addItem(newItem));
      isUpdatedItem && dispatch(setInputUpdatedItem(defaultEditParam));
      isUpdatedProduct()
        ? dispatch(
            updateProduct({
              id: idUpdatedProduct(),
              item: updatedProduct(newText),
            }),
          )
        : dispatch(addProduct(newProduct));
      setInput("");
      setColor("transparent");
    } else {
      dispatch(setInputUpdatedItem(defaultEditParam));
    }
  };

  const handleClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      addingItem();
    }
  };

  const handleClickClose = () => {
    dispatch(setInputUpdatedItem(defaultEditParam));
  };

  // Вставка сохраненного названия продукта
  const setProduct = (id: number) => {
    const product = products.find((el) => el.id === id) as IDataProducts;
    setInput(product.name);
    setColor(product.color);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Проверка на наличие сохраненного названия продукта
  const isUpdatedProduct = () => {
    const product = products.filter((a) => a.name === input);
    return product.length !== 0;
  };

  // id сохраненного названия продукта
  const idUpdatedProduct = (): number => {
    const product = products.filter((a) => a.name === input);
    return product[0].id;
  };

  // Изменение объекта сохраненного названия продукта
  const updatedProduct = (text: string): IDataProducts => {
    const product = products.find((a) => a.name === input) as IDataProducts;
    return {
      id: product.id,
      count: product.count + 1,
      color: color,
      name: text,
    };
  };

  return (
    <div className="input-product">
      <div className="container">
        <div className="input-product__wrap">
          <input
            type="text"
            className="input"
            placeholder="Введите название"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleClickEnter(e)}
          />
          <button className="btn" onClick={() => addingItem()}>
            {isUpdatedItem ? "Изменить" : "Добавить"}
          </button>
          <InputColorList activeColor={color} setColor={setColor} />
          {isUpdatedItem && (
            <span className="icon icon-close" onClick={() => handleClickClose()}></span>
          )}
        </div>
        <InputNameProductList inputValue={input} setProduct={setProduct} />
      </div>
    </div>
  );
};
