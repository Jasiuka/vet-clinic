import WhyUsItem from "../components/why-us-item.component";
import CommunityTrustIcon from "../components/icon-components/why-us-icons/community-trust-icon.component";
import ConvenientLocationIcon from "../components/icon-components/why-us-icons/convenient-location-icon";
import EducationIcon from "../components/icon-components/why-us-icons/education-icon.component";
import EnvironmentIcon from "../components/icon-components/why-us-icons/environment-icon.component";
import EquipmentIcon from "../components/icon-components/why-us-icons/equipment-icon.component";
import PersonalCareIcon from "../components/icon-components/why-us-icons/personal-care-icon.component";
import ServicesIcon from "../components/icon-components/why-us-icons/services-icon.component";
import TeamIcon from "../components/icon-components/why-us-icons/team-icon.component";
export const Why = () => {
  const dataForItems = [
    {
      icon: <TeamIcon />,
      heading: "Profesionali ir atsakinga komanda",
      text: "Mūsų klinika pasižymi aukštos kvalifikacijos veterinarijos gydytojų komanda ir pagalbiniais darbuotojais kurie teikia pirmenybę jūsų augintinio gerovei.",
    },
    {
      icon: <EquipmentIcon />,
      heading: "Nauja ir moderni įranga",
      text: "Mes naudojame pažangiausią veterinarijos įrangą ir technologijas, kad užtikrintume tikslią diagnostiką ir pažangias gydymo procedūras jūsų augintiniui.",
    },
    {
      icon: <PersonalCareIcon />,
      heading: "Asmeninė priežiūra",
      text: "Kiekvienas augintinis yra unikalus, o savo paslaugas pritaikome taip, kad atitiktų konkrečius jūsų pūkuoto šeimos nario poreikius, užtikrindami individualų požiūrį į jų sveikatos priežiūrą.",
    },
    {
      icon: <ServicesIcon />,
      heading: "Visapusiškos paslaugos",
      text: "Nuo profilaktinės priežiūros ir skiepų iki chirurginių procedūrų ir skubios pagalbos paslaugų – jūsų patogumui siūlome platų veterinarinių paslaugų spektrą po vienu stogu.",
    },
    {
      icon: <EnvironmentIcon />,
      heading: "Patogi aplinka",
      text: "Mūsų klinika sukurta atsižvelgiant į jūsų augintinio komfortą, o tai sukuria šiltą ir draugišką atmosferą, kad sumažintų bet kokį nerimą ar stresą jų apsilankymo metu.",
    },
    {
      icon: <CommunityTrustIcon />,
      heading: "Bendruomenės pasitikėjimas",
      text: "Užsitarnavome vietos bendruomenės pasitikėjimą nuolat teikdami aukščiausios kokybės veterinarinę priežiūrą, todėl esame patikimi partneriai jūsų augintinio sveikatos kelyje.",
    },
    {
      icon: <ConvenientLocationIcon />,
      heading: "Patogi lokacija",
      text: "Mūsų klinika yra patogioje vietoje, todėl galite lengvai ir be vargo gauti išskirtinę veterinarinę priežiūrą savo augintiniams.",
    },
    {
      icon: <EducationIcon />,
      heading: "Mokymo ištekliai",
      text: "Esame įsipareigoję šviesti naminių gyvūnėlių savininkus apie atsakingą naminių gyvūnėlių laikymą ir sveikatos priežiūrą, siūlydami vertingus išteklius ir patarimus, kad jūsų augintiniai būtų laimingi ir sveiki.",
    },
  ];

  return (
    <section className="why-us">
      <h2 className="why-us__heading">Kodėl rinktis mus?</h2>
      <div className="why-us__items-container">
        {dataForItems.map((itemData) => {
          return (
            <WhyUsItem
              key={itemData.heading}
              heading={itemData.heading}
              text={itemData.text}
              IconComponent={itemData.icon}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Why;
