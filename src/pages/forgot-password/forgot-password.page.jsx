import { useEffect, useState } from "react";
import FormInputBox from "../../components/form-input-box.component";
import useCreateNotification from "../../utils/hooks/createNotification.hook";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import "./forgot-password.style.css";
export const ForgotPasswordPage = () => {
  const { createNotification } = useCreateNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const navigate = useNavigate();
  const sCode = searchParams.get("code");

  useEffect(() => {
    fetch(
      "/api/v1/forgot-password?" +
        new URLSearchParams({
          sCode,
        })
    ).then((response) => {
      if (response.status === 400) {
        navigate("/nerastas");
      }
    });
  }, []);

  const changePassword = (inputVal) => {
    setPassword(inputVal);
  };

  const changeRepeatPassword = (inputVal) => {
    setRepeatPass(inputVal);
  };

  const submitForm = (event) => {
    event.preventDefault();
    fetch("/api/v1/forgot-password", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ sCode, password }),
    }).then((response) => {
      if (response.error && response.status === 400) {
        const { message, type } = response.error.data;
        createNotification(message, type);
      }
      if (response.status === 401) {
        navigate("/nerastas");
      }
      if (response.status === 200) {
        setIsResetSuccess(true);
      }
    });
  };
  return (
    <main className="forgot-password">
      <h2 className="page-heading ">Keisti slaptažodį</h2>
      <div className="forgot-password__inner">
        <h4>
          Norėdami pakeisti seną slaptažodį nauju, įrašykite naują slaptažodį.
        </h4>
        {isResetSuccess ? (
          <>
            <h2>
              Jūsų slaptažodis sėkmingai atnaujintas. Dabar galite prisijungti
              prie sistemos su nauju slaptažodžiu.
            </h2>
            <Link to={"/prisijungti"} className="pink-button">
              Prisijungti
            </Link>
          </>
        ) : (
          <form onSubmit={(e) => submitForm(e)}>
            {password !== repeatPass ? (
              <p className="forgot-password__warning">
                Slaptažodžiai nesutampa!
              </p>
            ) : (
              ""
            )}

            <FormInputBox
              label={"Naujas slaptažodis"}
              inputType={"password"}
              inputId={"forgot_new"}
              inputName={"forgot_new"}
              isRequired={true}
              parentSetter={changePassword}
            />
            <FormInputBox
              label={"Pakartoti naują slaptažodį"}
              inputType={"password"}
              inputId={"forgot_new-repeat"}
              inputName={"forgot_new-repeat"}
              isRequired={true}
              parentSetter={changeRepeatPassword}
            />
            <button
              disabled={password !== repeatPass}
              className="pink-button"
              type="submit"
            >
              Atnaujinti
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
