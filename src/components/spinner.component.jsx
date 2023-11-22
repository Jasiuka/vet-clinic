import propTypes from "prop-types";
export const Spinner = ({ message }) => {
  return (
    <div className="spinner">
      <div className="spinner__overlay"></div>
      <div className="spinner__wrapper">
        <span className="spinner__element"></span>
        <p>{message}</p>
      </div>
    </div>
  );
};
Spinner.propTypes = {
  message: propTypes.string,
};
export default Spinner;
