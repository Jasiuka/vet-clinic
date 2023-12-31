import { useState } from "react";
import FormInputBox from "../../components/form-input-box.component";
import { useForgotPasswordMutation } from "../../services/api-slice";

export const ForgotPassword = () => {
  const [forgot, { isSuccess }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    forgot({ email });
    setEnteredEmail(email);
  };

  const setUserEmail = (inputVal) => {
    setEmail(inputVal);
  };
  return (
    <>
      <form className="forgot-form" onSubmit={(event) => submitForm(event)}>
        <p className="forgot-paragraph">
          Jei pamiršote savo slaptažodį, įrašykite savo El. pašto adresą, jei
          vartotojas su tokiu el. Paštu užregistruotas, atsiųsime jum nuorodą su
          naujo slaptažodžio pakeitimu
        </p>
        {isSuccess && (
          <p className="forgot-success">
            Nuoroda su slaptažodžio pakeitimu išsiųsta į {enteredEmail} el.
            pašto adresą.
          </p>
        )}

        <FormInputBox
          label={"El. Paštas"}
          inputType={"email"}
          inputName={"forgot_email"}
          inputId={"forgot_email"}
          parentSetter={setUserEmail}
          isRequired={true}
        />
        <button className="pink-button">Siųsti</button>
      </form>
      <button
        type="submit"
        onClick={() => history.back()}
        className="form-button form-button-back"
      >
        &larr; Atgal
      </button>
    </>
  );
};

export default ForgotPassword;
