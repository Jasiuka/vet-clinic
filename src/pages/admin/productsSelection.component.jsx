import Table from "./table.component";
import { useGetAllProductsAdminQuery } from "../../services/api-slice";
import AddNewFormInput from "./add-new-form-input.component";
import { useState } from "react";
export const ProductsSelection = ({ selectedTable }) => {
  const { data, error, isLoading } = useGetAllProductsAdminQuery();
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
      <Table tableName={"Prekės"} data={data} />
    </>
  );
};

export default ProductsSelection;
