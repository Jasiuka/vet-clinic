import { useState } from "react";
import Message from "./components/message.component";
export const TempPage = () => {
  const [message, setMessage] = useState({
    messageText: "",
    isMessageVisible: false,
  });
  const showMessage = (messageText) => {
    setMessage({
      messageText: messageText,
      isMessageVisible: true,
    });

    setTimeout(() => {
      setMessage({
        isMessageVisible: false,
      });
    }, 3000);
  };
  return (
    <main>
      {message.isMessageVisible && (
        <Message messageText={message.messageText} />
      )}
      <button onClick={() => showMessage("Testing message")}>
        Show message
      </button>
    </main>
  );
};

export default TempPage;
