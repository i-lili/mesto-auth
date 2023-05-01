import React from "react";
import headerLogo from "../images/header-logo.svg";

function Header() {
  // Возвращает JSX разметку компонента Header
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
    </header>
  );
}

export default Header;
