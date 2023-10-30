import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export const VetAppointmentCard = ({ petId, petName, date, time, species }) => {
  return (
    <div className="vet-appointments__card">
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
        <Link
          className="vet-appointments__card-link"
          to={`/augintinis/${petName}/${petId}`}
        >
          {petName}
        </Link>
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
