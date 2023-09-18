import PropTypes from "prop-types";

export const TeamMemberCard = ({ name, specialty, imageUrl, imageAlt }) => {
  return (
    <div className="our-team__card">
      <img
        className="our-team__card--image"
        src={imageUrl}
        alt={`Komandos narys: ${imageAlt}`}
      />

      <div className="our-team__card--details">
        <h4 className="our-team__card--name">{name}</h4>
        <h5 className="our-team__card--spec">{specialty}</h5>
      </div>
    </div>
  );
};

TeamMemberCard.propTypes = {
  name: PropTypes.string,
  specialty: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default TeamMemberCard;
