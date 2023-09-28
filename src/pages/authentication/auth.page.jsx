import { useState } from "react";
import "./auth.style.css";
import LoginForm from "./log-in.component";
import ProgressBar from "./progress-bar.component";
import SignupForm from "./sign-up.component";
import SignupFormLevel2 from "./signup-form-level-2.component";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { get } from "../../store/slices/user-slice";

export const AuthenticationPage = () => {
  // Redux

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getUserData = (object) => dispatch(get(object));

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;

    const userObject = {
      email: form["login-email"].value,
      password: form["login-pass"].value,
    };

    getUserData(userObject);
    navigate("/");
  };
  // Redux

  const [searchParams, setSearchParams] = useSearchParams({
    form: false,
    level: 1,
  });
  const form = searchParams.get("form") !== "reg";
  const level = searchParams.get("level") === "1";
  const [userSignupData, setUserSignupData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleOnSubmitSignup = (e) => {
    e.preventDefault();

    const form = e.target;
    if (e.target.classList.contains("signup-level-1")) {
      setUserSignupData((prev) => {
        return {
          ...prev,
          name: form.name.value,
          lastName: form.lastName.value,
          phone: form.phone.value,
        };
      });
      handleSignupLevelChange(true);
    }
    if (form.name === "signupLevel_2") {
      setUserSignupData((prev) => {
        return {
          ...prev,
          email: form.email.value,
          password: form.password.value,
        };
      });
    }

    console.log(userSignupData);
  };

  const handleFormChange = () => {
    setSearchParams(
      (prev) => {
        prev.set("form", "reg");
        prev.set("level", 1);
        return prev;
      },
      { replace: true }
    );
  };

  const handleSignupLevelChange = (levelUp) => {
    if (levelUp) {
      setSearchParams((prev) => {
        prev.set("level", "2");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("level", "1");
        return prev;
      });
    }
  };

  return (
    <div className="authentication">
      <img
        className="authentication--img"
        src="../../../src/assets/catsa2.webp"
      />
      <div className="authentication__container">
        <img
          className="authentication--logo"
          src="../../../src/assets/vetlogo.webp"
        />
        <h3 className="authentication__form--heading">
          {form ? "Prisijungimas" : "Registracija"}
        </h3>
        {form ? "" : <ProgressBar isFirstLevel={level} />}

        {form ? (
          <LoginForm
            handleFormchange={handleFormChange}
            handleLogin={handleLogin}
          />
        ) : level ? (
          <SignupForm
            handleLevelChange={handleSignupLevelChange}
            handleOnSubmit={handleOnSubmitSignup}
          />
        ) : (
          <SignupFormLevel2
            handleLevelChange={handleSignupLevelChange}
            handleOnSubmit={handleOnSubmitSignup}
          />
        )}
      </div>
    </div>
  );
};

export default AuthenticationPage;
