import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    get: (state, action) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { get } = userSlice.actions;
export default userSlice.reducer;
