import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProfileDropdown = ({ isOpen, handleDropdownClick, role }) => {
  const loggedUserButtonNames = {
    1: "Administratorius",
    2: "Mano profilis",
    3: "Gydytojas",
  };
  const navigate = useNavigate();

  const getUserButtonName = (userRole = null) => {
    if (userRole) {
      return loggedUserButtonNames[userRole];
    }
  };

  const handleLogout = async () => {
    const response = await fetch("/logout");
    if (response.status === 200) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } else {
      alert("Klaida! Nepavyko atsijungti.");
    }
  };

  return (
    <li>
      <div
        className="profile-dropdown profile-dropdown-button"
        onClick={handleDropdownClick}
      >
        <span style={{ color: isOpen ? "#f9a8c5" : "" }}>
          {getUserButtonName(role)}
        </span>
        <div
          className={`profile-dropdown__content ${isOpen && "dropdown-open"} `}
        >
          {role === 1 ? (
            <>
              <Link to={"/valdymas"}>Valdymas</Link>
            </>
          ) : role === 3 ? (
            <>
              <Link to={"/gydytojas/vizitai"}>Vizitai</Link>
            </>
          ) : (
            <>
              <Link to={"/mano-augintiniai"}>Mano augintiniai</Link>
              <Link to={"/uzsakymai"}>Mano užsakymai</Link>
            </>
          )}
          <button onClick={handleLogout}>Atsijungti</button>
        </div>
      </div>
    </li>
  );
};

ProfileDropdown.propTypes = {
  userEmail: PropTypes.string,
  isOpen: PropTypes.bool,
  handleDropdownClick: PropTypes.func,
  role: PropTypes.number,
};
export default ProfileDropdown;
