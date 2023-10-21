import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
export const MobileMenu = ({ isMenuOpen }) => {
  return (
    <div
      className={`header-mobile__menu ${
        isMenuOpen && "header-mobile__menu--open"
      }`}
    >
      <ul className="list">
        <li className="list-item">
          <Link to={"prisijungti"} className="list-link">
            Prisijungti
          </Link>
        </li>
        <li className="list-item">
          <Link className="list-link" to={"/"}>
            Pagrindinis
          </Link>
        </li>
        <li className="list-item">
          <div className="list-link">
            Klinika
            <div>
              <Link className="list-link" to={"/apie-mus"}>
                &mdash; Apie mus
              </Link>
              <Link className="list-link" to={"/komanda"}>
                &mdash; Komanda
              </Link>
              <Link className="list-link" to={"/kontaktai"}>
                &mdash; Kontaktai
              </Link>
            </div>
          </div>
        </li>
        <li className="list-item">
          <Link to={"/paslaugos"} className="list-link">
            Paslaugos
          </Link>
        </li>
        <li className="list-item">
          <Link to={"/duk"} className="list-link">
            DUK
          </Link>
        </li>

        <li className="list-item">
          <Link to={"/vizitas"} className="list-link list-booking pink-button">
            Registracija vizitui
          </Link>
        </li>
        <li className="list-item">
          <Link to={"/parduotuve"} className="list-link">
            El.Parduotuvė
          </Link>
        </li>
      </ul>
      <CartDropdown isCartOpen={true} />
    </div>
  );
};
MobileMenu.propTypes = {
  isMenuOpen: PropTypes.bool,
};
export default MobileMenu;
