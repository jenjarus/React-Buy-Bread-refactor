import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { setThemeDark } from "../../store/slices/theme.slice.ts";
import logo from "../../assets/logo.png";

export const Header = () => {
  const { themeDark } = useAppSelector((state) => state.themeSlice);
  const dispatch = useAppDispatch();

  const handleClickTheme = () => {
    dispatch(setThemeDark());
  };

  const handleBodyClassTheme = () => {
    themeDark
      ? document.body.classList.add("theme-dark")
      : document.body.classList.remove("theme-dark");
  };

  useEffect(() => {
    handleBodyClassTheme();
  }, [themeDark]);

  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="title">Купи хлеб</div>
        <button className="theme-btn" onClick={() => handleClickTheme()}></button>
      </div>
    </header>
  );
};
