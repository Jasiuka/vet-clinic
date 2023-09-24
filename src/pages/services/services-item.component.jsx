import PropTypes from "prop-types";
export const ServicesItem = ({ name, description, price, forType }) => {
  return (
    <div className="services-item">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Kaina: {price} eur.</p>
      <p>Skirta: {forType}</p>
    </div>
  );
};

ServicesItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.any,
  forType: PropTypes.string,
};
export default ServicesItem;
