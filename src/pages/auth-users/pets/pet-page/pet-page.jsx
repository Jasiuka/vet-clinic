import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetPetDocumentsByIdQuery } from "../../../../services/appointments";
import "./pet-page.style.css";
import PetInfo from "./pet-info.component";
import PetDocument from "./pet-document.component";
import PetHistory from "./pet-history.component";
export const PetPage = () => {
  const { name, id } = useParams();
  const { data, error, isLoading } = useGetPetDocumentsByIdQuery(id);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (data) setDocuments(data);
  }, [data]);

  return (
    <main className="pet-page">
      <h1 className="page-heading for-observer">{name}</h1>
      <div className="pet-page-inner">
        <div className="pet-page__pet-info">
          <h2 className="pet-page__box-heading">Augintinio informacija</h2>
          <PetInfo id={id} />
        </div>
        <div className="pet-page__documents">
          <h2 className="pet-page__box-heading">Dokumentai</h2>
          <div className="pet-page__documents-items">
            {data ? (
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
    </main>
  );
};

export default PetPage;
