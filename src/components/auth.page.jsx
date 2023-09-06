import Login from "./log-in.component";
import Signup from "./sign-up.component";

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
