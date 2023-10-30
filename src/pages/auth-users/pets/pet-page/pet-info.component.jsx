import { useGetPetByIdQuery } from "../../../../services/api-slice";
import { useEffect } from "react";
import { useState } from "react";
import { FixDate } from "../../../../utils/helper-fncs";
export const PetInfo = ({ id, role, handlePopup }) => {
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
  }, [data]);

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
        {role === 2 && (
          <button onClick={() => handlePopup(true)} className="pink-button">
            Visi vizitai
          </button>
        )}
      </div>
    </>
  );
};

export default PetInfo;
