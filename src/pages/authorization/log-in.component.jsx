export const Login = () => {
  return (
    <div className="authorization__login">
      <h4>Prisijungti</h4>
      <form className="authorization__login-form">
        <label htmlFor="login-email--input">El. Paštas</label>
        <input id="login-email--input" />
        <label htmlFor="login-pass--input">Slaptažodis</label>
        <input id="login-pass--input" />
        <button type="submit">Prisijungti</button>
        <button>Google prisijungimas</button>
        <button>Facebook prisijungimas</button>
      </form>
    </div>
  );
};

export default Login;
