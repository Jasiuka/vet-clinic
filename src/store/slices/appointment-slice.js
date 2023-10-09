import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
});

export const { set } = appointmentSlice.actions;
export default appointmentSlice.reducer;
