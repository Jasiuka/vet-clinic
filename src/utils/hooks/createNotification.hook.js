import { useDispatch } from "react-redux";
import { createNotificationAndRemove } from "../../store/notifications/notifications.reducer";
import { createNotificationObject } from "../helper-fncs";
import { useCallback } from "react";
export const useCreateNotification = () => {
  const dispatch = useDispatch();

  const createNotification = useCallback(
    (message, type) => {
      dispatch(
        createNotificationAndRemove(createNotificationObject(message, type))
      );
    },
    [dispatch]
  );

  return { createNotification };
};

export default useCreateNotification;
