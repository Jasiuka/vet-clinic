import PropTypes from "prop-types";
export const Notification = ({ type, message }) => {
  return (
    <li className={`notification notification_${type}`}>
      <p>{message}</p>
    </li>
  );
};

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};
export default Notification;
