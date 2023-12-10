import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signup-success.style.css";
export const SignupSuccess = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  if (!email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    navigate("/");
  }
  return (
    <main>
      <h1 className="page-heading">Registracija sėkminga</h1>
      <div className="signup-success-inner">
        <h2>
          Jūsų registracija sėkminga. Jums išsiuntėme el. laišką jūsų nurodytu
          paštu <span className="italic">{email}</span> su patvirtinimo nuorodą.
        </h2>
        <p>
          Paspaudę nuorodą mūsų atsiųstame laiške, patvirtinsite savo profilį ir
          tada galėsite prisijungti.
        </p>
        <p className="important-text">
          Jei el. laiško nematote, patikrinkite spam skiltį.
        </p>
        <Link to={"/"} className="pink-button">
          Grįžti į pagrindinį
        </Link>
      </div>
    </main>
  );
};

export default SignupSuccess;
