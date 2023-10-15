import PropTypes from "prop-types";
export const CartDropdownItem = ({ quantity, title, image, price }) => {
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
    </div>
  );
};
CartDropdownItem.propTypes = {
  quantity: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
};
export default CartDropdownItem;
