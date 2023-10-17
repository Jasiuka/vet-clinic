import PropTypes from "prop-types";
import Paws from "./paws.component";
import { ChangeDateFormat, ExtractDate } from "../../../../utils/helper-fncs";
export const ReviewCard = ({ name, rating, reviewText, date }) => {
  return (
    <div className="reviews__review-card">
      <p className="reviews__review-card-text">{reviewText}</p>
      <div className="reviews__review-card-bottom">
        <p className="reviews__review-card-name">{name}</p>
        <Paws rating={rating} />
        <p className="reviews__review-card-date">
          {ExtractDate(ChangeDateFormat(date))}
        </p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.number,
  reviewText: PropTypes.string,
  date: PropTypes.string,
};
export default ReviewCard;
