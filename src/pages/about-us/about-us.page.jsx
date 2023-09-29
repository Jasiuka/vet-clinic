import "./about-us.style.css";
export const AboutUsPage = () => {
  return (
    <main className="about-us">
      <h2 className="page-heading for-observer">Apie mus</h2>
      <div className="about-us__inner">
        <h1 className="about-us__heading">
          Kiekviena letenėlė nusipelno meilės ir rūpesčio
        </h1>
        <p className="about-us__main-text">
          Veterinarijos klinika „Laimingos letenėlės" yra moderni ir jau nuo
          2010 metų veikianti veterinarinė įstaiga, kuri puoselėja aukštus
          standartus gyvūnų sveikatos priežiūroje. Klinikoje aktyviai taikomos
          naujausios veterinarinės technologijos, o komanda sudaryta iš aukštos
          kvalifikacijos veterinarų, kurie rūpinasi kiekviena gyvūno sveikata.
          „Laimingos letenėlės" veterinarijos klinika yra vietinės bendruomenės
          patikimas partneris, teikiantis profesionalesnę veterinarinę priežiūrą
          jūsų augintiniams.
          <p>
            Klinikos tikslas yra užtikrinti jūsų augintinių gerovę ir sveikatą,
            todėl paslaugos visada individualizuojamos atsižvelgiant į jūsų
            augintinio specifinius poreikius. Klinikos patalpose rasite
            šiuolaikišką įrangą ir prietaisus, skirtus diagnozuoti ir gydyti
            įvairias veterinarines bėdas. Klinikos aplinka sukurta su šiltu ir
            draugišku dizainu, siekiant užtikrinti jūsų augintinių patogumą ir
            ramybę.
          </p>
          <p>
            „Laimingos letenėlės" klinikos tikslas yra suteikti aukščiausios
            kokybės veterinarinę priežiūrą bei patarimus, padėti jūsų
            augintiniams gyventi ilgą, sveiką ir laimingą gyvenimą. Klinikos
            komanda visada pasiruošusi atsakyti į bet kokius gyvūno sveikatos
            klausimus, todėl galite kreiptis į juos su pasitikėjimu.
          </p>
        </p>
        <div className="about-us__vision">
          <h3 className="about-us__vision-heading">Mūsų vizija</h3>
          <p className="about-us__vision-text">
            Mes siekiame tapti jūsų gyvūno gerovės patikimais globėjais ir
            draugais. Mūsų svarbiausia misija yra suteikti aukščiausio lygio
            veterinarinę priežiūrą ir paslaugas, kurios padės jūsų augintiniui
            gyventi ilgą, laimingą ir sveiką gyvenimą. Mes stengiamės
            užtikrinti, kad jūsų augintinis visada jaustųsi mylimas ir sveikas.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
