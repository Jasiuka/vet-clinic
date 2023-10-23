import Table from "./table.component";
import { useGetAllProductsAdminQuery } from "../../services/api-slice";
export const ProductsSelection = () => {
  const { data, error, isLoading } = useGetAllProductsAdminQuery();
  console.log(data);

  return (
    <>
      <Table tableName={"Prekės"} data={data} />
    </>
  );
};

export default ProductsSelection;
