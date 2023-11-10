import FormInputBox from "../../../components/form-input-box.component";
import PropTypes from "prop-types";
import SelectionInput from "../../../components/selection-input";
export const AuthenticatedForm = ({
  appointmentDate,
  dayName,
  appointmentTime,
  handleSubmit,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="appointment-book-form">
      <div className="appointment-book-form__client"></div>
    </form>
  );
};
AuthenticatedForm.propTypes = {
  appointmentDate: PropTypes.string,
  dayName: PropTypes.string,
  appointmentTime: PropTypes.string,
  handleSubmit: PropTypes.func,
};
export default AuthenticatedForm;
