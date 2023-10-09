import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "./../../store/slices/appointment-slice";
export const AppointmentCard = ({
  date,
  time,
  dayName,
  appointmentId,
  vetName,
  vetLastName,
}) => {
  const dispatch = useDispatch();

  const setSelectedAppointment = (id) => dispatch(set(id));

  return (
    <Link
      className="appointment-card-link"
      to={`/vizitas/registracija/${appointmentId}`}
      onClick={() => setSelectedAppointment(appointmentId)}
    >
      <div className="appointment-card">
        <p className="appointment-card--date">{date}</p>
        <p className="appointment-card--dayname">{dayName.toUpperCase()}</p>
        <p className="appointment-card--time">{time}</p>
        <p>{`Gydytojas: ${vetName} ${vetLastName}`}</p>
      </div>
    </Link>
  );
};

AppointmentCard.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
  dayName: PropTypes.string,
  appointmentId: PropTypes.number,
  vetLastName: PropTypes.string,
  vetName: PropTypes.string,
};
export default AppointmentCard;
