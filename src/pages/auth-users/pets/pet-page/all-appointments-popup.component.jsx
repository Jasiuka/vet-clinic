import { useGetAllPetAppointmentsQuery } from "../../../../services/api-slice";
import PropTypes from "prop-types";
import AppointmentsTable from "./appointments-table.component";
import Spinner from "../../../../components/spinner.component";
export const AllAppointmentsPopup = ({ petName, petId, handlePopup }) => {
  const { data, isLoading } = useGetAllPetAppointmentsQuery(petId);

  return (
    <>
      {isLoading && <Spinner message={"Gaunami duomenys"} />}
      <div className="pet-page__popup">
        {data?.length ? (
          <>
            <h2 className="pet-page__popup-heading">
              {petName.toUpperCase()} VIZITAI
            </h2>
            <AppointmentsTable appointmentsData={data} />
          </>
        ) : (
          <h2 className="pet-page__popup--no-appointments">
            Šis jūsų augintinis registruotų vizitų neturi
          </h2>
        )}
        <button onClick={() => handlePopup(false)}>X</button>
      </div>
    </>
  );
};

AllAppointmentsPopup.propTypes = {
  petName: PropTypes.string,
  petId: PropTypes.any,
  handlePopup: PropTypes.func,
};
export default AllAppointmentsPopup;
