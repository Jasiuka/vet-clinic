import PropTypes from "prop-types";
import { useGetPetByIdQuery } from "../../../../services/api-slice";
import { useEffect } from "react";
import { useState } from "react";
import { FixDate } from "../../../../utils/helper-fncs";
import Spinner from "../../../../components/spinner.component";
export const PetInfo = ({ id, role, handlePopup, isAuthorized }) => {
  const [petDetails, setPetDetails] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    age: "",
    weight: "",
    lastVisit: "",
    nextVisit: "",
  });
  const { data, error, isLoading } = useGetPetByIdQuery(id);

  useEffect(() => {
    if (data) {
      const {
        petName,
        species,
        breed,
        gender,
        age,
        petWeight,
        appointmentDate: [nextVisit, lastVisit],
      } = data;

      setPetDetails({
        name: petName,
        species,
        breed,
        gender,
        age,
        weight: petWeight,
        lastVisit: FixDate(lastVisit),
        nextVisit: FixDate(nextVisit),
      });
    }

    if (error) {
      isAuthorized(error);
    }
  }, [data, error]);

  if (isLoading) {
    return <Spinner message={"Kraunami duomenys.."} />;
  } else {
    return (
      <>
        <div className="pet-info__row-wrapper">
          <h3 className="pet-info__heading">Vardas</h3>
          <h4 className="pet-info__value">{petDetails?.name}</h4>
        </div>
        <div className="pet-info__row-wrapper">
          <h3 className="pet-info__heading">Rūšis</h3>
          <h4 className="pet-info__value">{petDetails?.species}</h4>
        </div>
        <div className="pet-info__row-wrapper">
          <h3 className="pet-info__heading">Veislė</h3>
          <h4 className="pet-info__value">{petDetails?.breed}</h4>
        </div>
        <div className="pet-info__row-wrapper">
          <h3 className="pet-info__heading">Lytis</h3>
          <h4 className="pet-info__value">{petDetails?.gender}</h4>
        </div>
        <div className="pet-info__row-wrapper">
          <h3 className="pet-info__heading">Amžius</h3>
          <h4 className="pet-info__value">{petDetails?.age} metai</h4>
        </div>
        <div className="pet-info__row-wrapper">
          <h3 className="pet-info__heading">Svoris</h3>
          <h4 className="pet-info__value">{petDetails?.weight} kg</h4>
        </div>
        <div className="pet-info__row-wrapper">
          <h3 className="pet-info__heading">Paskutinis vizitas</h3>
          <h4 className="pet-info__value">
            {petDetails?.lastVisit === "Invalid"
              ? "Vizitų nėra"
              : petDetails?.lastVisit}
          </h4>
        </div>
        <div className="pet-info__row-wrapper">
          <h3 className="pet-info__heading">Sekantis vizitas</h3>
          <h4 className="pet-info__value">
            {petDetails?.nextVisit === "Invalid"
              ? "Vizitų nėra"
              : petDetails?.nextVisit}
          </h4>
          <button
            onClick={() =>
              handlePopup({
                state: true,
                type: "edit",
                details: {
                  age: petDetails.age,
                  weight: petDetails.weight,
                  name: petDetails.name,
                  id: id,
                },
              })
            }
            className="pink-button"
          >
            Redaguoti
          </button>
          {role === 2 && (
            <button
              onClick={() =>
                handlePopup({
                  state: true,
                  type: "appointments",
                  details: null,
                })
              }
              className="pink-button"
            >
              Visi vizitai
            </button>
          )}
        </div>
      </>
    );
  }
};

PetInfo.propTypes = {
  id: PropTypes.string,
  role: PropTypes.number,
  handlePopup: PropTypes.func,
  isAuthorized: PropTypes.func,
};
export default PetInfo;
