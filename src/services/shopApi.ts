import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config";
import { IRegion, IShop, IShopArg, IShopList, IShopsMap } from "./types";
import { TokenState } from "@src/store/slices/types";

import { baseQueryWithReauth } from "@src/services/api";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getShopByRegionId: build.query<NonNullable<IShop[]>, IShopArg>({
      query: (arg) => ({
        url: `/shops?filter[regionId]=${arg.regionId}`,
        method: "GET",
      }),
      transformResponse: (response: { data: NonNullable<IShop[]> }) =>
        response.data,
    }),

    getShops: build.query<IShopList, void>({
      query: () => ({
        url: "/shops",
        method: "GET",
        transformResponse: (response: { data: IShop[] }) => response.data,
      }),
    }),
    getRegions: build.query<IRegion[], void>({
      query: () => ({ url: "/shops/regions" }),
      transformResponse: (response: { data: IRegion[] }) => response.data,
    }),
    getShopMaps: build.query<IShopsMap[], void>({
      query: () => "/shops/map",
      transformResponse: (response: IShopsMap[]) => {
        return response;
      },
    }),
  }),
});
export const {
  useGetShopByRegionIdQuery,
  useLazyGetShopByRegionIdQuery,
  useGetShopsQuery,
  useGetRegionsQuery,
  useGetShopMapsQuery,
} = shopApi;
