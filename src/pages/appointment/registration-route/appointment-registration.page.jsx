import { useParams } from "react-router-dom";
import FormInputBox from "../../../components/form-input-box.component";
import {
  ChangeDateFormat,
  ExtractDate,
  RemoveSeconds,
} from "../../../utils/helper-fncs";
import { useGetAppointmentByIdQuery } from "../../../services/appointments";
import { useState, useEffect } from "react";
import "./appointment-registration.style.css";
export const AppointmentRegistration = () => {
  let { id } = useParams();
  const [appointmentData, setAppointmentData] = useState({
    id: "",
    date: "",
    time: "",
    dayName: "",
    vetName: "",
    vetLastName: "",
  });
  const { data, error, isLoading } = useGetAppointmentByIdQuery(id);
  useEffect(() => {
    if (data) {
      const {
        id,
        appointmentDate,
        appointmentTime,
        dayName,
        vetName,
        lastName,
      } = data;
      setAppointmentData({
        id: id,
        date: ExtractDate(ChangeDateFormat(appointmentDate)),
        time: RemoveSeconds(appointmentTime),
        dayName: dayName,
        vetName: vetName,
        vetLastName: lastName,
      });
    }
  }, [data]);

  return (
    <main className="appointment-registration">
      <div className="appointment-registration-heading for-observer">
        <div className="appointment-registration-heading__appointment-data">
          <p>{appointmentData.date}</p>
          <p>{appointmentData.dayName.toUpperCase()}</p>
          <p>{appointmentData.time}</p>
          <p>{`Gydytojas: ${appointmentData.vetName} ${appointmentData.vetLastName}`}</p>
        </div>
        <h1>Vizito registracija</h1>
      </div>
      <div className="appointment-registration__forms appointment-registration__inner">
        <FormInputBox
          inputId={"reg_date"}
          inputName={"reg_date"}
          inputType={"text"}
          label={"Vizito data"}
          isDisabled={true}
          isValue={`${appointmentData.date} (${appointmentData.dayName})`}
        />
        <FormInputBox
          inputId={"reg_time"}
          inputName={"reg_time"}
          inputType={"text"}
          label={"Vizito laikas"}
          isDisabled={true}
          isValue={appointmentData.time}
        />
        <FormInputBox
          inputId={"reg_email"}
          inputName={"reg_email"}
          inputType={"email"}
          label={"Jūsų el. Paštas"}
        />
        <h3>Informacija apie jūsų augintinį</h3>
        <FormInputBox
          inputId={"reg_specie"}
          inputName={"reg_specie"}
          inputType={"text"}
          label={"Augintinio rūšis"}
        />
        <FormInputBox
          inputId={"reg_breed"}
          inputName={"reg_breed"}
          inputType={"text"}
          label={"Augintinio veislė"}
        />
        <FormInputBox
          inputId={"reg_years"}
          inputName={"reg_years"}
          inputType={"number"}
          label={"Augintinio amžius"}
        />
      </div>
    </main>
  );
};

export default AppointmentRegistration;
