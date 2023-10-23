import { useGetAllEmployeesQuery } from "../../services/api-slice";
import Table from "./table.component";
export const EmployeeSelection = () => {
  const { data, error, isLoading } = useGetAllEmployeesQuery();

  return (
    <>
      <Table tableName={"Veterinarai"} data={data} />;
    </>
  );
};

export default EmployeeSelection;
