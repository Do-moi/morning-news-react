import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    value: [],
  },
  reducers: {
    addArticle: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.value.push(action.payload);
    },
    addUserArticles: (state, action) => {
      state.value = action.payload;
    },
    deleteArticle: (state, action) => {
      let array = state.value.filter(
        (article) => article.title !== action.payload
      );

      state.value = array;
    },
    resetArticle: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addArticle, deleteArticle, addUserArticles, resetArticle } =
  articleSlice.actions;

export default articleSlice.reducer;
