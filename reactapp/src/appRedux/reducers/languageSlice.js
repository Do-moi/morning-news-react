import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    value: "fr",
  },
  reducers: {
    changeLanguage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.value = action.payload;
    },
    resetLanguage: (state) => {
      state.value = "fr";
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLanguage, resetLanguage } = languageSlice.actions;

export default languageSlice.reducer;
