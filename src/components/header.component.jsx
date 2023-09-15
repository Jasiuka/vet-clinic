import { useLocation } from "react-router-dom";
import LocationIcon from "./icon-components/location-icon.component";
import EmailIcon from "./icon-components/email-icon.component";
import ClockIcon from "./icon-components/clock-icon.component";
import PhoneIcon from "./icon-components/phone-icon.component";
export const Header = () => {
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
              <LocationIcon />
              Sukilėlių pr. 20, 50157 Kaunas
            </p>
            <p>
              <ClockIcon />
              08:00 - 20:00
            </p>
          </div>
          <div className="header-top-side">
            <p>
              <PhoneIcon />
              +37063297569
            </p>
            <p>
              <EmailIcon />
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
                <a className="header__link-cta cta" href="#">
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
