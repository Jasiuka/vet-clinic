import { useState } from "react";
import "./auth.style.css";
import LoginForm from "./log-in.component";
import SignupForm from "./sign-up.component";
import { useSearchParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

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
      name: "Username",
      review: null,
    };

    getUserData(userObject);
    navigate("/");
  };
  // Redux

  const [searchParams, setSearchParams] = useSearchParams({
    form: false,
  });
  const form = searchParams.get("form") !== "reg";
  const [userSignupData, setUserSignupData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleFormChange = () => {
    setSearchParams((prev) => {
      prev.set("form", "reg");
      return prev;
    });
  };

  const handleSignupLevel1Submit = (event) => {
    event.preventDefault();
    const form = event.target;

    console.log({
      name: form.name.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      email: form.email.value,
      password: form.password.value,
    });

    setUserSignupData({
      name: form.name.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      email: form.email.value,
      password: form.password.value,
    });
  };

  return (
    <div className="authentication">
      <img
        className="authentication--img"
        src="../../../src/assets/catsa2.webp"
      />
      <div className="authentication__container">
        <Link to={"/"}>
          <img
            className="authentication--logo"
            src="../../../src/assets/vetlogo.webp"
          />
        </Link>
        <h3 className="authentication__form--heading">
          {form ? "Prisijungimas" : "Registracija"}
        </h3>
        {form ? (
          <LoginForm
            handleFormchange={handleFormChange}
            handleLogin={handleLogin}
          />
        ) : (
          <SignupForm handleOnSubmit={handleSignupLevel1Submit} />
        )}
      </div>
    </div>
  );
};

export default AuthenticationPage;
