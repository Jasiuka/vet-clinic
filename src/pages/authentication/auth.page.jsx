import Login from "./log-in.component";
import Signup from "./sign-up.component";
import "./auth.style.css";

export const AuthenticationPage = () => {
  return (
    <div className="authentication">
      <div className="authentication__inner">
        <Login />
        <Signup />
      </div>
    </div>
  );
};

export default AuthenticationPage;
