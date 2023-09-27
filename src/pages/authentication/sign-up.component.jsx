import FormInputBox from "./form-input-box.component";
import PropTypes from "prop-types";
export const SignupForm = ({ handleOnSubmit }) => {
  return (
    <form
      className="authentication__form-login authentication__form signup-level-1"
      name="signupLevel_1"
      onSubmit={(e) => handleOnSubmit(e)}
    >
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
        inputId={"signup-email"}
        inputType={"tel"}
        inputName={"phone"}
      />
      <button
        type="submit"
        // onClick={(e) => handleLevelChange(e, true)}
        className="form-button"
      >
        Toliau &rarr;
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
