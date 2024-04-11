import {
  Dispatch,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { TokenState, User } from "./types";
import { CLIENT_ID, CLIENT_SECRET } from "../../../config";
import { RootState } from "../store";
import axios from "axios";
interface UserState {
  tokens: TokenState | object;
  user: User | object;
  isOneBoard: boolean;
  isLocationInShop: boolean;
}
const initialState: UserState = {
  tokens: {},
  user: {},
  isOneBoard: false,
  isLocationInShop: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<TokenState>) => {
      state.tokens = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setOnBoard: (state, action: PayloadAction<boolean>) => {
      state.isOneBoard = action.payload;
    },
    loggedOut: (state, action: PayloadAction<void>) => {
      state.tokens = {};
      state.user = {};
    },
    setIsLocationInShop: (state, action: PayloadAction<boolean>) => {
      state.isLocationInShop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRefreshToken.fulfilled, (state, { payload }) => {
      state.tokens = payload ? payload : state.tokens;
    });
  },
});
export const {
  setUserToken,
  setUser,
  setOnBoard,
  setIsLocationInShop,
  loggedOut,
} = userSlice.actions;
export default userSlice.reducer;
export const userRefreshToken = createAsyncThunk(
  "user/userRefreshToken",
  async (refresh_token: string, { rejectWithValue, getState }) => {
    const response = await axios
      .request({
        method: "post",
        url: "https://service.shchodnia.com/api/v2/auth/token/refresh",
        data: {
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
      })
      .then((response) => {
        console.log("🚀 ~ response:", response);
        return response.data;
      })
      .catch((e) => {
        console.log("🚀 ~ e:", e);
        rejectWithValue(e);
      });
    console.log("🚀 ~ response:", response);
    return response;
  }
);
