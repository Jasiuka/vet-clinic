import "./pets.style.css";
import "../../faq/accordion-plus-icon.component";
import PlusIcon from "../../faq/accordion-plus-icon.component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NewPetForm from "../new-pet-form.component";
import { useGetAllUserPetsIdsQuery } from "./../../../services/api-slice";
import useCheckStatus from "../../../utils/hooks/check-status.hook";
import Spinner from "../../../components/spinner.component";
export const Pets = () => {
  const [isCreateNewShowing, setIsCreateNewShowing] = useState(false);
  const { data, error, isLoading } = useGetAllUserPetsIdsQuery();

  useCheckStatus({ route: "mano-augintiniai" });

  return (
    <main className="page pets">
      {isLoading && <Spinner message={"Gaunami duomenys.."} />}
      <h1 className="page-heading for-observer">Mano augintiniai</h1>;
      <div className="pets-inner">
        {data?.map(({ petID, petName }) => {
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
      {isCreateNewShowing && (
        <NewPetForm
          setShowing={setIsCreateNewShowing}
          isShowing={isCreateNewShowing}
        />
      )}
    </main>
  );
};

export default Pets;
