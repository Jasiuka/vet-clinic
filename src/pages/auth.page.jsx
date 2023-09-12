import Login from "../components/log-in.component";
import Signup from "../components/sign-up.component";

export const AuthorizationPage = () => {
  return (
    <div className="authorization">
      <div className="authorization__inner">
        <Login />
        <Signup />
      </div>
    </div>
  );
};

export default AuthorizationPage;
