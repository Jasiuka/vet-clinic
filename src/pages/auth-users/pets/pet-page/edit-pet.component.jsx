import FormInputBox from "../../../../components/form-input-box.component";
import { useEditPetMutation } from "../../../../services/api-slice";
import propTypes from "prop-types";
export const EditPetModal = ({ details, handlePopup, notificationHandler }) => {
  const [editPet, { isLoading }] = useEditPetMutation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const age = form.pet_age.value;
    const weight = form.pet_weight.value;

    editPet({ age, weight, id: details.id }).then((response) => {
      if (response.error) {
        const { message, type } = response.error.data;
        notificationHandler(message, type);
      } else {
        const { message, type } = response.data;
        notificationHandler(message, type);
        handlePopup({
          state: false,
          type: "",
          details: null,
        });
      }
    });
  };

  return (
    <dialog className="edit-pet" open>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h2>Redaguoti {details.name} profilį </h2>
        <FormInputBox
          label={"Amžius"}
          inputId={"pet_age"}
          inputType={"number"}
          inputName={"pet_age"}
        />
        <FormInputBox
          label={"Svoris"}
          inputId={"pet_weight"}
          inputType={"number"}
          inputName={"pet_weight"}
        />
        <button className="pink-button" type="submit">
          Redaguoti
        </button>
      </form>
      <button
        onClick={() => handlePopup({ state: false, type: "", details: null })}
        className="edit-pet-close "
        title="Uždaryti"
      >
        X
      </button>
    </dialog>
  );
};
EditPetModal.propTypes = {
  details: propTypes.object,
  handlePopup: propTypes.func,
  notificationHandler: propTypes.func,
};
export default EditPetModal;
