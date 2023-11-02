import FormInputBox from "../../../components/form-input-box.component";
import PropTypes from "prop-types";
export const NoRegForm = ({ appointmentDate, dayName, appointmentTime }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target);
  };
  return (
    <>
      <span className="is-required">* - PRIVALOMA UŽPILDYTI</span>

      <form onSubmit={(e) => handleSubmit(e)} className="no-reg-form">
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
            isRequired={true}
          />
        </div>
        <div className="no-reg-form__pet">
          <select>
            <option>
              Pasirinkite gyvūno rūšį<span>*</span>
            </option>
            <option>Katė</option>
            <option>Šuo</option>
            <option>Paukštis</option>
            <option>Žiūrkėnas</option>
            <option>Pelė</option>
          </select>
          <FormInputBox
            inputId={"reg_breed"}
            inputName={"reg_breed"}
            inputType={"text"}
            label={"Augintinio veislė"}
            isRequired={true}
          />
          <FormInputBox
            inputId={"reg_years"}
            inputName={"reg_years"}
            inputType={"number"}
            label={"Augintinio amžius"}
            isRequired={true}
          />
        </div>
        <FormInputBox
          inputId={"reg_description"}
          inputName={"reg_description"}
          inputType={"text"}
          label={"Vizito priežastis"}
          uniqueClassName={"description-input-box"}
          isRequired={true}
        />
        <button type="submit">Registruotis</button>
      </form>
    </>
  );
};

NoRegForm.propTypes = {
  appointmentDate: PropTypes.string,
  dayName: PropTypes.string,
  appointmentTime: PropTypes.string,
};
export default NoRegForm;
