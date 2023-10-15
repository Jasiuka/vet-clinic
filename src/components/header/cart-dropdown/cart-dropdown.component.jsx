import PropTypes from "prop-types";
import CartDropdownItem from "./cart-dropdown-item.component";
import { useSelector } from "react-redux";
export const CartDropdown = ({ isCartOpen }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className={`cart-dropdown ${isCartOpen && "cart-dropdown-open"} `}>
      {cartItems.map((cartItem, index) => (
        <CartDropdownItem
          key={index}
          title={cartItem.title}
          quantity={cartItem.quantity}
          image={cartItem.image}
          price={cartItem.price}
        />
      ))}
    </div>
  );
};
CartDropdown.propTypes = {
  isCartOpen: PropTypes.bool,
};
export default CartDropdown;
