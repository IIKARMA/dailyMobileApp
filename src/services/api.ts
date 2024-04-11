import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import {TokenState} from '@src/store/slices/types';
import {
  loggedOut,
  setUserToken,
  userRefreshToken,
} from '@src/store/slices/userSlice';
import {RootState} from '@src/store/store';
import {BASE_URL, CLIENT_ID, CLIENT_SECRET} from '../../config';
const urlsWithoutBearer = [
  '/discount/join-by-phone/request',
  '/discount/join-by-phone/confirm',
  '/auth/token/otp/request',
  '/auth/token/otp/confirm',
  '/auth/token/refresh',''
];
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers, {getState, endpoint}) {
    const token = (getState() as RootState).user.tokens as TokenState;
    const access_token = token.access_token;
    if (access_token && !urlsWithoutBearer.includes(endpoint)) {
      headers.set('authorization', `Bearer ${access_token}`);
    }
    headers.set('Accept-Language', 'ua');
    headers.set('Accept', 'application/json');
    return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const tokens = (api.getState() as RootState).user.tokens as TokenState;
  console.log("🚀 ~ >= ~ result:", result)
  if (
    (result.error && result.error?.originalStatus === 401) ||
    result.error?.status === 401
  ) {
    // try to get a new token
    const refreshResult = await baseQuery('/auth/token/refresh', api, {
      grant_type: 'refresh_token',
      refresh_token: tokens.refresh_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    console.log('🚀 ~ >= ~ refreshResult:', refreshResult);

    if (refreshResult.data) {
      api.dispatch(setUserToken(refreshResult.data as TokenState));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api
        .dispatch(userRefreshToken(tokens?.refresh_token))
        .catch(() => api.dispatch(loggedOut()));
    }
    // store the new token
    // retry the initial query
  }
  return result;
};
