import { useState } from "react";
import PropTypes from "prop-types";

export const FormInputBox = ({ label, inputId, inputType, inputName }) => {
  const [isLabelMoved, setIsLabelMoved] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="form-container">
      <input
        id={inputId}
        className="form-input"
        type={inputType}
        onFocus={() => setIsLabelMoved(true)}
        onBlur={() => setIsLabelMoved(false)}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        name={inputName}
      />
      <label
        htmlFor={inputId}
        className={`form-label ${
          isLabelMoved || inputValue.length > 0 ? "form-label-moved" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};

FormInputBox.propTypes = {
  label: PropTypes.string,
  inputId: PropTypes.string,
  inputType: PropTypes.string,
  inputName: PropTypes.string,
};

export default FormInputBox;
