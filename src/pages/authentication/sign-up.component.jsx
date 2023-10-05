import FormInputBox from "./form-input-box.component";
import PropTypes from "prop-types";
export const SignupForm = ({ handleOnSubmit }) => {
  return (
    <form
      className="authentication__form-login authentication__form signup-form"
      name="signupForm"
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <div className="signup-form--left">
        <FormInputBox
          label={"Vardas"}
          inputId={"signup-name"}
          inputType={"text"}
          inputName={"name"}
        />
        <FormInputBox
          label={"Pavardė"}
          inputId={"signup-last-name"}
          inputType={"text"}
          inputName={"lastName"}
        />
        <FormInputBox
          label={"Tel. Numeris"}
          inputId={"signup-phone"}
          inputType={"tel"}
          inputName={"phone"}
        />
      </div>
      <div className="signup-form--right">
        <FormInputBox
          label={"El. Paštas"}
          inputId={"signup-email"}
          inputType={"email"}
          inputName={"email"}
        />
        <FormInputBox
          label={"Slaptažodis"}
          inputId={"signup-pass"}
          inputType={"password"}
          inputName={"password"}
        />
        <FormInputBox
          label={"Pakartokite slaptažodį"}
          inputId={"signup-pass-repeat"}
          inputType={"password"}
          inputName={"repeatPass"}
        />
      </div>
      <button type="submit" className="form-button">
        Registruotis
      </button>

      <button
        onClick={() => history.back()}
        className="form-button form-button-back"
      >
        &larr; Atgal
      </button>
    </form>
  );
};

SignupForm.propTypes = {
  handleLevelChange: PropTypes.func,
  handleOnSubmit: PropTypes.func,
};

export default SignupForm;
