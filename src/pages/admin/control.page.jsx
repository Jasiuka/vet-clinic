import { Link } from "react-router-dom";
import "./control.style.css";
import { useState } from "react";
import EmployeeSelection from "./employeSelection.component";
import AppointmentsSelection from "./appointmentsSelection.component";
export const Control = () => {
  const [selection, setSelection] = useState("");

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setSelection(value);
  };
  return (
    <main className="control">
      <div className="control-heading-wrapper">
        <Link to={"/"}>Į PAGRINDINĮ</Link>
        <h1 className="control-heading">Sistemos valdymas</h1>
        <select onChange={(e) => onChangeHandler(e)} className="control-select">
          <option>Pasirinkite sritį</option>
          <option value={"employees"}>Darbuotojai</option>
          <option value={"appointments"}>Vizitai</option>
        </select>
      </div>
      <div className="control-table">
        {selection === "employees" && <EmployeeSelection />}
        {selection === "appointments" && <AppointmentsSelection />}
      </div>
    </main>
  );
};

export default Control;
