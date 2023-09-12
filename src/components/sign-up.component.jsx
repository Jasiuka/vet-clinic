export const Signup = () => {
  return (
    <div className="authorization__signup">
      <h4>Neturi profilio? Registruokis</h4>
      <form className="authorization__signup-form">
        <label className="form-label" htmlFor="signup-input--name">
          Vardas
        </label>
        <input className="form-input" id="signup-input--name" />
        <label className="form-label" htmlFor="signup-input--last-name">
          Pavardė
        </label>
        <input className="form-input" id="signup-input--last-name" />
        <label className="form-label" htmlFor="signup-input--email">
          El. paštas
        </label>
        <input className="form-input" id="signup-input--email" />
        <label className="form-label" htmlFor="signup-input--password">
          Slaptažodis
        </label>
        <input className="form-input" id="signup-input--password" />
        <label className="form-label" htmlFor="signup-input--repeat-password">
          Pakartoti slaptažodi
        </label>
        <input className="form-input" id="signup-input--repeat-password" />
        <label className="form-label" htmlFor="signup-input--phone">
          Telefono numeris
        </label>
        <input className="form-input" id="signup-input--phone" />
      </form>
    </div>
  );
};

export default Signup;
