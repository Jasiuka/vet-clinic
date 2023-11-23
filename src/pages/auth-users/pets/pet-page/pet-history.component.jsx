import { useSelector } from "react-redux";
import { useGetPetHistoryByIdQuery } from "../../../../services/api-slice";
import { FixDate } from "../../../../utils/helper-fncs";
import { useState, useEffect } from "react";
export const PetHistory = ({ id, userRole }) => {
  const { data, error, isLoading } = useGetPetHistoryByIdQuery(id);
  const [history, setHistory] = useState([]);
  const [isFormShowing, setIsFormShowing] = useState(false);
  const handleButtonClick = () => {
    setIsFormShowing((prev) => !prev);
  };
  useEffect(() => {
    if (data) setHistory(data);
  }, [data]);
  return (
    <div className="pet-page__history">
      <h2 className="pet-page__box-heading">
        Istorija{" "}
        {userRole === 3 && (
          <button onClick={() => handleButtonClick()} title="Pridėti diagnozę">
            +
          </button>
        )}
      </h2>

      <div className="pet-page__history-items">
        {isFormShowing && (
          <form className="pet-page__history-form">
            <div>
              <label htmlFor="text-area">Diagnozė</label>
              <textarea id="text-area" />
            </div>
            <button className="pink-button" type="submit">
              Pridėti
            </button>
          </form>
        )}
        {history[0]?.diagnosisDescription ? (
          history.map((historyItem, index) => {
            return (
              <div key={index} className="pet-page__history-item">
                <p className="pet-page__history-item-value">
                  {historyItem.diagnosisDescription}
                </p>
                <p className="pet-page__history-item-value">
                  {FixDate(historyItem.diagnosisDate)}
                </p>
              </div>
            );
          })
        ) : (
          <p>Įrašų nėra</p>
        )}
      </div>
    </div>
  );
};

export default PetHistory;
