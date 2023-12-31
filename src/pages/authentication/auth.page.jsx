import { useState } from "react";
import "./auth.style.css";
import LoginForm from "./log-in.component";
import SignupForm from "./sign-up.component";
import { useSearchParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../services/api-slice";

// Redux
import { useDispatch } from "react-redux";
import { get } from "../../store/slices/user-slice";
import Spinner from "../../components/spinner.component";
import NotificationsList from "../../components/notifications/notificationsList.component";
import useCreateNotification from "../../utils/hooks/createNotification.hook";
import ForgotPassword from "./forgot-pass.component";
export const AuthenticationPage = () => {
  // Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { createNotification } = useCreateNotification();

  const getUserData = (object) => dispatch(get(object));

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form["login-email"].value;
    const password = form["login-pass"].value;

    const loginCredentials = {
      email: email,
      password: password,
    };

    login(loginCredentials).then((response) => {
      if (response.error) {
        setError(response.error);
        const { message, type } = response.error.data;
        createNotification(message, type);
      } else {
        getUserData(response.data);
        navigate("/");
      }
    });
  };
  // Redux

  const [searchParams, setSearchParams] = useSearchParams({ form: "login" });
  const loginForm =
    searchParams.get("form") === "login" ||
    (searchParams.get("form") !== "signup" &&
      searchParams.get("form") !== "forgot");
  const forgotForm = searchParams.get("form") === "forgot";
  const signupForm = searchParams.get("form") === "signup";

  const handleFormChange = (formType) => {
    setSearchParams({ form: formType });
  };

  return (
    <>
      <NotificationsList />
      <div className="authentication">
        {isLoading && <Spinner message={"Prijungiama.."} />}
        <img className="authentication--img" src="/assets/catsa2.webp" />
        <div className="authentication__container">
          <Link to={"/"}>
            <img className="authentication--logo" src="/assets/vetlogo.webp" />
          </Link>
          <h3 className="authentication__form--heading">
            {loginForm
              ? "Prisijungimas"
              : signupForm
              ? "Registracija"
              : "Pamiršau slaptažodį"}
          </h3>

          {loginForm && (
            <LoginForm
              handleFormchange={handleFormChange}
              handleLogin={handleLogin}
              isLoginFailed={error}
            />
          )}
          {signupForm && <SignupForm />}
          {forgotForm && <ForgotPassword />}
        </div>
      </div>
    </>
  );
};

export default AuthenticationPage;
