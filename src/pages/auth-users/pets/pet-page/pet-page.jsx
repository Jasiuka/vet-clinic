import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetPetDocumentsByIdQuery,
  useUploadPetDocumentMutation,
} from "../../../../services/api-slice";
import "./pet-page.style.css";
import PetInfo from "./pet-info.component";
import PetDocument from "./pet-document.component";
import PetHistory from "./pet-history.component";
import { useSelector } from "react-redux";
import AllAppointmentsPopup from "./all-appointments-popup.component";
import Spinner from "../../../../components/spinner.component";
import Message from "../../../../components/message.component";
export const PetPage = () => {
  const { name, id } = useParams();

  // QUERIES / MUTATIONS
  const { data: petDocuments, isLoading } = useGetPetDocumentsByIdQuery(id);

  const [documentTrigger] = useUploadPetDocumentMutation();

  // STATES
  const [isAddDocumentFormShowing, setIsAddDocumentFormShowing] =
    useState(false);
  const [isPopupShowing, setIsPopupShowing] = useState(false);
  const userRole = useSelector((state) => state.user?.role);
  const [message, setMessage] = useState({
    messageText: "",
    isMessageVisible: false,
  });
  const showMessage = (messageText) => {
    setMessage({
      messageText: messageText,
      isMessageVisible: true,
    });

    setTimeout(() => {
      setMessage({
        isMessageVisible: false,
      });
    }, 3000);
  };

  // HANDLERS
  const handleFormShow = () => setIsAddDocumentFormShowing((prev) => !prev);
  const handlePopupShow = (state) => setIsPopupShowing(state);
  const handleDownload = async (fileId) => {
    const response = await fetch(`/api/v1/files/download?fileId=${fileId}`);
    const { link } = await response.json();

    window.open(link, "_blank");
  };

  const submitDoc = async (event) => {
    event.preventDefault();

    const form = event.target;

    const file = form.upload.files[0];
    const title = form.title.value;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("petId", id);

    const { data } = await documentTrigger(formData);

    if (data.status === 200) {
      form.upload.value = "";
      form.title.value = "";
      showMessage(data.message);
    }
    if (data.stauts !== 200) {
      showMessage(data.message);
    }
  };

  return (
    <main className="pet-page">
      {isLoading && <Spinner message={"Gaunami duomenys"} />}
      {message.isMessageVisible && (
        <Message messageText={message.messageText} />
      )}
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
              <form onSubmit={submitDoc} className="pet-page__documents-form">
                <div>
                  <label>Failas</label>
                  <input name="upload" type="file" />
                </div>
                <div>
                  <label>Pavadinimas</label>
                  <input name="title" type="text" />
                </div>
                <button className="pink-button" type="submit">
                  Pridėti
                </button>
              </form>
            )}
            {petDocuments?.length ? (
              petDocuments?.map((document, index) => (
                <PetDocument
                  key={index}
                  document={document}
                  handleDownload={handleDownload}
                />
              ))
            ) : (
              <p>Susijusių dokumentų nėra</p>
            )}
          </div>
        </div>
        <PetHistory messageHandler={showMessage} id={id} userRole={userRole} />
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
