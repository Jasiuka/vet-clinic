import Slider from "./slider.component";
import WriteNewForm from "./write-new.component";
import "./reviews.style.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [fetchingReviews, setFetchingReviews] = useState(true);
  const [noError, setNoError] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews();
        if (fetchingReviews) {
          setReviews(fetchedReviews);
        }
        setFetchingReviews(false);
      } catch {
        setNoError(false);
      }
    };
    fetchReviews();

    return () => {};
  }, []);

  const getReviews = async () => {
    const response = fetch("/api/v1/reviews");
    const data = (await response).json();
    return data;
  };

  const handleNextButton = () => {
    if (reviews.length - 1 === currentSlide) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousButton = () => {
    if (currentSlide === 0) {
      setCurrentSlide(reviews.length - 1);
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
      <Slider currentSlide={currentSlide} sliderData={reviews} />
      <button
        onClick={handleNextButton}
        className="reviews__slider-btn-right reviews__slider-btn"
      >
        &rsaquo;
      </button>
      {user && <WriteNewForm user={user} />}
    </section>
  );
};

export default Reviews;
