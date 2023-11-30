export const ChatItem = ({ sender, message }) => {
  return (
    <div className="chat-item">
      <span className="chat-item__sender">{sender}</span>
      <p>{message}</p>
    </div>
  );
};

export default ChatItem;
