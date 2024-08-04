import { FC } from "react";
import classNames from "classnames";

interface IProps {
  name: string;
  activeName: string;
  setColor: (name: string) => void;
}

export const InputColorItem: FC<IProps> = ({ name, activeName, setColor }) => {
  const classColorBtn = classNames("color-box__item", name, {
    "color-box__item--active": activeName === name,
  });

  return <button className={classColorBtn} onClick={() => setColor(name)}></button>;
};
