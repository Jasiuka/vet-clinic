import PropTypes from "prop-types";
import CartDropdownItem from "./cart-dropdown-item.component";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const CartDropdown = ({ isCartOpen }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.total);

  return (
    <div className={`cart-dropdown ${isCartOpen && "cart-dropdown-open"} `}>
      {cartItems.length === 0 ? (
        <p>Jūsų krepšelis tuščias</p>
      ) : (
        <>
          <div className="cart-dropdown__items">
            {cartItems.map((cartItem, index) => (
              <CartDropdownItem
                key={index}
                title={cartItem.title}
                quantity={cartItem.quantity}
                image={cartItem.image}
                price={cartItem.price}
                id={cartItem.id}
              />
            ))}
          </div>
          <div className="cart-dropdown__bottom">
            <p className="cart-dropdown__bottom-total">
              Iš viso suma: {cartTotal}
              {"€"}
            </p>
            <Link className="cart-dropdown__bottom-button" to={"/krepselis"}>
              Pirkti &gt;
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
CartDropdown.propTypes = {
  isCartOpen: PropTypes.bool,
};
export default CartDropdown;
