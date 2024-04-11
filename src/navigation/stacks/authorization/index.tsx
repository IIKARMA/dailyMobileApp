import { createStackNavigator } from "@react-navigation/stack";

import { AuthorizationStackParamList } from "./type";
import { SCREENS } from "@src/navigation/enums";
import AuthorizationPhone from "@src/features/authorization/AuthorizationPhone";
import AuthorizationSMS from "@src/features/authorization/AuthorizationSMS";
import Intro from "@src/features/intro";
import { useAppSelector } from "@src/store/store";
const { Screen, Navigator } =
  createStackNavigator<AuthorizationStackParamList>();

export const AuthorisationStack = () => {
  const isOneBoard = useAppSelector((state) => state.user.isOneBoard);

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        !isOneBoard ? SCREENS.INTRO : SCREENS.AUTHORIZATION_PHONE
      }
    >
      <Screen
        name={SCREENS.AUTHORIZATION_PHONE}
        component={AuthorizationPhone}
      />
      <Screen name={SCREENS.AUTHORIZATION_SMS} component={AuthorizationSMS} />
      <Screen name={SCREENS.INTRO} component={Intro} />
    </Navigator>
  );
};
