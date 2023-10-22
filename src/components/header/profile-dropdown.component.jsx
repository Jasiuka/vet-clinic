import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ProfileDropdown = ({ isOpen, handleDropdownClick, isAdmin }) => {
  return (
    <li>
      <div
        className="profile-dropdown profile-dropdown-button"
        onClick={handleDropdownClick}
      >
        <span style={{ color: isOpen ? "#f9a8c5" : "" }}>Mano profilis</span>
        <div
          className={`profile-dropdown__content ${isOpen && "dropdown-open"} `}
        >
          {isAdmin === 1 ? (
            <>
              <Link to={"/valdymas"}>Valdymas</Link>
            </>
          ) : (
            <>
              <Link to={"/mano-augintiniai"}>Mano augintiniai</Link>
            </>
          )}
          <button>Atsijungti</button>
        </div>
      </div>
    </li>
  );
};

ProfileDropdown.propTypes = {
  userEmail: PropTypes.string,
  isOpen: PropTypes.bool,
  handleDropdownClick: PropTypes.func,
  isAdmin: PropTypes.number,
};
export default ProfileDropdown;
