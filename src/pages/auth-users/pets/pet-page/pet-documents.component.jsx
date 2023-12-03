import PropTypes from "prop-types";
import {
  useGetPetDocumentsByIdQuery,
  useUploadPetDocumentMutation,
} from "../../../../services/api-slice";
import PetDocument from "./pet-document.component";
import { useState } from "react";
import Spinner from "../../../../components/spinner.component";

export const PetDocuments = ({ petId, userRole, notificationHandler }) => {
  const [isAddDocumentFormShowing, setIsAddDocumentFormShowing] =
    useState(false);
  const { data: petDocuments, isLoading } = useGetPetDocumentsByIdQuery(petId);
  const [documentTrigger, { isLoading: uploadingDocument }] =
    useUploadPetDocumentMutation();

  const handleFormShow = () => setIsAddDocumentFormShowing((prev) => !prev);

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
    formData.append("petId", petId);

    const { data, error } = await documentTrigger(formData);

    if (data?.status === 200) {
      form.upload.value = "";
      form.title.value = "";
      notificationHandler(data.message, data.type);
    }
    if (error) {
      notificationHandler(error.data.message, error.data.type);
    }
  };

  if (isLoading || uploadingDocument) {
    return <Spinner message={"Kraunama.."} />;
  } else {
    return (
      <div className="pet-page__documents">
        <h2 className="pet-page__box-heading">
          Dokumentai{" "}
          {userRole === 3 ? (
            <button onClick={() => handleFormShow()} title="Pridėti dokumentą">
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
    );
  }
};

PetDocuments.propTypes = {
  petId: PropTypes.string,
  userRole: PropTypes.number,
  notificationHandler: PropTypes.func,
};
export default PetDocuments;
