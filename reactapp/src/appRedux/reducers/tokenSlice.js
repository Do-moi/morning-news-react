import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    addToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.value = action.payload;
    },
    deleteToken: (state) => {
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, deleteToken } = tokenSlice.actions;

export default tokenSlice.reducer;
