import { useGetPetHistoryByIdQuery } from "../../../../services/appointments";
import { ChangeDateFormat, ExtractDate } from "../../../../utils/helper-fncs";
import { useState, useEffect } from "react";
export const PetHistory = ({ id }) => {
  const { data, error, isLoading } = useGetPetHistoryByIdQuery(id);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (data) setHistory(data);
  }, [data]);
  return (
    <div className="pet-page__history">
      <h2 className="pet-page__box-heading">Istorija</h2>
      <div className="pet-page__history-items">
        {history.map((historyItem, index) => {
          return (
            <div key={index} className="pet-page__history-item">
              <p className="pet-page__history-item-value">
                {historyItem.diagnosisDescription}
              </p>
              <p className="pet-page__history-item-value">
                {ExtractDate(ChangeDateFormat(historyItem.diagnosisDate))}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PetHistory;
