import Table from "./table.component";
import { useGetAllAppointmentsQuery } from "../../services/api-slice";
export const AppointmentsSelection = () => {
  const { data, error, isLoading } = useGetAllAppointmentsQuery();

  return (
    <>
      <Table tableName={"Vizitai"} data={data} />
    </>
  );
};

export default AppointmentsSelection;
