import Paws from "./paws.component";
import PropTypes from "prop-types";

export const Slider = ({ sliderData, currentSlide }) => {
  return (
    <div className="reviews__slider">
      {sliderData.map((sliderItem, index) => {
        return (
          <div
            key={index}
            data-slide-number={index}
            className={`reviews__slider-data ${
              index === currentSlide ? "slide-active" : ""
            }`}
          >
            <p className="reviews__slider-name">{sliderItem.userName}</p>
            <span className="reviews__slider-review">
              {sliderItem.reviewText}
            </span>
            <Paws rating={sliderItem.stars} />
          </div>
        );
      })}
    </div>
  );
};

Slider.propTypes = {
  sliderData: PropTypes.array,
  currentSlide: PropTypes.number,
};

export default Slider;
