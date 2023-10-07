import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const AppointmentCard = ({ date, time, dayName, appointmentId }) => {
  return (
    <Link
      className="appointment-card-link"
      to={`/vizitas/registracija-${appointmentId}`}
    >
      <div className="appointment-card">
        <p className="appointment-card--date">{date}</p>
        <p className="appointment-card--dayname">{dayName.toUpperCase()}</p>
        <p className="appointment-card--time">{time}</p>
        <p>Gydytojas: Aistė Puidokaitė</p>
      </div>
    </Link>
  );
};

AppointmentCard.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
  dayName: PropTypes.string,
  appointmentId: PropTypes.number,
};
export default AppointmentCard;
