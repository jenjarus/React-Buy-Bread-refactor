import { useRef, useState, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { addItem } from "../../store/slices/items.slice.ts";
import { updateProduct, addProduct } from "../../store/slices/products.slice.ts";
import { InputColorList, InputNameProductList } from "./";
import { IDataProducts } from "../../types/productsTypes.ts";

export const InputProduct = () => {
  const { products } = useAppSelector((state) => state.productsSlice);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const [color, setColor] = useState("transparent");
  const inputRef = useRef<HTMLInputElement>(null);

  const addingItem = () => {
    let newText = input.replace(/\s+/g, " ");
    newText = newText.trim();

    const newItem = {
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
      dispatch(addItem(newItem));
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
    }
  };

  const handleClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      addingItem();
    }
  };

  // Вставка сохраненного названия продукта
  const setProduct = (id: number) => {
    const product = products.find((el) => el.id === id);
    setInput(product!.name);
    setColor(product!.color);
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
    const product = products.find((a) => a.name === input);
    return {
      id: product!.id,
      count: product!.count + 1,
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
          <button onClick={() => addingItem()} className="btn">
            Добавить
          </button>
          <InputColorList activeColor={color} setColor={setColor} />
        </div>
        <InputNameProductList inputValue={input} setProduct={setProduct} />
      </div>
    </div>
  );
};
