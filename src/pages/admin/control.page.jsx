import "./control.style.css";
import { useState } from "react";
import EmployeeSelection from "./employeSelection.component";
import AppointmentsSelection from "./appointmentsSelection.component";
import ProductsSelection from "./productsSelection.component";
export const Control = () => {
  const [selection, setSelection] = useState("");

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setSelection(value);
  };

  return (
    <main className="control">
      <div className="control-heading-wrapper">
        <h1 className="control-heading">Sistemos valdymas</h1>
        <select onChange={(e) => onChangeHandler(e)} className="control-select">
          <option>Pasirinkite sritį</option>
          <option value={"veterinarians"}>Veterinarai</option>
          <option value={"appointments"}>Vizitai</option>
          <option value={"products"}>Prekės</option>
        </select>
      </div>
      <div className="control-table">
        {selection === "veterinarians" && <EmployeeSelection />}
        {selection === "appointments" && <AppointmentsSelection />}
        {selection === "products" && <ProductsSelection />}
      </div>
    </main>
  );
};

export default Control;
