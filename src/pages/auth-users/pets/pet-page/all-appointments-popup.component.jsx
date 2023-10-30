import { useGetAllPetAppointmentsQuery } from "../../../../services/api-slice";
import AppointmentsTable from "./appointments-table.component";
export const AllAppointmentsPopup = ({ petName, petId, handlePopup }) => {
  const { data, error, isLoading } = useGetAllPetAppointmentsQuery(petId);
  console.log(data);
  return (
    <div className="pet-page__popup">
      <h2 className="pet-page__popup-heading">
        {petName.toUpperCase()} VIZITAI
      </h2>
      <AppointmentsTable appointmentsData={data} />
      <button onClick={() => handlePopup(false)}>X</button>
    </div>
  );
};

export default AllAppointmentsPopup;
