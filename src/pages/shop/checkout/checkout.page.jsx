import { CheckoutCartItem } from "./checkout-cart-item.component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./checkout.style.css";
export const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalSum = cartItems?.reduce(
    (ac, cartItem) => ac + cartItem?.price * cartItem?.quantity,
    0
  );

  return (
    <main className="checkout">
      <h1 className="page-heading for-observer">Krepšelis</h1>
      <div
        className={`checkout__inner ${
          cartItems.length === 0 && "checkout__inner-empty"
        }`}
      >
        {cartItems.length > 0 ? (
          <>
            <div className="checkout__cart-items">
              {cartItems.map((item, index) => (
                <CheckoutCartItem
                  key={index}
                  itemId={item.id}
                  itemTitle={item.title}
                  itemUrl={item.image}
                  quantity={item.quantity}
                />
              ))}
            </div>
            <div className="checkout__side">
              <div className="checkout__side-contents">
                <h3>Bendra kaina</h3>
                <p className="checkout-total">{totalSum.toFixed(2)}€</p>
                <Link className="checkout-proceed" title={"Užsakyti"}>
                  Užsakyti
                </Link>
                <Link
                  to={"/parduotuve"}
                  className="checkout-back"
                  title={"Grįžti"}
                >
                  Grįžti į parduotuvę
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="checkout__empty-message">
              Jūsų krepšelis tuščias &#x1F614;
            </p>
            <Link to={"/parduotuve"} className="checkout-back">
              Grįžti į parduotuvę
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default Checkout;
