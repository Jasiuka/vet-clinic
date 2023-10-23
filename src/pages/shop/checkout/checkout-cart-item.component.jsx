import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addItemToCart,
} from "../../../store/cart/cart.reducer";
export const CheckoutCartItem = ({ itemUrl, itemTitle, quantity, itemId }) => {
  const dispatch = useDispatch();
  const handleRemoveClick = (id) => dispatch(removeCartItem(id));
  const handleIncrement = (id) => dispatch(addItemToCart(id));
  return (
    <div className="checkout__cart-item">
      <img className="checkout__cart-item--image" src={itemUrl} />
      <div className="checkout__cart-item--details">
        <h2 className="checkout__cart-item--title">{itemTitle}</h2>
      </div>
      <div className="checkout__cart-item--quantity-box">
        <button title="Atimti">-</button>
        <p>{quantity}</p>
        <button title="Pridėti">+</button>
      </div>
      <button onClick={handleRemoveClick} className="Panaikinti prekę">
        X
      </button>
    </div>
  );
};
CheckoutCartItem.propTypes = {
  itemUrl: PropTypes.string,
  itemTitle: PropTypes.string,
  quantity: PropTypes.number,
  itemId: PropTypes.number,
};
export default CheckoutCartItem;
