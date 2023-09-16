import { Link } from "react-router-dom";
import LocationIcon from "./icon-components/location-icon.component";
import PhoneIcon from "./icon-components/phone-icon.component";
import EmailIcon from "./icon-components/email-icon.component";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__contacts footer__box">
          <h5 className="footer__box-heading">Kontaktai</h5>
          <p className="footer__contacts-item">
            <LocationIcon className={"footer__icon"} />
            Sukilėlių pr. 20, 50157 Kaunas
          </p>
          <p className="footer__contacts-item">
            <PhoneIcon className={"footer__icon"} />
            +37063297569
          </p>
          <p className="footer__contacts-item">
            <EmailIcon className={"footer__icon"} />
            info@laimingoslet.lt
          </p>
        </div>
        <div className="footer__navigation footer__box">
          <h5 className="footer__box-heading">Navigacija</h5>
          <ul>
            <li>
              <Link className="footer__navigation-link" to={"/apie-mus"}>
                Apie mus
              </Link>
            </li>
            <li>
              <Link className="footer__navigation-link" to={"/paslaugos"}>
                Paslaugos
              </Link>
            </li>
            <li>
              <Link className="footer__navigation-link" to={"/komanda"}>
                Komanda
              </Link>
            </li>
            <li>
              <Link className="footer__navigation-link" to={"/duk"}>
                D.U.K
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__box footer__props">
          <h5 className="footer__box-heading">Rekvizitai</h5>
          <p>UAB „VET LETENELES“</p>
          <p>Įmonės kodas 313805282</p>
          <p>Sukilėlių pr. 20, 50157 Kaunas</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© LAIMINGOS LETENĖLĖS visos teisės saugomos 2023</p>
        <div>
          <Link>Privatumo politika</Link>
          <Link>Terminai</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
