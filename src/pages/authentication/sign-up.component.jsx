import FormInputBox from "../../components/form-input-box.component";
import { useSignupMutation } from "../../services/api-slice";
import { useNavigate } from "react-router-dom";
import { checkIfAtLeastOneInputHasNoValue } from "../../utils/helper-fncs";
import useCreateNotification from "../../utils/hooks/createNotification.hook";
import Spinner from "../../components/spinner.component";
export const SignupForm = () => {
  const [signup, { isLoading, isSuccess }] = useSignupMutation();
  const navigate = useNavigate();
  const { createNotification } = useCreateNotification();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const lastName = form.lastName.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const password = form.password.value;
    const repeatedPassword = form.repeatPass.value;

    // VALIDATION
    const allInputs = Array.from(form.elements);
    if (checkIfAtLeastOneInputHasNoValue(allInputs)) {
      createNotification("Visi laukai privalo būti užpildyti!", "error");
      return;
    }
    if (password !== repeatedPassword) {
      createNotification("Slaptažodžiai nesutampa!", "error");
      return;
    }

    const userObject = {
      name,
      lastName,
      phone,
      email,
      password,
      repeatedPassword,
    };

    signup(userObject).then((response) => {
      if (response.error) {
        const { message, type } = response.error.data;
        createNotification(message, type);
      } else {
        navigate(`/registracijos-patvirtinimas/${email}`);
      }
    });
  };

  return (
    <>
      {isLoading && <Spinner message={"Kraunama.."} />}
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
        <button type="submit" className="form-button" disabled={isLoading}>
          Registruotis
        </button>

        <button
          type="button"
          onClick={() => history.back()}
          className="form-button form-button-back"
        >
          &larr; Atgal
        </button>
      </form>
    </>
  );
};

export default SignupForm;
