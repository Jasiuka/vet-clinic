import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notificationsSlice",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, _) => {
      state.notifications.splice(0, 1);
    },
  },
});

export const createNotificationAndRemove = (notification) => (dispatch) => {
  dispatch(addNotification(notification));

  setTimeout(() => {
    dispatch(removeNotification());
  }, 3000);
};

export const { addNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
