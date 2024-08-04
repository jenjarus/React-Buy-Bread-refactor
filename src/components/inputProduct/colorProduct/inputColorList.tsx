import { FC } from "react";
import classNames from "classnames";
import { InputColorItem } from "./inputColorItem.tsx";

interface IProps {
  setColor: (name: string) => void;
  activeColor: string;
}

export const InputColorList: FC<IProps> = ({ setColor, activeColor }) => {
  const colorNameItem: string[] = ["transparent", "yellow", "red", "blue", "green", "orange"];
  const classColorBtn = classNames("color-btn", activeColor);

  return (
    <div className="color-box">
      <button className={classColorBtn}></button>
      <div className="color-dropdown">
        {colorNameItem.map((el) => (
          <InputColorItem key={el} name={el} setColor={setColor} activeName={activeColor} />
        ))}
      </div>
    </div>
  );
};
