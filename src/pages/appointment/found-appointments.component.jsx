import { useEffect } from "react";
export const FoundAppointments = ({ dateToSearch, isSearched }) => {
  const fetchAppointments = async ({ start, end }) => {
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
    console.log(results);
  };

  useEffect(() => {
    if (isSearched) {
      fetchAppointments(dateToSearch);
    }
  }, [isSearched]);

  const formatDates = (startDate, endDate) => {
    if (!startDate || !endDate) return;

    const dateValues = {
      startYears: startDate.getFullYear(),
      startMonth: startDate.getMonth() + 1,
      startDay: startDate.getDate(),
      endYears: endDate.getFullYear(),
      endMonth: endDate.getMonth() + 1,
      endDay: endDate.getDate(),
    };

    const formatedDates = {
      startDate: `${dateValues.startYears}-${
        dateValues.startMonth < 10
          ? `0${dateValues.startMonth}`
          : `${dateValues.startMonth}`
      }-${dateValues.startDay}`,
      endDate: `${dateValues.endYears}-${
        dateValues.endMonth < 10
          ? `0${dateValues.endMonth}`
          : `${dateValues.endMonth}`
      }-${dateValues.endDay}`,
    };

    console.log(formatedDates);
    return formatedDates;
  };

  useEffect(() => {
    const dates = formatDates(dateToSearch.start, dateToSearch.end);
  }, [dateToSearch]);

  return (
    <div className="appointment-inner__appointments">
      <h3>Rasta vizitų </h3>
      <div className="appointment-inner__appointments-found-wrapper">
        <div className="appointment">
          <p>Data: 2023-10-06</p>
          <p>Laikas: 13:00</p>
        </div>
      </div>
    </div>
  );
};

export default FoundAppointments;
