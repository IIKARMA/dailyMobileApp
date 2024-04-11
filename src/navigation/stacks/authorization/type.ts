import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS } from "@src/navigation/enums";

export type AuthorizationStackParamList = {
  [SCREENS.AUTHORIZATION_PHONE]: undefined;
  [SCREENS.AUTHORIZATION_SMS]: { phone: string; isRegistration?: boolean };
  [SCREENS.INTRO]: undefined;
};
export type AuthorizationStackProps =
  NativeStackScreenProps<AuthorizationStackParamList>;
export type AuthorizationPhoneProps = NativeStackScreenProps<
  AuthorizationStackParamList,
  SCREENS.AUTHORIZATION_PHONE
>;
export type AuthorizationSmsProps = NativeStackScreenProps<
  AuthorizationStackParamList,
  SCREENS.AUTHORIZATION_SMS
>;
export type AuthorizationIntroProps = NativeStackScreenProps<
  AuthorizationStackParamList,
  SCREENS.INTRO
>;
 