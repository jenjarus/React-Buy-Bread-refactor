import { FC } from "react";
import classNames from "classnames";

interface IProps {
  name: string;
  active: string;
  set: (name: string) => void;
}

export const InputColorItem: FC<IProps> = ({ name, active, set }) => {
  const classColorBtn = classNames("color-item", name, {
    active: active === name,
  });

  return <button className={classColorBtn} onClick={() => set(name)}></button>;
};
