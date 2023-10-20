import ReviewCard from "./review-card.component";
import WriteNewForm from "./write-new.component";
import Message from "../../../../components/message.component";
import "./reviews.style.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [fetchingReviews, setFetchingReviews] = useState(true);
  const [noError, setNoError] = useState(true);
  const [isMessageShowing, setIsMessageShowing] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const reviewRows = 3;
  const [visibleReviews, setVisibleReviews] = useState(4);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReviews = async () => {
    const response = fetch("/api/v1/reviews");
    const data = (await response).json();
    return data;
  };

  const handleMessageShowing = (value) => {
    setIsMessageShowing(value);
    setHideForm(true);
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + reviewRows);
  };

  return (
    <section className="reviews">
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
      {user && !user.review && !isMessageShowing && !hideForm && (
        <WriteNewForm user={user} messageHandler={handleMessageShowing} />
      )}
      {user && isMessageShowing && (
        <Message messageText={"Ačiū už jūsų atsiliepimą!"} />
      )}
    </section>
  );
};

export default Reviews;
