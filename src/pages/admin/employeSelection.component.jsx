import { useGetAllEmployeesQuery } from "../../services/api-slice";
import Table from "./table.component";
import { useState } from "react";
import AddNewFormInput from "./add-new-form-input.component";
export const EmployeeSelection = ({ selectedTable }) => {
  const { data, error, isLoading } = useGetAllEmployeesQuery();
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const handleOpen = () => setIsAddNewOpen((prev) => !prev);
  return (
    <>
      <button onClick={handleOpen} className="selection-add-new-open">
        Sukurti nauja
      </button>
      {isAddNewOpen && (
        <form className="selection__add-new-form">
          {Object.keys(data[0])?.map((key) => (
            <AddNewFormInput
              key={key}
              label={key}
              inputId={key}
              inputName={key}
            />
          ))}
          <button type="submit" className="selection-add-new-submit">
            Sukurti
          </button>
        </form>
      )}
      <Table tableName={"Veterinarai"} data={data} />
    </>
  );
};

export default EmployeeSelection;
