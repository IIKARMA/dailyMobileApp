import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { userApi } from "@src/services/userApi";
import { productApi } from "@src/services/productApi";
import { faqApi } from "@src/services/faqApi";
import { feedbackApi } from "@src/services/feedBackApi";
import { shopApi } from "@src/services/shopApi";
import { articlesApi } from "@src/services/articlesApi";
import user from "@src/store/slices/userSlice";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  user: user,
  [userApi.reducerPath]: userApi.reducer,
  [faqApi.reducerPath]: faqApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(faqApi.middleware)
      .concat(productApi.middleware)
      .concat(shopApi.middleware)
      .concat(articlesApi.middleware)
      .concat(feedbackApi.middleware),
});
export let persistor = persistStore(store);
export default store;
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;
