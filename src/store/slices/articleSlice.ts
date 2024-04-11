import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IArticle } from "@src/services/types";
import { AppState } from "react-native";
import { RootState } from "../store";
type SliceState = {
  articles: IArticle[];
};
const initialState: SliceState = {
  articles: [],
};
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<IArticle[]>) => {
      state.articles = action.payload;
    },
  },
  selectors: {
    articles_selector: (state) => state.articles,
  },
});

export const { articles_selector } = articleSlice.getSelectors(
  (state: RootState) => state.articles
);
export default articleSlice.reducer;
export const { setArticles } = articleSlice.actions;
