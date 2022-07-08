import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./reducers/articleSlice";
import tokenReducer from "./reducers/tokenSlice";
import languageReducer from "./reducers/languageSlice";
export default configureStore({
  reducer: {
    article: articleReducer,
    token: tokenReducer,
    language: languageReducer,
  },
});
