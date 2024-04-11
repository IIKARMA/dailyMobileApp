import {createApi} from '@reduxjs/toolkit/query/react';
import {CLIENT_ID, CLIENT_SECRET} from '../../config';
import type {
  IListTransactions,
  IRefreshTokenArg,
  ITransaction,
  OtpCodeAuthArg,
  ResposeError,
  TokenArg,
} from './types';
import {CreateUserReq, EditUser, User} from '@src/store/slices/types';
import {IUserFormEdit} from '@src/features/profile/types';

import {baseQueryWithReauth} from '@src/services/api';

// create a new mutex

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['USER'],
  endpoints: builder => ({
    userPhoneRegistration: builder.mutation<any, string>({
      query: phone => ({
        url: `/discount/join-by-phone/request`,
        method: 'POST',
        body: {
          phone: phone,
        },
      }),
      invalidatesTags: ['USER'],
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: ResposeError | any, meta, arg) =>
        response.data?.message,
    }),
    userPhoneRegistrationConfirm: builder.mutation<any, OtpCodeAuthArg>({
      query: arg => ({
        url: '/discount/join-by-phone/confirm',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['USER'],
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: ResposeError | any, meta, arg) =>
        response.data?.message,
    }),
    userPhoneAuthorization: builder.mutation<any, string>({
      query: phone => ({
        url: `/auth/token/otp/request`,
        method: 'POST',
        body: {
          phone: phone,
          grant_type: 'otp_phone',
          type: 'request',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: ResposeError | any, meta, arg) =>
        response.data?.message,
    }),
    userCreate: builder.mutation<{status: number}, CreateUserReq>({
      query: arg => ({
        url: '/discount/accounts',
        method: 'post',
        body: {...arg, grant_type: 'registration'},
      }),

      invalidatesTags: ['USER'],
      transformResponse: (response: {status: number}) => response,
      transformErrorResponse: (response: ResposeError | any, meta, arg) =>
        response.data?.message,
    }),
    userSendOtpCodeAuthorization: builder.mutation<any, OtpCodeAuthArg>({
      query: ({code, phone}) => ({
        url: '/auth/token/otp/confirm',
        method: 'POST',
        body: {
          phone: phone,
          code: +code,
          grant_type: 'otp_phone',
          type: 'issue',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
        transformResponse: (response: any) => response,
      }),
    }),
    getUserInfo: builder.query<User, void>({
      query: () => ({
        url: '/discount/clients/profile',
        method: 'GET',
      }),
      transformResponse: (response: User) => response,

      providesTags: ['USER'],
    }),
    userTransaction: builder.query<IListTransactions, void>({
      query: () => '/discount/clients/accounts/transactions',
    }),

    userInfoByToken: builder.mutation<any, TokenArg>({
      query: fmcToken => ({
        url: '/discount/clients/fcm',
        method: 'PATCH',
        body: {fmcToken: fmcToken},
      }),
    }),
    editUserInfo: builder.mutation<IUserFormEdit, EditUser>({
      query: arg => ({
        url: '/discount/clients',
        method: 'PUT',
        body: {
          nameFirst: arg.nameFirst,
          sex: arg.sex,
          region: arg.region,
        },
      }),

      invalidatesTags: ['USER'],
    }),
    userChangePhone: builder.mutation<void, string>({
      query: phone => ({
        url: '/discount/clients/change-phone/request',
        method: 'POST',
        body: {
          phone: phone,
        },
      }),
    }),
    userConfirmChangePhone: builder.mutation<void, number>({
      query: code => ({
        url: '/discount/clients/change-phone/confirm',
        method: 'POST',
        body: {
          token: code,
        },
      }),
    }),
    addFeavoriteShop: builder.mutation<void, string>({
      query: shopId => ({
        method: 'POST',
        url: `/discount/clients/favorite/shops/${shopId}/add`,
      }),
      invalidatesTags: ['USER'],
    }),
    removeFavoriteShop: builder.mutation<void, string>({
      query: shopId => ({
        method: 'DELETE',
        url: `discount/clients/favorite/shops/${shopId}/remove`,
      }),

      invalidatesTags: ['USER'],
    }),
    removeClient: builder.mutation<void, void>({
      query: () => ({
        method: 'delete',
        url: 'discount/clients',
      }),
      invalidatesTags: ['USER'],
    }),
  }),
});
export const {
  useUserPhoneRegistrationMutation,
  useUserPhoneRegistrationConfirmMutation,
  useUserPhoneAuthorizationMutation,
  useUserSendOtpCodeAuthorizationMutation,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useUserInfoByTokenMutation,
  useEditUserInfoMutation,
  useAddFeavoriteShopMutation,
  useRemoveFavoriteShopMutation,
  useUserTransactionQuery,
  useUserChangePhoneMutation,
  useUserConfirmChangePhoneMutation,
  useRemoveClientMutation,
  useUserCreateMutation,
} = userApi;
