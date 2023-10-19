import PawIcon from "../../../pages/main/sections/reviews/paw-icon";
import PropTypes from "prop-types";
export const MobileBackground = ({ isMenuOpen }) => {
  return (
    <div
      className={`header-mobile__background ${
        isMenuOpen && "header-mobile__background--open"
      } `}
    >
      <div
        className={`header-mobile__background-block block-left ${
          isMenuOpen && "move-blocks"
        }`}
      >
        <PawIcon
          isActive={false}
          uniqueClassName={"paw-mobile-left paw-mobile"}
        />
      </div>
      <div
        className={`header-mobile__background-block block-right ${
          isMenuOpen && "move-blocks"
        }`}
      >
        <PawIcon
          isActive={false}
          uniqueClassName={"paw-mobile-right paw-mobile"}
        />
      </div>
      <div
        className={`header-mobile__background-block block-left ${
          isMenuOpen && "move-blocks"
        }`}
      >
        <PawIcon
          isActive={false}
          uniqueClassName={"paw-mobile-left paw-mobile"}
        />
      </div>
      <div
        className={`header-mobile__background-block block-right ${
          isMenuOpen && "move-blocks"
        }`}
      >
        <PawIcon
          isActive={false}
          uniqueClassName={"paw-mobile-right paw-mobile"}
        />
      </div>
    </div>
  );
};
MobileBackground.propTypes = {
  isMenuOpen: PropTypes.bool,
};
export default MobileBackground;
