import PropTypes from "prop-types";
import { addItemToCart } from "../../store/cart/cart.reducer";
import { useDispatch } from "react-redux";
export const ProductCard = ({ id, title, price, image }) => {
  const dispatch = useDispatch();

  const handleToCartClick = () => {
    const productObject = {
      id: id,
      title: title,
      price: price,
      image: image,
    };

    dispatch(addItemToCart(productObject));
  };
  return (
    <div className="shop__product-card">
      <img
        className="shop__product-card--img"
        src={`${image}`}
        alt={`${title} produkto paveikslėlis`}
      />
      <div className="shop__product-card--bottom">
        <h3 className="shop__product-card--title">{title}</h3>
        <p className="shop__product-card--price">{`${price}€`}</p>
      </div>
      <div className="shop__product-card--hover-content">
        <button
          title="Detaliau apie prekę"
          className="shop__product-card--button-more product-card-button"
        >
          Detaliau
        </button>
        <button
          title="Pridėti prekę į krepšelį"
          onClick={handleToCartClick}
          className="shop__product-card--button-shop product-card-button"
        >
          Į krepšelį
        </button>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
};

export default ProductCard;
