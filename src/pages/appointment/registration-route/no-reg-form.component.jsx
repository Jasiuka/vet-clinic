import FormInputBox from "../../../components/form-input-box.component";
import PropTypes from "prop-types";
import SelectionInput from "../../../components/selection-input";
export const NoRegForm = ({
  appointmentDate,
  dayName,
  appointmentTime,
  handleSubmit,
}) => {
  const selectionOptionsSpecies = [
    {
      value: "Katė",
      displayText: "Katė",
    },
    {
      value: "Šuo",
      displayText: "Šuo",
    },
    {
      value: "Paukštis",
      displayText: "Paukštis",
    },
    {
      value: "Žiurkėnas",
      displayText: "Žiurkėnas",
    },
    {
      value: "Pelė",
      displayText: "Pelė",
    },
  ];

  const selectionOptionsGender = [
    {
      value: "Patinas",
      displayText: "Patinas",
    },
    {
      value: "Patelė",
      displayText: "Patelė",
    },
    {
      value: "Nežinoma",
      displayText: "Nežinoma",
    },
  ];

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="no-reg-form appointment-book-form"
      >
        <div className="no-reg-form__client appointment-book-form__client">
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
          <SelectionInput
            options={selectionOptionsSpecies}
            name={"reg_species"}
            noSelectionText={"Pasirinkite gyvūno rūšį"}
          />
          <FormInputBox
            inputId={"reg_breed"}
            inputName={"reg_breed"}
            inputType={"text"}
            label={"Augintinio veislė"}
            isRequired={true}
          />
          <FormInputBox
            inputId={"reg_age"}
            inputName={"reg_age"}
            inputType={"number"}
            label={"Augintinio amžius"}
            isRequired={true}
          />
        </div>
        <SelectionInput
          options={selectionOptionsGender}
          name={"reg_gender"}
          noSelectionText={"Pasirinkite gyvūno lytį"}
        />
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
  handleSubmit: PropTypes.func,
};
export default NoRegForm;
