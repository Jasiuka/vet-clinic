import { useState } from "react";
import MobileBackground from "./mobile-header-background.component";
import MobileMenu from "./mobile-header-menu.component";
export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={handleMenuToggle}
        className={`header-mobile__button ${
          isMenuOpen && "header-mobile__button--open"
        }`}
      >
        <div
          className={`header-mobile__button-line line-top ${
            isMenuOpen && "top-rotate"
          }`}
        ></div>
        <div
          className={`header-mobile__button-line line-center ${
            isMenuOpen && "center-remove"
          }`}
        ></div>
        <div
          className={`header-mobile__button-line line-bottom ${
            isMenuOpen && "bottom-rotate"
          }`}
        ></div>
      </button>
      <div className={`header-mobile ${isMenuOpen && "header-mobile-open"}`}>
        <MobileMenu isMenuOpen={isMenuOpen} />
        <MobileBackground isMenuOpen={isMenuOpen} />
      </div>
    </>
  );
};

export default MobileHeader;
