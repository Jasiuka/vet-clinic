import ReviewCard from "./review-card.component";
import WriteNewForm from "./write-new.component";
import Message from "../../../../components/message.component";
import "./reviews.style.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetReviewsQuery,
  useGetUserReviewQuery,
} from "../../../../services/api-slice";
import Spinner from "../../../../components/spinner.component";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const [isMessageShowing, setIsMessageShowing] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const isUserHasReview = useSelector((state) => state.user?.review);
  const { data: userReview = [] } = useGetUserReviewQuery();
  const reviewRows = 4;
  const [visibleReviews, setVisibleReviews] = useState(4);
  const user = useSelector((state) => state.user);
  const { data, error, isLoading } = useGetReviewsQuery();

  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);

  const handleMessageShowing = (value) => {
    setIsMessageShowing(value);
    setHideForm(true);
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + reviewRows);
  };

  return (
    <section className="reviews">
      {isLoading && <Spinner message={"Kraunama.."} />}
      <h2 className="reviews__heading section-heading">
        Jūsų atsiliepimai apie mus
      </h2>
      <div className="reviews__reviews">
        {reviews
          ?.slice(0, visibleReviews)
          ?.map(({ userName, reviewText, stars, reviewDate }, index) => (
            <ReviewCard
              key={index}
              name={userName}
              rating={stars}
              reviewText={reviewText}
              date={reviewDate}
              index={index}
            />
          ))}
      </div>
      {visibleReviews >= reviews.length ? (
        ""
      ) : (
        <button
          className="reviews__load-more pink-button"
          onClick={loadMoreReviews}
        >
          Užkrauti daugiau..
        </button>
      )}
      {user?.role === 2 &&
        !userReview[0]?.id &&
        !hideForm &&
        !isUserHasReview && (
          <WriteNewForm user={user} messageHandler={handleMessageShowing} />
        )}
      {user?.role && isMessageShowing && (
        <Message messageText={"Ačiū už jūsų atsiliepimą!"} />
      )}
    </section>
  );
};

export default Reviews;
