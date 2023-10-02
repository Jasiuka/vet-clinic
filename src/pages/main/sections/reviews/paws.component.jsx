import PawIcon from "./paw-icon";
import PropTypes from "prop-types";
export const Paws = ({ rating }) => {
  return (
    <div className="reviews__paws">
      <p>{`Įvertino ${rating}/5`}</p>
      {Array(rating).fill(<PawIcon />)}
    </div>
  );
};

Paws.propTypes = {
  rating: PropTypes.number,
};
export default Paws;
