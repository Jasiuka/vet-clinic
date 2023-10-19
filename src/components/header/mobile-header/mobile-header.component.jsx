import { useEffect, useState } from "react";
import MobileBackground from "./mobile-header-background.component";
import MobileMenu from "./mobile-header-menu.component";
import { useLocation } from "react-router-dom";
import "./mobile-header.style.css";
export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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
      <MobileMenu isMenuOpen={isMenuOpen} />
      <MobileBackground isMenuOpen={isMenuOpen} />
    </>
  );
};

export default MobileHeader;
