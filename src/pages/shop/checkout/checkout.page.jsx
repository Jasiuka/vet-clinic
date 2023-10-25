import { Link } from "react-router-dom";
import FormInputBox from "./../../../components/form-input-box.component";
import CheckoutSelection from "./checkout-selection.component";
import "./checkout.style.css";
export const Checkout = () => {
  return (
    <main className="checkout">
      <h1 className="page-heading">Užsakymas</h1>
      <form className="checkout__form">
        <div className="checkout__user-box checkout__box">
          <h2 className="checkout__box--heading">Vartotojo informacija</h2>
          <div className="checkout__user-new-client-box">
            <p>Naujas klientas?</p>
            <Link>Prisijunk</Link>
          </div>
          <div className="checkout__box-main">
            <FormInputBox
              isRequired={true}
              label={"Vardas Pavardė"}
              inputId={"checkout__name"}
              inputName={"checkout__name"}
              inputType={"text"}
              uniqueClassName={"checkout__input"}
            />
            <FormInputBox
              isRequired={true}
              label={"El. Paštas"}
              inputId={"checkout__email"}
              inputName={"checkout__email"}
              inputType={"email"}
              uniqueClassName={"checkout__input"}
            />
            <FormInputBox
              isRequired={true}
              label={"Telefonas (+370..)"}
              inputId={"checkout__phone"}
              inputName={"checkout__phone"}
              inputType={"phone"}
              uniqueClassName={"checkout__input checkout__phone"}
            />
          </div>
        </div>
        <div className="checkout__shipping-box checkout__box">
          <h2 className="checkout__box--heading">Pristatymas</h2>
          <div className="checkout__box-main">
            <CheckoutSelection
              inputId={"checkout__shop"}
              inputName={"checkout__shipping"}
              labelText={"Atsiėmimas klinikoje"}
            />
            <CheckoutSelection
              inputId={"checkout__courier"}
              inputName={"checkout__shipping"}
              labelText={"Pristatymas kurjeriu nurodytu adresu"}
            />
          </div>
        </div>
        <div className="checkout__payment-box checkout__box">
          <h2 className="checkout__box--heading">Apmokėjimas</h2>
          <div className="checkout__box-main">
            <CheckoutSelection
              inputId={"checkout__at-shop"}
              inputName={"checkout__payment"}
              labelText={"Atsiskaitymas klinikoje atsiimant"}
            />
            <CheckoutSelection
              inputId={"checkout__card"}
              inputName={"checkout__payment"}
              labelText={"Atsiskaitymas kortele"}
            />
          </div>
        </div>
        <div className="checkout__order-box checkout__box">
          <h2 className="checkout__box--heading">Užsakymo informacija</h2>
        </div>
      </form>
    </main>
  );
};

export default Checkout;
