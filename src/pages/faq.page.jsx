import { useRef, useState } from "react";
import AccordionItem from "../components/accordion.component";
export const FaqPage = () => {
  const accordionRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const accordionData = [
    {
      title: "Kaip susisiekti su veterinarine klinika?",
      text: "Galite susisiekti su mūsų klinika telefonu, elektroniniu paštu arba užpildyti kontaktų formą mūsų tinklalapyje",
      index: 1,
    },
    {
      title: "Kiek kainuoja veterinarinės paslaugos jūsų klinikoje?",
      text: "Mūsų paslaugų kainos priklauso nuo gyvūno rūšies ir būklės. Tiksliai apie kainas galite sužinoti susisiekę su mumis arba peržiūrėjęs mūsų kainų sąrašą tinklalapyje",
      index: 2,
    },
    {
      title: "Ar galite priimti skubius atvejus?",
      text: "Taip, mes priimame skubius atvejus. Skambinkite mums iš anksto, kad galėtumėte gauti greitą pagalbą.",
      index: 3,
    },
    {
      title: "Kokiais laikais veikia jūsų veterinarinė klinika?",
      text: "Mes dirbame ištisus metus ir turime darbo valandas, kurias galite rasti mūsų tinklalapyje",
      index: 4,
    },
    {
      title: "Kaip užregistruoti savo gyvūną pas veterinarą?",
      text: "Galite užregistruoti gyvūną telefonu, elektroniniu paštu arba tiesiog atvykę į kliniką asmeniškai.",
      index: 5,
    },
    {
      title: "Ar reikia iš anksto sudaryti susitikimą pas veterinarą?",
      text: "Rekomenduojame iš anksto sudaryti susitikimą, ypač jei tai ne skubus atvejis. Tačiau priimame ir nesudarytus susitikimus.",
      index: 6,
    },
    {
      title: "Kaip rūpintis gyvūnu po operacijos?",
      text: "Po operacijos suteiksime jums išsamias instrukcijas, kaip rūpintis gyvūnu namuose. Tai apima vaistų vartojimą, laikymo rekomendacijas ir kt",
      index: 7,
    },
    {
      title: "Ar turite priemonių profilaktikai nuo blusų ir erkutės?",
      text: "Taip, mes teikiame profilaktines priemones nuo blusų, erkutės ir kitų parazitų. Pasitarkite su veterinariu, kad pasirinktumėte tinkamą produktą",
      index: 8,
    },
    {
      title: "Kokių vakcinų mano gyvūnas turi reikia?",
      text: "Gyvūno vakcinacijos tvarkaraštį nustato veterinarijos gydytojas pagal gyvūno amžių, būklę ir riziką. Susitarkite su mumis dėl vakcinacijos grafiko",
      index: 9,
    },
    {
      title: "Kaip dažnai reikia atlikti gyvūno profilaktinius patikrinimus?",
      text: "Rekomenduojame atlikti profilaktinius patikrinimus bent kartą per metus, bet tai gali keistis priklausomai nuo gyvūno amžiaus ir sveikatos būklės. Susitarkite su mumis dėl patikrinimo dažnumo",
      index: 10,
    },
  ];

  return (
    <div className="faq">
      <h2 className="page-heading">Dažniausiai užduodami klausimai</h2>
      <div ref={accordionRef} className="accordion">
        {accordionData.map(({ title, text, index }) => {
          return (
            <AccordionItem
              key={index}
              title={title}
              text={text}
              isActive={activeIndex === index}
              clickHandler={
                activeIndex === index
                  ? () => setActiveIndex(0)
                  : () => setActiveIndex(index)
              }
            />
          );
        })}
        {/* <AccordionItem
          isActive={activeIndex === 1}
          title={
            "mattis pellentesque id nibh tortor id aliquet lectus proin nibh"
          }
          text={
            "egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus"
          }
          clickHandler={
            activeIndex === 1
              ? () => setActiveIndex(0)
              : () => setActiveIndex(1)
          }
        />
        <AccordionItem
          isActive={activeIndex === 2}
          title={
            "iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui"
          }
          text={
            "velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue"
          }
          clickHandler={
            activeIndex === 2
              ? () => setActiveIndex(0)
              : () => setActiveIndex(2)
          }
        /> */}
      </div>
    </div>
  );
};

export default FaqPage;
