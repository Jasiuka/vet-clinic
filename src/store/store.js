import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import appointmentReducer from "./slices/appointment-slice";
import cartReducer from "./cart/cart.reducer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../services/api-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    appointment: appointmentReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
