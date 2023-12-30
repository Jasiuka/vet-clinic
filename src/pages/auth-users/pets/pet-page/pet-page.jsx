import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./pet-page.style.css";
import PetInfo from "./pet-info.component";
import PetDocuments from "./pet-documents.component";
import PetHistory from "./pet-history.component";
import { useSelector } from "react-redux";
import AllAppointmentsPopup from "./all-appointments-popup.component";
import EditPetModal from "./edit-pet.component";
import useCreateNotification from "../../../../utils/hooks/createNotification.hook";
export const PetPage = () => {
  const { name, id } = useParams();

  // QUERIES / MUTATIONS

  // STATES
  const [isPopupShowing, setIsPopupShowing] = useState({
    state: false,
    type: "",
    details: null,
  });
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.user?.role);
  const { createNotification } = useCreateNotification();

  // HANDLERS
  const handlePopupShow = (popupObj) => setIsPopupShowing(popupObj);

  if (error?.originalStatus === 401) {
    return (
      <main className="pet-page">
        <h1 className="page-heading ">Augintinis</h1>
        <div className="pet-page-inner pet-page-not-allowed">
          <h2>Neturite teisės pasiekti šio turinio!</h2>
          <Link className="pink-button" to={"/"}>
            Grįžti į pagrindinį
          </Link>
        </div>
      </main>
    );
  } else {
    return (
      <main className="pet-page">
        <h1 className="page-heading ">{name}</h1>
        <div className="pet-page-inner">
          <div className="pet-page__pet-info">
            <h2 className="pet-page__box-heading">Augintinio informacija</h2>
            <PetInfo
              handlePopup={handlePopupShow}
              role={userRole}
              id={id}
              isAuthorized={setError}
            />
          </div>
          <PetDocuments
            notificationHandler={createNotification}
            petId={id}
            userRole={userRole}
          />
          <PetHistory
            id={id}
            userRole={userRole}
            notificationHandler={createNotification}
          />
        </div>
        {isPopupShowing.state && isPopupShowing.type === "edit" && (
          <EditPetModal
            handlePopup={handlePopupShow}
            details={isPopupShowing.details}
            notificationHandler={createNotification}
          />
        )}
        {isPopupShowing.state && isPopupShowing.type === "appointments" && (
          <AllAppointmentsPopup
            petName={name}
            handlePopup={handlePopupShow}
            petId={id}
          />
        )}
      </main>
    );
  }
};

export default PetPage;
