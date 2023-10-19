import PawIcon from "./paw-icon";
import PropTypes from "prop-types";
export const Paws = ({ rating }) => {
  return (
    <div className="reviews__paws">
      {[...new Array(rating)].map((_, index) => (
        <PawIcon key={index} uniqueClassName={"paw-icon"} />
      ))}
    </div>
  );
};

Paws.propTypes = {
  rating: PropTypes.number,
};
export default Paws;
