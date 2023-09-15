import PropTypes from "prop-types";

export const WhyUsItem = ({ IconComponent, text, heading }) => {
  return (
    <div className="why-us__item">
      {IconComponent}
      <p className="why-us__item-heading">{heading}</p>
      <span className="why-us__item-text">{text}</span>
    </div>
  );
};

WhyUsItem.propTypes = {
  IconComponent: PropTypes.node,
  text: PropTypes.string,
  heading: PropTypes.string,
};

export default WhyUsItem;
