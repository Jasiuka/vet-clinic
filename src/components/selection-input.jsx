import propTypes from "prop-types";
export const SelectionInput = ({ options, name, noSelectionText }) => {
  return (
    <select required name={name}>
      <option value={null}>{noSelectionText}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.displayText}
        </option>
      ))}
    </select>
  );
};

SelectionInput.propTypes = {
  options: propTypes.array,
  name: propTypes.string,
  noSelectionText: propTypes.string,
};
export default SelectionInput;
