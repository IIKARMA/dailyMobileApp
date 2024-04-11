import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from "../../config";
import { RootState } from "@src/store/store";
import { TokenState } from "@src/store/slices/types";
import { IFaq, IFaqList, IFeedBack, Meta, PurchasesResponse } from "./types";
import { baseQueryWithReauth } from "@src/services/api";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    sendFeedback: build.mutation<unknown, IFeedBack>({
      query: (arg) => ({
        url: "support/feedback",
        method: "POST",
        responseHandler: "text",
        body: {
          name: "string",
          phone: "0684555123",
          email: "example@gmail.com",
          text: "string",
        },
      }),
    }),
  }),
});
export const { useSendFeedbackMutation } = feedbackApi;
