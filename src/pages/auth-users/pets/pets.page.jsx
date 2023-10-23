import "./pets.style.css";
import "../../faq/accordion-plus-icon.component";
import PlusIcon from "../../faq/accordion-plus-icon.component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import NewPetForm from "../new-pet-form.component";
export const Pets = () => {
  const userPets = useSelector((state) => state.user.pets);
  const [isCreateNewShowing, setIsCreateNewShowing] = useState(false);

  return (
    <main className="page pets">
      <h1 className="page-heading for-observer">Mano augintiniai</h1>;
      <div className="pets-inner">
        {userPets.map(({ petID, petName }) => {
          return (
            <Link
              to={`/augintinis/${petName}/${petID}`}
              key={petID}
              className="pets__pet-card"
            >
              {petName}
            </Link>
          );
        })}
        <button
          onClick={() => setIsCreateNewShowing((prev) => !prev)}
          className="pets__add-new"
          title="pridėti nauja"
        >
          Sukurti nauja
          <PlusIcon />
        </button>
      </div>
      {isCreateNewShowing && <NewPetForm isShowing={isCreateNewShowing} />}
    </main>
  );
};

export default Pets;
