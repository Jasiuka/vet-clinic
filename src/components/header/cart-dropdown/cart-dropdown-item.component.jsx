import PropTypes from "prop-types";
import { removeCartItem } from "../../../store/cart/cart.reducer";
import { useDispatch } from "react-redux";
export const CartDropdownItem = ({ id, quantity, title, image, price }) => {
  const dispatch = useDispatch();
  const handleClick = (id) => dispatch(removeCartItem(id));
  return (
    <div className="cart-dropdown-item">
      <img
        className="cart-dropdown-item--image"
        src={image}
        alt={`${title} produkto paveikslelis`}
      />
      <div className="cart-dropdown-item--details">
        <h5>{title}</h5>
        <div className="cart-dropdown-item--details__bottom">
          <span className="cart-dropdown-item--details__quantity item-details-text">
            {quantity < 2 ? "" : quantity}
          </span>
          <span>{quantity > 1 && "x"}</span>
          <span className="cart-dropdown-item--details__price item-details-text">
            {price}€
          </span>
        </div>
      </div>
      <button
        title="Pašalinti prekę"
        onClick={() => handleClick(id)}
        className="cart-dropdown-item--remove"
      >
        x
      </button>
    </div>
  );
};
CartDropdownItem.propTypes = {
  quantity: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
};
export default CartDropdownItem;
