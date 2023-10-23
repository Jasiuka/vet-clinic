import { useLocation } from "react-router-dom";
import LocationIcon from "../icon-components/location-icon.component";
import EmailIcon from "../icon-components/email-icon.component";
import ClockIcon from "../icon-components/clock-icon.component";
import PhoneIcon from "../icon-components/phone-icon.component";
import ScrollToTopButton from "../scrollToTopButton.component";
import ProfileDropdown from "./profile-dropdown.component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./header.style.css";
import CartDropdown from "./cart-dropdown/cart-dropdown.component";
import { setIsCartOpen } from "../../store/cart/cart.reducer";
import MobileHeader from "./mobile-header/mobile-header.component";

// Redux
import { useSelector, useDispatch } from "react-redux";

export const Header = () => {
  // Redux
  const user = useSelector((state) => state.user);
  const itemsInCart = useSelector((state) => state.cart.cartItems.length);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  console.log(user);

  // Redux

  const dispatch = useDispatch();
  const setCartIsOpen = (previous) => dispatch(setIsCartOpen(!previous));
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const bodyElement = document.querySelector("body");

  const observerCallback = (entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const hideProfileDropdownOnClickOutside = (e) => {
    const target = e.target;
    if (!target.closest(".profile-dropdown-button") && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const observerTargetElement = document.querySelector(".for-observer");

    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, options);
    if (observerTargetElement) observer.observe(observerTargetElement);

    bodyElement.addEventListener("click", (e) =>
      hideProfileDropdownOnClickOutside(e)
    );

    return () => {
      if (observerTargetElement) observer.unobserve(observerTargetElement);
      bodyElement.removeEventListener(
        "clcik",
        hideProfileDropdownOnClickOutside
      );
    };
  }, [isIntersecting, isDropdownOpen]);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const location = useLocation();

  const isMainPage = location.pathname === "/";

  const isLinkInMainPage = isMainPage ? "" : "header__link-not-main";
  const isHeaderInMainPage = isMainPage ? "" : "header-not-main";

  return (
    <>
      <header
        className={`header ${isHeaderInMainPage} ${
          isIntersecting ? "" : "sticky"
        } `}
      >
        <div className={`header-top  ${isIntersecting ? "" : "hide-top"}`}>
          <div className="header-top-side">
            <p>
              <LocationIcon className={"header-top__icon"} />
              Sukilėlių pr. 20, 50157 Kaunas
            </p>
            <p>
              <ClockIcon className={"header-top__icon"} />
              08:00 - 20:00
            </p>
          </div>
          <div className="header-top-side">
            <p>
              <PhoneIcon className={"header-top__icon"} />
              +37063297569
            </p>
            <p>
              <EmailIcon className={"header-top__icon"} />
              info@laimingoslet.lt
            </p>
          </div>
        </div>
        <div className="header-bottom">
          <Link className="header__logo-link" to="/">
            <img
              className={`header__logo ${isHeaderInMainPage} ${
                isIntersecting ? "" : "header__logo-smaller"
              }`}
              src="/assets/vetlogo.webp"
              alt="Veterinary clinic logo"
            ></img>
          </Link>
          <nav>
            <ul>
              <li className="header__list-item">
                <Link className={`header__link ${isLinkInMainPage}`} to="/">
                  <span>Pradinis</span>
                </Link>
              </li>
              <li className="header__list-item">
                <div
                  className={`header__link ${isLinkInMainPage} header__link-w-drop`}
                >
                  <span>Klinika</span>
                  <div className="header__link--dropdown">
                    <Link
                      className="header__link--dropdown-item"
                      to={"/apie-mus"}
                    >
                      Apie mus
                    </Link>
                    <Link
                      className="header__link--dropdown-item"
                      to={"/komanda"}
                    >
                      Mūsų komanda
                    </Link>
                    <Link
                      className="header__link--dropdown-item"
                      to={"/kontaktai"}
                    >
                      Kontaktai
                    </Link>
                  </div>
                </div>
              </li>
              <li className="header__list-item">
                <Link
                  className={`header__link ${isLinkInMainPage}`}
                  to="/paslaugos"
                >
                  <span>Paslaugos</span>
                </Link>
              </li>
              <li className="header__list-item">
                <Link className={`header__link ${isLinkInMainPage}`} to="/duk">
                  <span>D.U.K</span>
                </Link>
              </li>
            </ul>
            <img className="header__paws" src="/assets/paws-half.webp" />
            <ul>
              {user ? (
                <ProfileDropdown
                  isAdmin={user.userRole}
                  userEmail={user.email}
                  isOpen={isDropdownOpen}
                  handleDropdownClick={handleDropdownClick}
                />
              ) : (
                <li className="header__list-item">
                  <Link
                    className={`header__link ${isLinkInMainPage}`}
                    to="/prisijungti"
                  >
                    <span>Prisijungti</span>
                  </Link>
                </li>
              )}

              <li>
                <Link className="booking-btn pink-button" to="/vizitas">
                  Registracija vizitui
                </Link>
              </li>
              <li className="header__link__e-shop--container">
                <Link to={"/parduotuve"} className="header__link-shop">
                  El.Parduotuvė
                </Link>

                <div
                  key={"header-cart"}
                  onClick={() => setCartIsOpen(isCartOpen)}
                  className="header__cart"
                >
                  <svg
                    version="1.1"
                    className="cart-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.43 122.88"
                    style={{ enableBackground: "new 0 0 122.43 122.88" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        className="st0"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.63,12.6h93.3c6.1,0,5.77,2.47,5.24,8.77l-3.47,44.23c-0.59,7.05-0.09,5.34-7.56,6.41l-68.62,8.73 l3.63,10.53c29.77,0,44.16,0,73.91,0c1,3.74,2.36,9.83,3.36,14h-12.28l-1.18-4.26c-24.8,0-34.25,0-59.06,0 c-13.55-0.23-12.19,3.44-15.44-8.27L11.18,8.11H0V0h19.61C20.52,3.41,21.78,9.15,22.63,12.6L22.63,12.6z M53.69,103.92 c5.23,0,9.48,4.25,9.48,9.48c0,5.24-4.24,9.48-9.48,9.48c-5.24,0-9.48-4.24-9.48-9.48C44.21,108.17,48.45,103.92,53.69,103.92 L53.69,103.92z M92.79,103.92c5.23,0,9.48,4.25,9.48,9.48c0,5.24-4.25,9.48-9.48,9.48c-5.24,0-9.48-4.24-9.48-9.48 C83.31,108.17,87.55,103.92,92.79,103.92L92.79,103.92z M30.8,43.07H45.9l-5.48-22.91c-5.4,0-10.72-0.01-15.93-0.01l1.84,6.86 L26.39,27L30.8,43.07L30.8,43.07L30.8,43.07z M48.31,20.17l5.48,22.9h14.54l-5.5-22.88L48.31,20.17L48.31,20.17L48.31,20.17z M70.74,20.2l5.5,22.87h13.91l-5.48-22.85L70.74,20.2L70.74,20.2L70.74,20.2z M92.58,20.23l5.48,22.85l13.92,0l1.54-18.36 c0.43-5.12,1.33-4.47-3.63-4.47C104.23,20.24,98.44,20.23,92.58,20.23L92.58,20.23L92.58,20.23z M111.49,48.89H99.45l3.97,16.56 l0.98-0.13c6.07-0.87,5.67,0.52,6.15-5.21L111.49,48.89L111.49,48.89z M95.77,66.5l-4.22-17.61h-13.9l4.67,19.44L95.77,66.5 L95.77,66.5L95.77,66.5z M74.66,69.37l-4.93-20.49l-14.55,0l5.37,22.41L74.66,69.37L74.66,69.37L74.66,69.37z M52.9,72.34 l-5.61-23.45H32.4l6.96,25.3L52.9,72.34L52.9,72.34z"
                      />
                    </g>
                  </svg>
                  {itemsInCart !== 0 && (
                    <span key={itemsInCart}>{itemsInCart}</span>
                  )}
                </div>
                <CartDropdown isCartOpen={isCartOpen} />
              </li>
            </ul>
          </nav>
        </div>
        <MobileHeader />
      </header>
      {/* Scroll to top button */}
      <ScrollToTopButton
        handleScrollToTop={handleScrollToTop}
        isIntersecting={isIntersecting}
      />
    </>
  );
};
