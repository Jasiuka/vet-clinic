import { useDispatch } from "react-redux";
import { createNotificationAndRemove } from "../../store/notifications/notifications.reducer";
import { createNotificationObject } from "../helper-fncs";
export const useCreateNotification = () => {
  const dispatch = useDispatch();

  const createNotification = (message, type) => {
    dispatch(
      createNotificationAndRemove(createNotificationObject(message, type))
    );
  };

  return { createNotification };
};

export default useCreateNotification;
