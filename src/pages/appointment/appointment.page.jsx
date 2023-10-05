import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./appointment.style.css";
export const AppointmentPage = () => {
  return (
    <main className="appointment">
      <h2 className="page-heading for-observer">Registracija vizitui</h2>
      <h3>Pasirinkite data</h3>
      <Calendar locale="lt-LT" />
    </main>
  );
};

export default AppointmentPage;
