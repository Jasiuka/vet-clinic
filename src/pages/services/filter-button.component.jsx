import PropTypes from "prop-types";
export const FilterButton = ({
  icon,
  whatFor,
  isActive,
  handleClick,
  index,
}) => {
  return (
    <button
      onClick={() => handleClick(index)}
      className={`filter-button ${isActive ? "filter-button-active" : ""}`}
    >
      <div>{icon}</div>
      <p>{whatFor}</p>
    </button>
  );
};

FilterButton.propTypes = {
  icon: PropTypes.any,
  whatFor: PropTypes.string,
  isActive: PropTypes.bool,
  handleClick: PropTypes.func,
  index: PropTypes.any,
};
export default FilterButton;
