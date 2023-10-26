import PropTypes from "prop-types";
export const CheckoutSelection = ({
  labelText,
  inputName,
  inputId,
  optional,
  value,
  setValue,
}) => {
  return (
    <>
      <div className="selection">
        <input
          onChange={(e) => setValue(e.target.value)}
          type="radio"
          id={inputId}
          name={inputName}
          className="radio-input"
          value={value}
        />
        <label className="selection-label" htmlFor={inputId}>
          <span className="selection-checkbox"></span>
          <span className="selection-label-text">{labelText}</span>
          <span className="selection-optional">{optional}</span>
        </label>
      </div>
    </>
  );
};

CheckoutSelection.propTypes = {
  labelText: PropTypes.string,
  inputName: PropTypes.string,
  inputId: PropTypes.string,
  optional: PropTypes.any,
  value: PropTypes.any,
  setValue: PropTypes.func,
};
export default CheckoutSelection;
