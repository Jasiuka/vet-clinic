import { useLocation } from "react-router-dom";
import LocationIcon from "./icon-components/location-icon.component";
import EmailIcon from "./icon-components/email-icon.component";
import ClockIcon from "./icon-components/clock-icon.component";
import PhoneIcon from "./icon-components/phone-icon.component";
import { useEffect } from "react";
export const Header = () => {
  useEffect(() => {
    const targetElement = document.querySelector(".for-observer");
    const header = document.querySelector(".header");
    const headerLogo = document.querySelector(".header__logo");
    const headerTop = document.querySelector(".header-top");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    if (!targetElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        headerTop.classList.remove("hide-top");
        header.classList.remove("sticky");
        headerLogo.classList.remove("header__logo-smaller");
      } else {
        headerTop.classList.add("hide-top");
        header.classList.add("sticky");
        headerLogo.classList.add("header__logo-smaller");
      }
    }, options);

    observer.observe(targetElement);

    return () => observer.unobserve(targetElement);
  }, []);

  const location = useLocation();

  const isMainPage = location.pathname === "/";

  const isLinkInMainPage = isMainPage ? "" : "header__link-not-main";
  const isHeaderInMainPage = isMainPage ? "" : "header-not-main";

  return (
    <>
      <header className={`header ${isHeaderInMainPage}`}>
        <div className="header-top">
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
          <a className="header__logo-link" href="/">
            <img
              className="header__logo"
              src="/src/assets/vet-logo.png"
              alt="Veterinary clinic logo"
            ></img>
          </a>
          <nav>
            <ul>
              <li className="header__list-item">
                <a className={`header__link ${isLinkInMainPage}`} href="/">
                  <span>Pradinis</span>
                </a>
              </li>
              <li className="header__list-item">
                <a
                  className={`header__link ${isLinkInMainPage}`}
                  href="/apie-mus"
                >
                  <span>Apie mus</span>
                </a>
              </li>
              <li className="header__list-item">
                <a
                  className={`header__link ${isLinkInMainPage}`}
                  href="/paslaugos"
                >
                  <span>Paslaugos</span>
                </a>
              </li>
              <li className="header__list-item">
                <a
                  className={`header__link ${isLinkInMainPage}`}
                  href="/komanda"
                >
                  <span>Komanda</span>
                </a>
              </li>
              <li className="header__list-item">
                <a className={`header__link ${isLinkInMainPage}`} href="/duk">
                  <span>D.U.K</span>
                </a>
              </li>
              <li className="header__list-item">
                <a
                  className={`header__link ${isLinkInMainPage}`}
                  href="/kontaktai"
                >
                  <span>Kontaktai</span>
                </a>
              </li>
            </ul>
            <img className="header__paws" src="/src/assets/paws-half.png" />
            <ul>
              <li className="header__list-item">
                <a
                  className={`header__link ${isLinkInMainPage}`}
                  href="/prisijungti"
                >
                  <span>Prisijungti</span>
                </a>
              </li>
              <li>
                <a className="header__link-booking booking-btn" href="#">
                  Registracija vizitui
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
