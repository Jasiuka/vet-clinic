import PropTypes from "prop-types";

export const ServicesSectionItem = ({ imageLink, name, imageAlt }) => {
  return (
    <div className="services-section__item">
      <img
        className="services-section__item-img"
        src={`${imageLink}`}
        alt={imageAlt}
      />
      <h4 className="services-section__item-name">{name}</h4>
    </div>
  );
};

ServicesSectionItem.propTypes = {
  imageLink: PropTypes.string,
  name: PropTypes.string,
  specialty: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default ServicesSectionItem;
