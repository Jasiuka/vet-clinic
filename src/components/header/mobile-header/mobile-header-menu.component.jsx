import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const MobileMenu = ({ isMenuOpen }) => {
  return (
    <div
      className={`header-mobile__menu ${
        isMenuOpen && "header-mobile__menu--open"
      }`}
    >
      <ul>
        <li>
          <Link>Pagrindinis</Link>
        </li>
        <li>
          <div></div>
        </li>
        <li>Something Also</li>
        <li>Somethingss</li>
      </ul>
    </div>
  );
};
MobileMenu.propTypes = {
  isMenuOpen: PropTypes.bool,
};
export default MobileMenu;
