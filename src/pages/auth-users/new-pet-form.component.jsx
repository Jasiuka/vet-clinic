import PropTypes from "prop-types";
import FormInputBox from "./../../components/form-input-box.component";
export const NewPetForm = () => {
  return (
    <form className="new-pet-form">
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
      <FormInputBox
        inputId={"pet_specie"}
        inputName={"pet_specie"}
        inputType={"text"}
        label={"Augintinio rūšis"}
        isRequired={true}
      />
      <FormInputBox
        inputId={"pet_breed"}
        inputName={"pet_breed"}
        inputType={"text"}
        label={"Augintinio veislė"}
        isRequired={true}
      />
      <FormInputBox
        inputId={"pet_gender"}
        inputName={"pet_gender"}
        inputType={"text"}
        label={"Augintinio lytis"}
        isRequired={true}
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

export default NewPetForm;
