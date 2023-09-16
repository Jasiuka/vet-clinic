import PropTypes from "prop-types";

export const WhyUsItem = ({ IconComponent, text, heading }) => {
  return (
    <div className="why-us__item">
      {IconComponent}
      <h3 className="why-us__item-heading">{heading}</h3>
      <p className="why-us__item-text">{text}</p>
    </div>
  );
};

WhyUsItem.propTypes = {
  IconComponent: PropTypes.node,
  text: PropTypes.string,
  heading: PropTypes.string,
};

export default WhyUsItem;
