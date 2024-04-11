import { useUserRefreshTokenMutation, userApi } from "@src/services/userApi";
import { TokenState } from "@src/store/slices/types";
import { setUserToken } from "@src/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@src/store/store";
import { useEffect } from "react";

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens) as TokenState;
  const [refreshToken, { data }] = useUserRefreshTokenMutation();
  useEffect(() => {
    refreshToken({ refresh_token: tokens.refresh_token }).then((res) => {
      if (res) dispatch(setUserToken(res as TokenState));
      console.log(res);
    });
  }, [tokens]);
};
