import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import appointmentReducer from "./slices/appointment-slice";
import cartReducer from "./cart/cart.reducer";
import notificationsReducer from "./notifications/notifications.reducer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../services/api-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    appointment: appointmentReducer,
    cart: cartReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware, thunk),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
