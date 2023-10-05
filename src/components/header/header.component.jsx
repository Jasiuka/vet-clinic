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

// Redux
import { useSelector } from "react-redux";

export const Header = () => {
  // Redux
  const user = useSelector((state) => state.user);

  // Redux

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
              src="/src/assets/vetlogo.webp"
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
                <Link
                  className={`header__link ${isLinkInMainPage}`}
                  to="/apie-mus"
                >
                  <span>Apie mus</span>
                </Link>
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
                <Link
                  className={`header__link ${isLinkInMainPage}`}
                  to="/komanda"
                >
                  <span>Komanda</span>
                </Link>
              </li>
              <li className="header__list-item">
                <Link className={`header__link ${isLinkInMainPage}`} to="/duk">
                  <span>D.U.K</span>
                </Link>
              </li>
              <li className="header__list-item">
                <Link
                  className={`header__link ${isLinkInMainPage}`}
                  to="/kontaktai"
                >
                  <span>Kontaktai</span>
                </Link>
              </li>
            </ul>
            <img className="header__paws" src="/src/assets/paws-half.webp" />
            <ul>
              {user ? (
                <ProfileDropdown
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
                <Link
                  className="header__link-booking booking-btn"
                  to="/vizitas"
                >
                  Registracija vizitui
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Scroll to top button */}
      <ScrollToTopButton
        handleScrollToTop={handleScrollToTop}
        isIntersecting={isIntersecting}
      />
    </>
  );
};
