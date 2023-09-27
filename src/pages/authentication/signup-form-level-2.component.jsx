import FormInputBox from "./form-input-box.component";
import PropTypes from "prop-types";

export const SignupFormLevel2 = ({ handleLevelChange, handleOnSubmit }) => {
  return (
    <form
      className="authentication__form-login authentication__form signup-level-2"
      name="signupLevel_2"
      onSubmit={(e) => handleOnSubmit(e)}
    >
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
        inputName={"repeat-pass"}
      />
      <button type="submit" className="form-button">
        Registruotis
      </button>

      <button
        onClick={() => handleLevelChange(false)}
        className="form-button form-button-back"
      >
        &larr; Atgal
      </button>
    </form>
  );
};

SignupFormLevel2.propTypes = {
  handleLevelChange: PropTypes.func,
  handleOnSubmit: PropTypes.func,
};

export default SignupFormLevel2;
