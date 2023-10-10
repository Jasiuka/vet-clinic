import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import appointmentReducer from "./slices/appointment-slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { appointmentsApi } from "../services/appointments";

export const store = configureStore({
  reducer: {
    user: userReducer,
    appointment: appointmentReducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appointmentsApi.middleware),
});

setupListeners(store.dispatch);
