import PropTypes from "prop-types";
export const CheckoutSelection = ({ labelText, inputName, inputId }) => {
  return (
    <>
      <input
        type="radio"
        id={inputId}
        name={inputName}
        className="radio-input"
      />
      <label className="selection-label" htmlFor={inputId}>
        <span className="selection-checkbox"></span>
        <span className="selection-label-text">{labelText}</span>
      </label>
    </>
  );
};

CheckoutSelection.propTypes = {
  labelText: PropTypes.string,
  inputName: PropTypes.string,
  inputId: PropTypes.string,
};
export default CheckoutSelection;
