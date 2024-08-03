import { FC } from "react";
import classNames from "classnames";
import { InputColorItem } from "./inputColorItem.tsx";

interface IProps {
  set: (name: string) => void;
  color: string;
}

export const InputColorList: FC<IProps> = ({ set, color }) => {
  const colorNameItem: string[] = ["transparent", "yellow", "red", "blue", "green", "orange"];
  const classColorBtn = classNames("color-btn", color);

  return (
    <div className="color-box">
      <button className={classColorBtn}></button>
      <div className="color-dropdown">
        {colorNameItem.map((el, i) => (
          <InputColorItem key={i} name={el} set={set} active={color} />
        ))}
      </div>
    </div>
  );
};
