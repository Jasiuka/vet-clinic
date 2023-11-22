import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetPetDocumentsByIdQuery } from "../../../../services/api-slice";
import "./pet-page.style.css";
import PetInfo from "./pet-info.component";
import PetDocument from "./pet-document.component";
import PetHistory from "./pet-history.component";
import { useSelector } from "react-redux";
import AllAppointmentsPopup from "./all-appointments-popup.component";
import Spinner from "../../../../components/spinner.component";
export const PetPage = () => {
  const { name, id } = useParams();
  const { data, error, isLoading } = useGetPetDocumentsByIdQuery(id);
  const [documents, setDocuments] = useState([]);
  const [isAddDocumentFormShowing, setIsAddDocumentFormShowing] =
    useState(false);
  const [isPopupShowing, setIsPopupShowing] = useState(false);
  const userRole = useSelector((state) => state.user?.userRole);

  const handleFormShow = () => setIsAddDocumentFormShowing((prev) => !prev);
  const handlePopupShow = (state) => setIsPopupShowing(state);
  useEffect(() => {
    if (data) setDocuments(data);
  }, [data]);

  return (
    <main className="pet-page">
      {isLoading && <Spinner message={"Gaunami duomenys"} />}
      <h1 className="page-heading for-observer">{name}</h1>
      <div className="pet-page-inner">
        <div className="pet-page__pet-info">
          <h2 className="pet-page__box-heading">Augintinio informacija</h2>
          <PetInfo handlePopup={handlePopupShow} role={userRole} id={id} />
        </div>
        <div className="pet-page__documents">
          <h2 className="pet-page__box-heading">
            Dokumentai{" "}
            {userRole === 3 ? (
              <button
                onClick={() => handleFormShow()}
                title="Pridėti dokumentą"
              >
                +
              </button>
            ) : (
              ""
            )}
          </h2>
          <div className="pet-page__documents-items">
            {isAddDocumentFormShowing && (
              <form className="pet-page__documents-form">
                <div>
                  <label>Failas</label>
                  <input type="file" />
                </div>
                <div>
                  <label>Pavadinimas</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Aprašymas</label>
                  <input type="text" />
                </div>
                <button className="pink-button" type="submit">
                  Pridėti
                </button>
              </form>
            )}
            {data && data[0].title ? (
              documents.map((document, index) => (
                <PetDocument key={index} document={document} />
              ))
            ) : (
              <p>Susijusių dokumentų nėra</p>
            )}
          </div>
        </div>
        <PetHistory id={id} />
      </div>
      {isPopupShowing && (
        <AllAppointmentsPopup
          petName={name}
          handlePopup={handlePopupShow}
          petId={id}
        />
      )}
    </main>
  );
};

export default PetPage;
