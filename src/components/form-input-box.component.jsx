import { useState } from "react";
import PropTypes from "prop-types";

export const FormInputBox = ({
  label,
  inputId,
  inputType,
  inputName,
  isDisabled = false,
  isValue = "",
  uniqueClassName,
  isRequired,
}) => {
  const [isLabelMoved, setIsLabelMoved] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={`form-container ${uniqueClassName}`}>
      <input
        id={inputId}
        className={`form-input`}
        type={inputType}
        onFocus={() => setIsLabelMoved(true)}
        onBlur={() => setIsLabelMoved(false)}
        onChange={(e) => setInputValue(e.target.value)}
        value={isValue ? isValue : inputValue}
        name={inputName}
        disabled={isDisabled}
        required={isRequired}
      />
      <label
        htmlFor={inputId}
        className={`form-label ${
          isLabelMoved || inputValue.length > 0 || isValue
            ? "form-label-moved"
            : ""
        }`}
      >
        {`${label}`} {isRequired && <span className="is-required">*</span>}
      </label>
    </div>
  );
};

FormInputBox.propTypes = {
  label: PropTypes.string,
  inputId: PropTypes.string,
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  isDisabled: PropTypes.bool,
  isValue: PropTypes.string,
  uniqueClassName: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default FormInputBox;
