import { CheckoutCartItem } from "./cart-page-item.component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./cart.style.css";
export const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalSum = cartItems?.reduce(
    (ac, cartItem) => ac + cartItem?.price * cartItem?.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1 className="page-heading for-observer">Krepšelis</h1>
      <div
        className={`cart-page__inner ${
          cartItems.length === 0 && "cart-page__inner-empty"
        }`}
      >
        {cartItems.length > 0 ? (
          <>
            <div className="cart-page__cart-items">
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
            <div className="cart-page__side">
              <div className="cart-page__side-contents">
                <h3>Bendra kaina</h3>
                <p className="cart-page-total">{totalSum.toFixed(2)}€</p>
                <Link
                  to={"/uzsakymas-informacija"}
                  className="cart-page-proceed"
                  title={"Užsakyti"}
                >
                  Užsakyti
                </Link>
                <Link
                  to={"/parduotuve"}
                  className="cart-page-back"
                  title={"Grįžti"}
                >
                  Grįžti į parduotuvę
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="cart-page__empty-message">
              Jūsų krepšelis tuščias &#x1F614;
            </p>
            <Link to={"/parduotuve"} className="cart-page-back">
              Grįžti į parduotuvę
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default CartPage;
