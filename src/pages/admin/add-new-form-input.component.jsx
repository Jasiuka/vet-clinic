import PropTypes from "prop-types";
export const AddNewFormInput = ({ label, inputType, inputId, inputName }) => {
  return (
    <div className="selection__add-new-form--wrapper">
      <input
        className="add-new-form__input"
        type={inputType}
        id={inputId}
        name={inputName}
        disabled={inputId.toLowerCase() === "id"}
      />
      <label htmlFor={inputId} className="add-new-form__label">
        {label}
      </label>
    </div>
  );
};
AddNewFormInput.propTypes = {
  label: PropTypes.string,
  inputType: PropTypes.string,
  inputId: PropTypes.string,
  inputName: PropTypes.string,
};

export default AddNewFormInput;
