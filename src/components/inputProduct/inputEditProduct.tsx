import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { IDataProducts } from "../../types/productsTypes.ts";
import { setEdit } from "../../store/slices/input.slice.ts";
import { setEditProductItem, setProductItem } from "../../store/slices/products.slice.ts";
import { setEditItem } from "../../store/slices/items.slice.ts";
import { IDataItems } from "../../types/itemsTypes.ts";

export const InputEditProduct = () => {
  const { idEdit: id } = useAppSelector((state) => state.inputSlice);
  const { items } = useAppSelector((state) => state.itemsSlice);
  const { products } = useAppSelector((state) => state.productsSlice);
  const dispatch = useAppDispatch();
  const editItem = items.find((item) => item.id === id);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const defaultEditParam = {
    inputEdit: false,
    idEdit: 0,
  };

  useEffect(() => {
    if (editItem) {
      setInput(editItem.text);
      setColor(editItem.color);
    }
  }, [editItem]);

  const addItem = () => {
    if (input.trim()) {
      let newText = input.replace(/\s+/g, " ");
      newText = newText.trim();
      let newItem = { ...editItem, text: newText, color: color };

      const newProduct = {
        id: new Date().getTime(),
        count: 1,
        color: color,
        name: newText,
      };

      dispatch(setEditItem(newItem as IDataItems));
      dispatch(setEdit(defaultEditParam));
      compareInputProduct()
        ? dispatch(
            setEditProductItem({
              id: idEditProduct(),
              item: editProduct(newText),
            }),
          )
        : dispatch(setProductItem(newProduct));
    } else {
      dispatch(setEdit(defaultEditParam));
    }
  };

  const handleClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      addItem();
    }
  };

  const handleClickClose = () => {
    dispatch(setEdit(defaultEditParam));
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
  const compareInputProduct = () => {
    const product = products.filter((a) => a.name === input);
    return product.length !== 0;
  };

  // id сохраненного названия продукта
  const idEditProduct = (): number => {
    const product = products.filter((a) => a.name === input);
    return product[0].id;
  };

  // Изменение объекта сохраненного названия продукта
  const editProduct = (text: string): IDataProducts => {
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
        <div className="input-product-wrap">
          <input
            type="text"
            className="input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleClickEnter(e)}
          />
          <button className="btn" onClick={() => addItem()}>
            Изменить
          </button>
          {/*<InputColorList set={setColor} color={color}/>*/}
          <span className="icon icon-close" onClick={() => handleClickClose()}></span>
        </div>
        {/*<InputNameProductList input={input} setProduct={setProduct}/>*/}
      </div>
    </div>
  );
};
