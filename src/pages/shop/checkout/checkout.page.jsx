import { CheckoutCartItem } from "./checkout-cart-item.component";
import { useSelector } from "react-redux";
import "./checkout.style.css";
export const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalSum = cartItems.reduce(
    (ac, cartItem) => ac + cartItem.price * cartItem.quantity,
    0
  );

  return (
    <main className="checkout">
      <h1 className="page-heading for-observer">Krepšelis</h1>
      <div className="checkout__inner">
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
            <button className="checkout-proceed" title={"Užsakyti"}>
              Užsakyti
            </button>
            <button className="checkout-back" title={"Grįžti"}>
              Grįžti
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
