import PropTypes from "prop-types";
import FormInputBox from "./../../components/form-input-box.component";
import { useCreateNewPetMutation } from "../../services/api-slice";
import {
  selectionOptionsGender,
  selectionOptionsSpecies,
} from "../../data/selectionOptions";
import SelectionInput from "../../components/selection-input";
import { useDispatch } from "react-redux";
import { createNotificationAndRemove } from "../../store/notifications/notifications.reducer";
import {
  createNotificationObject,
  checkIfAtLeastOneInputHasNoValue,
} from "./../../utils/helper-fncs";
export const NewPetForm = ({ setShowing }) => {
  const [pet] = useCreateNewPetMutation();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const allInputs = Array.from(form.elements);

    if (checkIfAtLeastOneInputHasNoValue(allInputs)) {
      dispatch(
        createNotificationAndRemove(
          createNotificationObject(
            "Visi laukai privalo būti užpildyti!",
            "error"
          )
        )
      );
      return;
    }

    // From all inputs make single object
    const petDetails = allInputs.reduce((ac, element) => {
      ac[element.name] = element.value;
      return ac;
    }, {});

    pet(petDetails).then((response) => {
      if (response.error) {
        dispatch(
          createNotificationAndRemove(
            createNotificationObject(
              response.error.data.message,
              response.error.data.type
            )
          )
        );
      } else {
        setShowing(false);
        dispatch(
          createNotificationAndRemove(
            createNotificationObject(response.data.message, response.data.type)
          )
        );
      }
    });
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="new-pet-form">
      <div className="new-pet-form--heading">
        <h3>Sukurti nauja augintinį</h3>
        <span className="is-required">* - PRIVALOMA UŽPILDYTI</span>
      </div>
      <FormInputBox
        inputId={"pet_name"}
        inputName={"pet_name"}
        inputType={"text"}
        isRequired={true}
        label={"Augintinio vardas"}
      />
      <SelectionInput
        options={selectionOptionsSpecies}
        name={"pet_specie"}
        noSelectionText={"Pasirinkite gyvūno rūšį"}
      />
      <FormInputBox
        inputId={"pet_breed"}
        inputName={"pet_breed"}
        inputType={"text"}
        label={"Augintinio veislė"}
        isRequired={true}
      />
      <SelectionInput
        options={selectionOptionsGender}
        name={"pet_gender"}
        noSelectionText={"Pasirinkite gyvūno lytį"}
      />
      <FormInputBox
        inputId={"pet_age"}
        inputName={"pet_age"}
        inputType={"number"}
        label={"Augintinio amžius (metais)"}
        isRequired={true}
      />
      <FormInputBox
        inputId={"pet_weight"}
        inputName={"pet_weight"}
        inputType={"number"}
        label={"Augintinio svoris (kg)"}
        isRequired={true}
      />

      <button className="pink-button" type="submit">
        Sukurti
      </button>
    </form>
  );
};

NewPetForm.propTypes = {
  setShowing: PropTypes.func,
};
export default NewPetForm;
