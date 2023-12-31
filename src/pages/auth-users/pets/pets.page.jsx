import "./pets.style.css";
import "../../faq/accordion-plus-icon.component";
import PlusIcon from "../../faq/accordion-plus-icon.component";
import { Link } from "react-router-dom";
import { useState } from "react";
import NewPetForm from "../new-pet-form.component";
import {
  useGetAllUserPetsIdsQuery,
  useDeletePetMutation,
} from "./../../../services/api-slice";
import useCheckStatus from "../../../utils/hooks/check-status.hook";
import Spinner from "../../../components/spinner.component";
import { FixDate } from "../../../utils/helper-fncs";
import useCreateNotification from "../../../utils/hooks/createNotification.hook";
export const Pets = () => {
  const [isCreateNewShowing, setIsCreateNewShowing] = useState(false);
  const { data = [], error, isLoading } = useGetAllUserPetsIdsQuery();
  const [deletePet, { isLoading: isDeleteLoading }] = useDeletePetMutation();
  const { createNotification } = useCreateNotification();

  useCheckStatus({ route: "mano-augintiniai" });

  const deletePetFn = (petId, petName) => {
    const isConfirmed = confirm(`Ar tikrai norite pašalinti ${petName}?`);
    if (!isConfirmed) return;
    deletePet({ id: petId }).then((response) => {
      if (response.error) {
        const { message, type } = response.error.data;
        createNotification(message, type);
      } else {
        const { message, type } = response.data;
        createNotification(message, type);
      }
    });
  };

  return (
    <main className="page pets">
      {isLoading && <Spinner message={"Gaunami duomenys.."} />}
      <h1 className="page-heading ">Mano augintiniai</h1>;
      <div className="pets-inner">
        {data?.map(({ petID, petName, species, appointmentDate }) => {
          return (
            <div className="pets__pet-card" key={petID}>
              <Link
                title={`Eiti į ${petName} profilį`}
                className="pets__pet-card-details"
                to={`/augintinis/${petName}/${petID}`}
              >
                <h3 className="pets__pet-card-species">{species}</h3>
                <h3 className="pets__pet-card-name">{petName}</h3>
                <h3 className="pets__pet-card-date">
                  Paskutinis vizitas:{" "}
                  {appointmentDate ? FixDate(appointmentDate) : "Nėra"}
                </h3>
              </Link>
              <button
                onClick={() => deletePetFn(petID, petName)}
                title="Pašalinti augintinį"
                className="pet-delete"
              >
                Pašalinti
              </button>
            </div>
          );
        })}
        <button
          onClick={() => setIsCreateNewShowing((prev) => !prev)}
          className="pets__add-new"
          title="pridėti naują"
        >
          Sukurti naują
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
