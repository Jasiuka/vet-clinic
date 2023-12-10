import { Link } from "react-router-dom";
import FormInputBox from "./../../../components/form-input-box.component";
import CheckoutSelection from "./checkout-selection.component";
import {
  usePostOrderMutation,
  useGetUserDetailsQuery,
} from "../../../services/api-slice";
import { useEffect, useState } from "react";
import "./checkout.style.css";
import { useSelector } from "react-redux";
import { CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/spinner.component";
import { checkIfAtLeastOneInputHasNoValue } from "../../../utils/helper-fncs";
import useCreateNotification from "../../../utils/hooks/createNotification.hook";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../store/cart/cart.reducer";
export const Checkout = () => {
  const { createNotification } = useCreateNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shipmentCost, setShipmentCost] = useState(0);
  const [payment, setPayment] = useState("");
  const cartState = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const totalSum = Number(cartState.total) + Number(shipmentCost);

  const [order, { isLoading, isSuccess }] = usePostOrderMutation();
  const { data: userDetails } = useGetUserDetailsQuery();

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    let orderObject;
    const form = event.target;

    const email = form.checkout__email.value;
    const fullName = form.checkout__name.value;
    const phone = form.checkout__phone.value;
    const payment = form.checkout__payment.value;
    const shipping = form.checkout__shipping.value;
    const rules = form.checkout__rules.checked;

    const userDetailsEmpty = checkIfAtLeastOneInputHasNoValue(null, [
      email,
      fullName,
      phone,
    ]);

    if (userDetailsEmpty) {
      createNotification("Prašome užpildyti savo asmens duomenis!", "error");
      return;
    }

    if (shipping == 2.99) {
      const city = form.checkout__city.value;
      const address = form.checkout__address.value;
      const postal = form.checkout__code.value;

      if (checkIfAtLeastOneInputHasNoValue(null, [city, address, postal])) {
        createNotification(
          "Prašome užpildyti savo gyvenamosis vietos duomenis!",
          "error"
        );
        return;
      } else {
        orderObject = {
          products: cartState.cartItems,
          state: false,
          email,
          fullName,
          phone,
          payment,
          price: totalSum,
          shippingPrice: shipping,
          rules,
          city,
          address,
          postal,
        };
      }
    } else {
      orderObject = {
        products: cartState.cartItems,
        state: false,
        email,
        fullName,
        phone,
        payment,
        price: totalSum,
        shippingPrice: shipping,
        rules,
      };
    }
    if (!rules) {
      createNotification("Turite sutikti su taisyklėmis", "error");
      return;
    }
    try {
      const response = await order(orderObject);
      if (response?.error) {
        const data = response.error.data;
        createNotification(data.message, data.type);
      } else {
        dispatch(clearCart());
        navigate("/uzsakymas-patvirtintas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cartState.cartItems.length === 0 && !isSuccess) {
      navigate("/nerastas");
    }
  });

  const handleSetShipmentCost = (price) => setShipmentCost(Number(price));
  const handleSetPayment = (type) => setPayment(type);

  return (
    <main className="checkout">
      <h1 className="page-heading ">Užsakymas</h1>
      <>
        {isLoading && <Spinner message={"Kraunama.."} />}

        <form
          onSubmit={(event) => handleSubmitOrder(event)}
          className="checkout__form checkout__inner"
        >
          <div className="checkout__form-left">
            <div className="checkout__user-box checkout__box">
              <h2 className="checkout__box--heading">Vartotojo informacija</h2>
              {user ? (
                ""
              ) : (
                <div className="checkout__user-new-client-box">
                  <p>Naujas klientas?</p>
                  <Link to={"/prisijungti"}>Prisijunk!</Link>
                </div>
              )}
              <div className="checkout__user-box-bottom">
                <FormInputBox
                  isRequired={true}
                  label={"Vardas Pavardė"}
                  inputId={"checkout__name"}
                  inputName={"checkout__name"}
                  inputType={"text"}
                  uniqueClassName={"checkout__input"}
                  isValue={
                    userDetails
                      ? userDetails.userName + " " + userDetails.lastName
                      : ""
                  }
                />
                <FormInputBox
                  isRequired={true}
                  label={"El. Paštas"}
                  inputId={"checkout__email"}
                  inputName={"checkout__email"}
                  inputType={"email"}
                  uniqueClassName={"checkout__input"}
                  isValue={userDetails ? userDetails.email : ""}
                />
                <FormInputBox
                  isRequired={true}
                  label={"Telefonas (+370..)"}
                  inputId={"checkout__phone"}
                  inputName={"checkout__phone"}
                  inputType={"phone"}
                  uniqueClassName={"checkout__input checkout__phone"}
                  isValue={userDetails ? userDetails.phone : ""}
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
                  optional={`${0}€`}
                  value={0}
                  setValue={handleSetShipmentCost}
                />
                <CheckoutSelection
                  inputId={"checkout__courier"}
                  inputName={"checkout__shipping"}
                  labelText={"Pristatymas kurjeriu nurodytu adresu"}
                  optional={`${2.99}€`}
                  value={2.99}
                  setValue={handleSetShipmentCost}
                />
                {shipmentCost !== 0 && (
                  <div className="checkout__courier-selected checkout__selected-box">
                    <FormInputBox
                      uniqueClassName={"checkout__input"}
                      isRequired={true}
                      label={"Miestas"}
                      inputId={"checkout__city"}
                      inputName={"checkout__city"}
                      inputType={"text"}
                    />
                    <FormInputBox
                      uniqueClassName={"checkout__input"}
                      isRequired={true}
                      label={"Adresas"}
                      inputId={"checkout__address"}
                      inputName={"checkout__address"}
                      inputType={"text"}
                    />
                    <FormInputBox
                      uniqueClassName={"checkout__input"}
                      label={"Pašto kodas (tik skaičiai)"}
                      inputId={"checkout__code"}
                      inputName={"checkout__code"}
                      inputType={"number"}
                      isRequired={true}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="checkout__payment-box checkout__box">
              <h2 className="checkout__box--heading">Apmokėjimas</h2>
              <div className="checkout__box-main">
                <CheckoutSelection
                  inputId={"checkout__at-shop"}
                  inputName={"checkout__payment"}
                  labelText={
                    "Atsiskaitymas bankine kortele arba grynais atsiimant užsakymą"
                  }
                  value={"clinic"}
                  setValue={handleSetPayment}
                />
                <CheckoutSelection
                  inputId={"checkout__card"}
                  inputName={"checkout__payment"}
                  labelText={"Atsiskaitymas bankine kortele"}
                  value={"card"}
                  setValue={handleSetPayment}
                />
                {payment === "card" && <CardElement />}
              </div>
            </div>
            <div className="checkout__order-box checkout__box">
              <h2 className="checkout__box--heading">Užsakymo informacija</h2>
              <div className="checkout__box-main checkout__details-box">
                <p>
                  Suma už prekes: <span>{cartState.total}€</span>
                </p>
                <p>
                  Pristatymas <span>{shipmentCost}€</span>
                </p>
                <p>
                  Iš viso <span>{totalSum}€</span>
                </p>
              </div>
            </div>
          </div>

          <div className="checkout__form-right">
            <div className="checkout__form-right-price">
              <h3>Bendra kaina</h3>
              <p>{totalSum}€</p>
            </div>
            <div className="checkout__form-right-rules">
              <input
                name="checkout__rules"
                id="rules"
                value={true}
                type="checkbox"
              />
              <label htmlFor="rules">
                Patvirtinu, kad susipažinau ir sutinku su „Laimingos Letenėlės”
                taisyklėmis ir privatumo politika
              </label>
            </div>
            <button
              title="Užsakyti"
              className="pink-button checkout__submit"
              type="submit"
            >
              Užsakyti
            </button>
            <Link className="checkout__back" to={"/krepselis"}>
              Grįžti į krepšelį
            </Link>
          </div>
        </form>
      </>
    </main>
  );
};

export default Checkout;
