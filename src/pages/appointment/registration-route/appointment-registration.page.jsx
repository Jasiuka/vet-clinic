import { useParams } from "react-router-dom";
import {
  ChangeDateFormat,
  ExtractDate,
  RemoveSeconds,
} from "../../../utils/helper-fncs";
import { useGetAppointmentByIdQuery } from "../../../services/appointments";
import { useState, useEffect } from "react";
import "./appointment-registration.style.css";
import NoRegForm from "./no-reg-form.component";
import { useSelector } from "react-redux";
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
  const user = useSelector((state) => state.user);
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
        {!user && (
          <NoRegForm
            appointmentDate={appointmentData.date}
            appointmentTime={appointmentData.time}
            dayName={appointmentData.dayName.toUpperCase()}
          />
        )}
      </div>
    </main>
  );
};

export default AppointmentRegistration;
