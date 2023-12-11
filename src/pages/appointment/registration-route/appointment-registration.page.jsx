import { useParams, useNavigate } from "react-router-dom";
import { FixDate, RemoveSeconds } from "../../../utils/helper-fncs";
import {
  useGetAppointmentByIdQuery,
  useBookAppointmentMutation,
} from "../../../services/api-slice";
import { useState, useEffect } from "react";
import "./appointment-registration.style.css";
import NoRegForm from "./no-reg-form.component";
import { useSelector } from "react-redux";
import AuthenticatedForm from "./auth-form.component";
import Spinner from "../../../components/spinner.component";
import useCreateNotification from "../../../utils/hooks/createNotification.hook";
export const AppointmentRegistration = () => {
  let { id } = useParams();
  const { createNotification } = useCreateNotification();
  const navigate = useNavigate();
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
  const [appointment, { isLoading: isLoadingMutation, isSuccess }] =
    useBookAppointmentMutation();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const species = form.reg_species?.value;
    const breed = form.reg_breed?.value;
    const age = form.reg_age?.value;
    const description = form.reg_description?.value;
    const email = form.reg_email?.value;
    const petId = form.reg_pet?.value;
    const gender = form.reg_gender?.value;

    const appointmentObject = {
      species,
      breed,
      age,
      gender,
      description,
      email,
      petId,
      appointmentId: appointmentData.id,
    };

    appointment(appointmentObject).then((response) => {
      if (response.error) {
        const { message, type } = response.error.data;
        createNotification(message, type);
      } else {
        const { message, type } = response.data;
        createNotification(message, type);
        navigate("/");
      }
    });
  };

  return (
    <main className="appointment-registration">
      {isLoadingMutation && <Spinner message={"Kraunama.."} />}
      <div className="appointment-registration-heading ">
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
        {user?.role && (
          <AuthenticatedForm
            appointmentDate={appointmentData.date}
            appointmentTime={appointmentData.time}
            dayName={appointmentData.dayName}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default AppointmentRegistration;
