import PawIcon from "./paw-icon";
import PropTypes from "prop-types";
export const Paws = ({ rating }) => {
  return (
    <div className="reviews__paws">
      {Array(rating).fill(<PawIcon uniqueClassName={"paw-icon"} />)}
    </div>
  );
};

Paws.propTypes = {
  rating: PropTypes.number,
};
export default Paws;
