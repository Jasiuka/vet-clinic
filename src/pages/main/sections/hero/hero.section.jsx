// import { Header } from "./header.component";
import "./hero.style.css";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="hero">
      <h1 className="for-observer">
        Sveikos letenėlės - laimingos letenėlės<span>!</span>
      </h1>
      <p>
        Jūsų pasitikėjimas, mūsų įsipareigojimas - tai, kas skatina mus būti
        moderniausia veterinarine klinika jūsų mieste
      </p>
      <Link className="booking-btn">Registracija vizitui</Link>
    </section>
  );
};

export default Hero;
