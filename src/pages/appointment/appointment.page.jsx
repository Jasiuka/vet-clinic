import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./appointment.style.css";
import { useState } from "react";
import AppointmentCard from "./appointment-card.component";
import { useGetAppointmentsByDateRangeQuery } from "../../services/api-slice";
import { RemoveSeconds, FixDate } from "../../utils/helper-fncs";
import Spinner from "../../components/spinner.component";
export const AppointmentPage = () => {
  const [dateRangeObject, setDateRangeObject] = useState({
    start: null,
    end: null,
  });
  const [fetchedResults, setFetchedResults] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [skip, setSkip] = useState(false);
  const { data, error, isLoading } = useGetAppointmentsByDateRangeQuery(
    dateRangeObject,
    { skip }
  );

  const handleSearchSubmit = () => {
    setSkip(true);
    const fixedResults = fixDates(data);

    setFetchedResults(fixedResults);
    setSearchCount((prev) => prev + 1);
    setSkip(false);
  };
  const onChangeHandler = (e) => {
    setDateRangeObject({
      start: formatDate(e[0]),
      end: formatDate(e[1]),
    });
  };

  // converts date from UTC 0, to UTC +3 (Lithuania timezone)
  const fixDates = (appointmentsArray) => {
    const fixedDatesOfAppointments = appointmentsArray.map((appointment) => {
      const newObject = {
        ...appointment,
        appointmentDate: FixDate(appointment.appointmentDate),
      };
      return newObject;
    });
    return fixedDatesOfAppointments;
  };

  // Format date from (Sun July 08 2023...) => 2023-07-08
  const formatDate = (dateToFormat) => {
    if (!dateToFormat) return;

    const formatedDate = `${dateToFormat.getFullYear()}-${String(
      dateToFormat.getMonth() + 1
    ).padStart(2, 0)}-${String(dateToFormat.getDate()).padStart(2, 0)}`;
    return formatedDate;
  };

  return (
    <main className="appointment">
      {isLoading && <Spinner message={"Ieškoma.."} />}
      <h2 className="page-heading ">Registracija vizitui</h2>
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
            className="appointment-button pink-button"
            onClick={handleSearchSubmit}
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
                ({
                  id,
                  appointmentDate,
                  appointmentTime,
                  dayName,
                  vetName,
                  lastName,
                }) => (
                  <AppointmentCard
                    key={id}
                    dayName={dayName}
                    date={appointmentDate}
                    time={RemoveSeconds(appointmentTime)}
                    appointmentId={id}
                    vetName={vetName}
                    vetLastName={lastName}
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
