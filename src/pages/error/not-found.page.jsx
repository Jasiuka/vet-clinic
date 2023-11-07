import "./not-found.style.css";
import { Link } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <main className="not-found">
      <img src="assets/not-found.png" />
      <div className="not-found-wrapper">
        <h1>Klaida 404!</h1>
        <h1>Atsiprašome, tačiau toks puslapis nerastas</h1>
        <Link className="not-found-back" to={"/"}>
          Grįžti į pagrindinį
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
