import FormInputBox from "../../components/form-input-box.component";
import { useSignupMutation } from "../../services/api-slice";

export const SignupForm = () => {
  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const lastName = form.lastName.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const password = form.password.value;
    const repeatedPassword = form.repeatPass.value;

    const userObject = {
      name,
      lastName,
      phone,
      email,
      password,
    };

    signup(userObject);
  };

  return (
    <form
      className="authentication__form-login authentication__form signup-form"
      name="signupForm"
      onSubmit={(e) => handleSubmit(e)}
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

export default SignupForm;
