import FormInputBox from "../../../components/form-input-box.component";
import PropTypes from "prop-types";
import SelectionInput from "../../../components/selection-input";
import { Link } from "react-router-dom";
import { useGetAllUserPetsIdsQuery } from "../../../services/api-slice";
export const AuthenticatedForm = ({
  appointmentDate,
  dayName,
  appointmentTime,
  handleSubmit,
}) => {
  const { data, error, isLoading } = useGetAllUserPetsIdsQuery();

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className=" auth-form appointment-book-form"
    >
      <div className="auth-form__client appointment-book-form__client">
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
          isDisabled={!data?.length}
        />
        <SelectionInput
          options={data?.map(({ petID, petName }) => {
            return { value: petID, displayText: petName };
          })}
          name={"reg_pet"}
          noSelectionText={
            data?.length
              ? "Pasirinkite savo augintinį*"
              : "Neturite susikūre savo augintinio profilio"
          }
        />
        {!data?.length && (
          <Link className="pink-button" to={"/mano-augintiniai"}>
            Susikurti augintinio profilį
          </Link>
        )}
      </div>
      <FormInputBox
        inputId={"reg_description"}
        inputName={"reg_description"}
        inputType={"text"}
        label={"Vizito priežastis"}
        uniqueClassName={"description-input-box"}
        isRequired={true}
        isDisabled={!data?.length}
      />
      <button disabled={!data?.length} type="submit">
        Registruotis
      </button>
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
