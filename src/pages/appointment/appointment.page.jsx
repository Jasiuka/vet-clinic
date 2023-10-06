import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./appointment.style.css";
import { useState } from "react";
import FoundAppointments from "./found-appointments.component";
export const AppointmentPage = () => {
  const [dateRangeObject, setDateRangeObject] = useState({
    start: null,
    end: null,
  });
  const [isSearched, setIsSearched] = useState(false);
  const onChangeHandler = (e) => {
    setDateRangeObject({
      start: e[0],
      end: e[1],
    });
  };

  return (
    <main className="appointment">
      <h2 className="page-heading for-observer">Registracija vizitui</h2>
      <div className="appointment-inner">
        <div className="appointment-inner__calendar">
          <h3>Pasirinkite data</h3>
          <Calendar
            locale="lt-LT"
            minDetail="year"
            nextAriaLabel="Kitas mėnuo"
            prevAriaLabel="Praeitas mėnuo"
            prev2Label={null}
            next2Label={null}
            selectRange={true}
            minDate={new Date()}
            onChange={(e) => onChangeHandler(e)}
          />
          <button onClick={() => setIsSearched((prev) => !prev)}>
            Ieškoti
          </button>
        </div>
        <FoundAppointments
          dateToSearch={dateRangeObject}
          isSearched={isSearched}
        />
      </div>
    </main>
  );
};

export default AppointmentPage;
