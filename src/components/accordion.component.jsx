import propTypes from "prop-types";
export const AccordionItem = ({ title, text, isActive, clickHandler }) => {
  return (
    <div
      onClick={clickHandler}
      className={`accordion-item ${isActive ? "accordion-item-open" : ""}`}
    >
      <h4 className="accordion-item__heading">{title}</h4>
      <p
        className={`accordion-item__text ${
          isActive ? "accordion-item__text-open" : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
};

AccordionItem.propTypes = {
  title: propTypes.string,
  text: propTypes.string,
  isActive: propTypes.bool,
  clickHandler: propTypes.func,
};

export default AccordionItem;
