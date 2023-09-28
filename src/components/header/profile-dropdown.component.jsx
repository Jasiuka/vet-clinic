import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ProfileDropdown = ({ userEmail, isOpen, handleDropdownClick }) => {
  return (
    <span className="profile-dropdown" onClick={handleDropdownClick}>
      <span>Mano profilis</span>
      <div className={`profile-dropdown__inner ${isOpen && "dropdown-open"} `}>
        <p>{userEmail}</p>
        <Link to={"/augintiniai"}>Mano augintiniai</Link>
        <Link to={"/nustatymai"}>Nustatymai</Link>
        <button>Atsijungti</button>
      </div>
    </span>
  );
};

ProfileDropdown.propTypes = {
  userEmail: PropTypes.string,
  isOpen: PropTypes.bool,
  handleDropdownClick: PropTypes.func,
};
export default ProfileDropdown;
