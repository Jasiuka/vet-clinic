import PropTypes from "prop-types";
import {
  useGetPetHistoryByIdQuery,
  useAddPetDiagnosisMutation,
} from "../../../../services/api-slice";
import { FixDate } from "../../../../utils/helper-fncs";
import { useState, useEffect } from "react";
import Spinner from "../../../../components/spinner.component";
export const PetHistory = ({ id, userRole, notificationHandler }) => {
  const { data, isLoading } = useGetPetHistoryByIdQuery(id);
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

    const { data, error } = await diagnosis(diagnosisObject);
    if (data?.status === 200) {
      form.h_description.value = "";
      notificationHandler(data.message, data.type);
    }

    if (error) {
      notificationHandler(error.data.message, error.data.type);
    }
  };
  if (isLoading || addLoading) {
    return <Spinner message={"Kraunama.."} />;
  }
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

PetHistory.propTypes = {
  notificationHandler: PropTypes.func,
  id: PropTypes.string,
  userRole: PropTypes.number,
};

export default PetHistory;
