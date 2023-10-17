import { Link } from "react-router-dom";
import AuthFacebookIcon from "./facebook-icon";
import AuthGoogleIcon from "./google-icon";
import FormInputBox from "../../components/form-input-box.component";
import PropTypes from "prop-types";

export const LoginForm = ({ handleFormchange, handleLogin }) => {
  return (
    <form
      className="authentication__form-login authentication__form login-form"
      onSubmit={(e) => handleLogin(e)}
    >
      <FormInputBox
        label={"El.Paštas"}
        inputId={"login-email"}
        inputType={"email"}
      />
      <FormInputBox
        label={"Slaptažodis"}
        inputId={"login-pass"}
        inputType={"password"}
      />
      <button type="submit" className="form-button pink-button">
        Prisijungti
      </button>
      <Link className="form-button-forgot form-link">
        Pamiršau slaptažodį..
      </Link>

      <div className="form-container form-container-no-profile">
        <p>Neturi profilio?</p>
        <Link onClick={handleFormchange} className="form-link">
          Registruokis
        </Link>
      </div>
      <div className="form-container-social-login">
        <button>
          <AuthGoogleIcon />
          <span>Prisijungti su Google</span>
        </button>
        <button>
          <AuthFacebookIcon />
          <span>Prisijungti su Facebook</span>
        </button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  handleFormchange: PropTypes.func,
  handleLogin: PropTypes.func,
};

export default LoginForm;
