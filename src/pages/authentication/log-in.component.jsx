import { Link } from "react-router-dom";
import FormInputBox from "../../components/form-input-box.component";
import PropTypes from "prop-types";

export const LoginForm = ({ handleFormchange, handleLogin, isLoginFailed }) => {
  return (
    <form
      className="authentication__form-login authentication__form login-form"
      onSubmit={(e) => handleLogin(e)}
    >
      {isLoginFailed?.data ? (
        <span className="login-failed">{isLoginFailed?.data}</span>
      ) : (
        ""
      )}
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
    </form>
  );
};

LoginForm.propTypes = {
  handleFormchange: PropTypes.func,
  handleLogin: PropTypes.func,
  isLoginFailed: PropTypes.object,
};

export default LoginForm;
