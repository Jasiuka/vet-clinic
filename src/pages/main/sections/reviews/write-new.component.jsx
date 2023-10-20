import PawIcon from "./paw-icon";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
export const WriteNewForm = ({ user, messageHandler }) => {
  const [activeIndexArray, setActiveIndexArray] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const pawArray = [1, 2, 3, 4, 5];
  const formRef = useRef(null);

  const handleMessageShow = () => {
    messageHandler(true);
    setTimeout(() => {
      messageHandler(false);
    }, 2000);
  };

  useEffect(() => {
    const formElement = formRef.current;
    formElement.addEventListener("click", (e) => {
      const target = e.target;
      if (target.closest("svg")) {
        const iconElement = target.closest("svg");
        const targetId = iconElement.getAttribute("data-id");
        if (targetId) {
          const newArray = getActivePawIndexArray(targetId);
          setActiveIndexArray(newArray);
          setSelectedRating(targetId);
        }
      }
    });
  }, []);

  const getActivePawIndexArray = (elementIndex) => {
    let array = [];
    let j = 0;
    for (let i = 1; i <= elementIndex; i++) {
      const indexToAdd = i;
      array[j] = indexToAdd;
      j++;
    }
    return array;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const reviewToSend = {
      reviewText: form.review.value,
      rating: selectedRating,
      email: user.email,
      name: user.name,
    };

    fetch("/api/v1/reviews", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(reviewToSend),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        response.status === 200 && handleMessageShow();
        response.status === 400 &&
          response
            .json()
            .then((errorMess) => console.log(errorMess.errorMessage));
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <form
      onSubmit={(e) => handleOnSubmit(e)}
      ref={formRef}
      className="reviews__write-new--form"
    >
      <div>
        <textarea
          name="review"
          maxLength={"1000"}
          placeholder="Jūsų atsiliepimas.."
          type="text"
          id="reviews-input"
        />
      </div>
      <div>
        <p>Jūsų įvertinimas:</p>
        {pawArray.map((index) => {
          return (
            <PawIcon
              key={index}
              uniqueClassName={`write-paw-icon`}
              id={index}
              isActive={activeIndexArray.includes(index)}
            />
          );
        })}
      </div>
      <button className="pink-button">Rašyti atsiliepimą</button>
    </form>
  );
};

WriteNewForm.propTypes = {
  user: PropTypes.object,
  messageHandler: PropTypes.func,
};
export default WriteNewForm;
