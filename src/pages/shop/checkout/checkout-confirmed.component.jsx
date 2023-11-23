import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const CheckoutConfirmed = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  });

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
  }, [timeLeft]);
  return (
    <div className="checkout__confirmed">
      <h2>
        Jūsų užsakymas gautas. Jums išsiųstas laiškas su užsakymo patvirtinimu.
      </h2>
      <h3>
        Už <span>{timeLeft}</span> sekundžių būsite perkeltas į pagrindinį
        puslapį
      </h3>
    </div>
  );
};

export default CheckoutConfirmed;
