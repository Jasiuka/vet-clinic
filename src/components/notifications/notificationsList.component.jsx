import Notification from "./notification.component";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./notifications.style.css";
export const NotificationsList = () => {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  return (
    <ul className="notifications-list">
      {notifications?.length
        ? notifications?.map(({ id, message, type }) => (
            <Notification key={id} message={message} type={type} />
          ))
        : ""}
    </ul>
  );
};

export default NotificationsList;
