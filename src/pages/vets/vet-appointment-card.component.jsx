import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export const VetAppointmentCard = ({ petId, petName, date, time, species }) => {
  const [isPast, setIsPast] = useState(false);
  useEffect(() => {
    const appointmentDate = new Date(date).getTime();
    const today = new Date().getTime();
    if (appointmentDate < today) {
      setIsPast(true);
    }
  }, []);
  return (
    <div className={`vet-appointments__card ${isPast ? "past-date" : ""}`}>
      <div className="vet-appointments__card-box">
        <p className="vet-appointments__card-details">
          Data: <span>{date}</span>
        </p>
        <p className="vet-appointments__card-details">
          Laikas: <span>{time}</span>
        </p>
      </div>
      <div className="vet-appointments__card-box">
        <h3 className="vet-appointments__card-species">{species}</h3>
        {petName ? (
          <Link
            className="vet-appointments__card-link"
            to={`/augintinis/${petName}/${petId}`}
          >
            {petName}
          </Link>
        ) : (
          <p className="vet-appointments__card-not-reg">Neregistruotas</p>
        )}
      </div>
    </div>
  );
};

VetAppointmentCard.propTypes = {
  petId: PropTypes.number,
  petName: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  species: PropTypes.string,
};
export default VetAppointmentCard;
