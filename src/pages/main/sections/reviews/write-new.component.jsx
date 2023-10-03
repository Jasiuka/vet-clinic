import PawIcon from "./paw-icon";
import { useEffect, useState, useRef } from "react";

export const WriteNewForm = () => {
  const [activeIndexArray, setActiveIndexArray] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const pawArray = [1, 2, 3, 4, 5];
  const formRef = useRef(null);

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
  return (
    <form ref={formRef} className="reviews__write-new--form">
      <div>
        <input type="text" id="reviews-input" />
        <label htmlFor="reviews-input">Atsiliepimas</label>
      </div>
      <div>
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
      <button>Rašyti atsiliepimą</button>
    </form>
  );
};

export default WriteNewForm;
