import Slider from "../components/slider.component";
import { useState } from "react";
export const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = [
    {
      name: "Linas",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper lacus vel vulputate efficitur. Sed nec purus pellentesque, porta diam ac, venenatis neque. Pellentesque sed quam sit amet arcu dignissim gravida eget fringilla quam. Maecenas faucibus purus ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis.",
    },
    {
      name: "Aistė",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper lacus vel vulputate efficitur. Sed nec purus pellentesque, porta diam ac, venenatis neque. Pellentesque sed quam sit amet arcu dignissim gravida eget fringilla quam. Maecenas faucibus purus ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper lacus vel vulputate efficitur. Sed nec purus pellentesque, porta diam ac, venenatis neque. Pellentesque sed quam sit amet arcu dignissim gravida eget fringilla quam. Maecenas faucibus purus ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis.",
    },
    {
      name: "Tomas",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper lacus vel vulputate efficitur. Sed nec purus pellentesque, porta diam ac, venenatis neque. Pellentesque sed quam sit amet arcu dignissim gravida eget fringilla quam. Maecenas faucibus purus ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis.",
    },
    {
      name: "Kamilė",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper lacus vel vulputate efficitur. Sed nec purus pellentesque, porta diam ac, venenatis neque. Pellentesque sed quam sit amet arcu dignissim gravida eget fringilla quam. Maecenas faucibus purus ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis.",
    },
  ];

  const handleNextButton = () => {
    if (sliderData.length - 1 === currentSlide) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousButton = () => {
    if (currentSlide === 0) {
      setCurrentSlide(sliderData.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <section className="reviews">
      <h2 className="reviews__heading section-heading">
        Jūsų atsiliepimai apie mus
      </h2>
      <button
        onClick={handlePreviousButton}
        className="reviews__slider-btn-left reviews__slider-btn"
      >
        &lsaquo;
      </button>
      <Slider currentSlide={currentSlide} sliderData={sliderData} />
      <button
        onClick={handleNextButton}
        className="reviews__slider-btn-right reviews__slider-btn"
      >
        &rsaquo;
      </button>
    </section>
  );
};

export default Reviews;
