import FormInputBox from "../../../components/form-input-box.component";
import PropTypes from "prop-types";
export const NoRegForm = ({ appointmentDate, dayName, appointmentTime }) => {
  return (
    <form className="no-reg-form">
      <div className="no-reg-form__client">
        <FormInputBox
          inputId={"reg_date"}
          inputName={"reg_date"}
          inputType={"text"}
          label={"Vizito data"}
          isDisabled={true}
          isValue={`${appointmentDate} (${dayName})`}
        />
        <FormInputBox
          inputId={"reg_time"}
          inputName={"reg_time"}
          inputType={"text"}
          label={"Vizito laikas"}
          isDisabled={true}
          isValue={appointmentTime}
        />
        <FormInputBox
          inputId={"reg_email"}
          inputName={"reg_email"}
          inputType={"email"}
          label={"Jūsų el. Paštas"}
        />
      </div>
      <div className="no-reg-form__pet">
        <FormInputBox
          inputId={"reg_specie"}
          inputName={"reg_specie"}
          inputType={"text"}
          label={"Augintinio rūšis"}
        />
        <FormInputBox
          inputId={"reg_breed"}
          inputName={"reg_breed"}
          inputType={"text"}
          label={"Augintinio veislė"}
        />
        <FormInputBox
          inputId={"reg_years"}
          inputName={"reg_years"}
          inputType={"number"}
          label={"Augintinio amžius"}
        />
      </div>
      <FormInputBox
        inputId={"reg_description"}
        inputName={"reg_description"}
        inputType={"text"}
        label={"Vizito priežastis"}
        uniqueClassName={"description-input-box"}
      />
      <button type="submit">Registruotis</button>
    </form>
  );
};

NoRegForm.propTypes = {
  appointmentDate: PropTypes.string,
  dayName: PropTypes.string,
  appointmentTime: PropTypes.string,
};
export default NoRegForm;
