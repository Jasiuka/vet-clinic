import {
  useGetPetHistoryByIdQuery,
  useAddPetDiagnosisMutation,
} from "../../../../services/api-slice";
import { FixDate } from "../../../../utils/helper-fncs";
import { useState, useEffect } from "react";
export const PetHistory = ({ id, userRole, messageHandler }) => {
  const { data, error, isLoading } = useGetPetHistoryByIdQuery(id);
  const [diagnosis, { isLoading: addLoading }] = useAddPetDiagnosisMutation();
  const [history, setHistory] = useState([]);
  const [isFormShowing, setIsFormShowing] = useState(false);
  const handleButtonClick = () => {
    setIsFormShowing((prev) => !prev);
  };
  useEffect(() => {
    if (data) setHistory(data);
  }, [data]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;

    const description = form.h_description.value;

    const diagnosisObject = {
      description,
      petId: id,
    };

    const { data } = await diagnosis(diagnosisObject);
    if (data.status === 200) {
      form.h_description.value = "";
      messageHandler(data.message);
    }

    if (data.stauts !== 200) {
      messageHandler(data.message);
    }
  };
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
          <form
            onSubmit={(e) => submitHandler(e)}
            className="pet-page__history-form"
          >
            <div>
              <label htmlFor="text-area">Diagnozė</label>
              <textarea id="text-area" name="h_description" />
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
