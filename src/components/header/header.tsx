import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { toggleTheme } from "../../store/slices/theme.slice.ts";
import logo from "../../assets/logo.png";

export const Header = () => {
  const { themeDark } = useAppSelector((state) => state.themeSlice);
  const dispatch = useAppDispatch();

  const handleClickTheme = () => {
    dispatch(toggleTheme());
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
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <div className="header-logo">
            <img src={logo} alt="logo"/>
          </div>
          <div className="header-title">Купи хлеб</div>
          <button className="header-theme__btn" onClick={() => handleClickTheme()}></button>
        </div>
      </div>
    </header>
  );
};
