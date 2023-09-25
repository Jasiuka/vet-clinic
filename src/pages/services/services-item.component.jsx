import PropTypes from "prop-types";
export const ServicesItem = ({ name, description, price, forType }) => {
  return (
    <div className="services-item">
      <h3>{name}</h3>
      <p className="services-item__description">{description}</p>
      <p className="services-item__price">Kaina: {price} eur.</p>
      <p className="services-item__for-type">{forType}</p>
    </div>
  );
};

ServicesItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.any,
  forType: PropTypes.array,
};
export default ServicesItem;
