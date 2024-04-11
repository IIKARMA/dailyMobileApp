import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { TokenState } from "@src/store/slices/types";
import { RootState, useAppSelector } from "@src/store/store";
import { IArticle, IArticleResponse, Meta } from "./types";
import { useRefreshToken } from "@src/utils/refreshToken";
import { baseQueryWithReauth } from "@src/services/api";
// const { access_token } = useAppSelector(
//   (state) => state.user.tokens as TokenState
// );

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: ["ARTICLES"],
  endpoints: (builder) => ({
    getArticles: builder.query<IArticleResponse["data"], void>({
      query: () => "/blog/articles?isMe=1",
      transformResponse: (response: { data: IArticle[]; meta: Meta }) => {
        const data = response.data;
        return data;
      },
      transformErrorResponse: (error) => {
        if (error.status === 401) useRefreshToken();
        return error;
      },
      providesTags: ["ARTICLES"],
    }),
    gerArticleId: builder.query<IArticle, string>({
      query: (id) => `blog/articles/${id}`,
      transformResponse: (response: { data: IArticle; meta: Meta }) => {
        const data = response.data;
        return data;
      },
      transformErrorResponse: (error) => {
        if (error.status === 401) useRefreshToken();
        return error;
      },
      providesTags: ["ARTICLES"],
    }),
  }),
});
export const { useGetArticlesQuery, useLazyGerArticleIdQuery } = articlesApi;
