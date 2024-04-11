///
import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {BASE_URL, CLIENT_ID, CLIENT_SECRET} from '../../config';
import type {RootState} from '../store/store';
import type {
  OtpCodeAuthArg,
  Product,
  ProductArg,
  ProductBarcodeArg,
  ProductList,
  ResposeError,
  TokenArg,
} from './types';
import {TokenState, User} from '@src/store/slices/types';
import {baseQueryWithReauth} from './api';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getProducts: builder.query<ProductList, ProductArg>({
      query: arg => ({
        url: `/products?page=${arg.page || 1}&filter[promoPriceType]=${
          arg.promoPriceType
        }&&filter[input]=${arg.filterInput || ''}`,
        method: 'GET',
        transformResponse: (response: ProductList) => response.data,
      }),
      keepUnusedDataFor: 1,
    }),
    getProductByBarCode: builder.query<Product, ProductBarcodeArg>({
      query: barcode => ({
        url: `/products/${barcode.barcode}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      transformResponse: (response: {data: Product}) => response.data,

      keepUnusedDataFor: 1,
    }),
  }),
});
export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByBarCodeQuery,
  useLazyGetProductByBarCodeQuery,
} = productApi;
