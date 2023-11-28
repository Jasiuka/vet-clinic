import PropTypes from "prop-types";
import {} from "react";
export const Message = ({ messageText }) => {
  return (
    <div className={`message-div`}>
      <p>{messageText}</p>
    </div>
  );
};

Message.propTypes = {
  messageText: PropTypes.string,
};
export default Message;
