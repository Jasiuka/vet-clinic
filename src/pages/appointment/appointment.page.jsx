import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./appointment.style.css";
import { useState } from "react";
import AppointmentCard from "./appointment-card.component";
export const AppointmentPage = () => {
  const [dateRangeObject, setDateRangeObject] = useState({
    start: null,
    end: null,
  });
  const [fetchedResults, setFetchedResults] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const onChangeHandler = (e) => {
    setDateRangeObject({
      start: e[0],
      end: e[1],
    });
  };

  // Fetches appointments by date range, if only start date is given, end date = start date
  const fetchAppointments = async ({ start, end }) => {
    if (!end) end = start;
    const { startDate, endDate } = formatDates(start, end);
    const response = await fetch(
      `/api/v1/appointments?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json" },
      }
    );
    const results = await response.json();
    const fixedResults = fixDates(results);
    setFetchedResults(fixedResults);

    setSearchCount((prev) => prev + 1);
  };

  // Extract date from date string (2023-06-10 00:00:00) -> 2023-06-10
  const extractDate = (dateString) => {
    const indexOfSpace = dateString.indexOf(" ");
    const dateSubString = dateString.slice(0, indexOfSpace);
    return dateSubString;
  };

  // Removes :00 (seconds) from time string 14:00:00 => 14:00;
  const removeSeconds = (timeString) => {
    const newString = timeString.slice(0, timeString.length - 3);
    return newString;
  };

  // converts date from UTC 0, to UTC +3 (Lithuania timezone)
  const fixDates = (appointmentsArray) => {
    const fixedDatesOfAppointments = appointmentsArray.map((appointment) => {
      const fixedDate = new Date(`${appointment.appointmentDate}`);
      const newObject = {
        ...appointment,
        appointmentDate: fixedDate.toLocaleString("lt-LT", {
          timezone: "UTC",
        }),
      };
      return newObject;
    });
    return fixedDatesOfAppointments;
  };

  // Format date from (Sun July 08 2023...) => 2023-07-08
  const formatDates = (startDate, endDate) => {
    if (!startDate || !endDate) return;

    const formatedDates1 = {
      startDate: `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, 0)}-${String(startDate.getDate()).padStart(2, 0)}`,
      endDate: `${endDate.getFullYear()}-${String(
        endDate.getMonth() + 1
      ).padStart(2, 0)}-${String(endDate.getDate()).padStart(2, 0)}`,
    };
    return formatedDates1;
  };

  return (
    <main className="appointment">
      <h2 className="page-heading for-observer">Registracija vizitui</h2>
      <div className="appointment-inner">
        <div className="appointment-inner__calendar">
          <h3>Pasirinkite laikotarpį arba dieną</h3>
          <Calendar
            allowPartialRange={true}
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
          <button
            className="appointment-button"
            onClick={() => fetchAppointments(dateRangeObject)}
          >
            Ieškoti
          </button>
        </div>
        <div className="appointments-inner__appointments">
          {searchCount > 0 && (
            <h3 className="appointment-inner__appointments-found">
              Rasta laisvų vizitų: &#40;
              <span>{`${fetchedResults.length}`}</span>&#41;
            </h3>
          )}
          <div className="appointments-inner__appointments--cards">
            {fetchedResults.length > 0 &&
              fetchedResults.map(
                ({ id, appointmentDate, appointmentTime, dayName }) => (
                  <AppointmentCard
                    key={id}
                    dayName={dayName}
                    date={extractDate(appointmentDate)}
                    time={removeSeconds(appointmentTime)}
                    appointmentId={id}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentPage;
