export const Header = () => {
  return (
    <>
      <header className="header">
        <a className="header__logo-link" href="/">
          <img
            className="header__logo"
            src="/src/assets/vet-logo.png"
            alt="Veterinary clinic logo"
          ></img>
        </a>
        <nav>
          <ul>
            <li>
              <a className="header__link" href="/">
                <span>Pagrindinis</span>
              </a>
            </li>
            <li>
              <a className="header__link" href="/apie-mus">
                <span>Apie mus</span>
              </a>
            </li>
            <li>
              <a className="header__link" href="#">
                <span>Paslaugos</span>
              </a>
            </li>
            <li>
              <a className="header__link" href="/komanda">
                <span>Komanda</span>
              </a>
            </li>
            <li>
              <a className="header__link" href="#">
                <span>D.U.K</span>
              </a>
            </li>
            <li>
              <a className="header__link" href="#">
                <span>Kontaktai</span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a className="header__link" href="/prisijungimas">
                <span>Prisijungti</span>
              </a>
            </li>
            <li>
              <a href="#">Registracija vizitui</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
