import { useParams } from "react-router-dom";
import { FixDate, RemoveSeconds } from "../../../utils/helper-fncs";
import { useGetAppointmentByIdQuery } from "../../../services/api-slice";
import { useState, useEffect } from "react";
import "./appointment-registration.style.css";
import NoRegForm from "./no-reg-form.component";
import { useSelector } from "react-redux";
import AuthenticatedForm from "./auth-form.component";
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
        date: FixDate(appointmentDate),
        time: RemoveSeconds(appointmentTime),
        dayName: dayName,
        vetName: vetName,
        vetLastName: lastName,
      });
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const species = form.reg_species.value;
    const breed = form.reg_breed.value;
    const age = form.reg_age.value;
    const description = form.reg_description.value;
    const email = form.reg_email.value;
    const pet = form.reg_pet?.value;

    const appointmentObject = {
      species,
      breed,
      age,
      description,
      email,
      pet,
    };

    console.log(appointmentObject);
  };

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
        <span className="is-required">
          {" "}
          Žvaigždute pažymėti laukai privalo būti užpildyti!
        </span>
        {!user?.role && (
          <NoRegForm
            appointmentDate={appointmentData.date}
            appointmentTime={appointmentData.time}
            dayName={appointmentData.dayName.toUpperCase()}
            handleSubmit={handleSubmit}
          />
        )}
        {user?.role && <AuthenticatedForm />}
      </div>
    </main>
  );
};

export default AppointmentRegistration;
