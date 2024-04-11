import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from "../../config";
import { RootState } from "@src/store/store";
import { TokenState } from "@src/store/slices/types";
import { IFaq, IFaqList, Meta, PurchasesResponse } from "./types";
import { refreshToken } from "@src/utils/refreshToken";

export const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getFaq: builder.query<IFaqList, void>({
      query: () => ({
        method: "GET",
        url: `/faq`,
        transformResponse: (response: IFaqList) => response.data,
      }),
    }),
  }),
});
export const { useGetFaqQuery } = faqApi;
