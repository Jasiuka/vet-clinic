import "./pets.style.css";
import "../../faq/accordion-plus-icon.component";
import PlusIcon from "../../faq/accordion-plus-icon.component";
import { Link } from "react-router-dom";
export const Pets = () => {
  const someData = [
    {
      name: "Kolis",
      id: 1,
    },
    {
      name: "Brisius",
      id: 2,
    },
    {
      name: "Reo",
      id: 3,
    },
    {
      name: "Lapius",
      id: 4,
    },
  ];

  return (
    <main className="page pets">
      <h1 className="page-heading">Mano augintiniai</h1>;
      <div className="pets-inner">
        {someData.map((pet) => {
          return (
            <Link
              to={`/augintinis/${pet.name}/${pet.id}`}
              key={pet.id}
              className="pets__pet-card"
            >
              {pet.name}
            </Link>
          );
        })}
        <button className="pets__add-new" title="pridėti nauja">
          Pridėti nauja
          <PlusIcon />
        </button>
      </div>
    </main>
  );
};

export default Pets;
