import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SCREENS } from "@src/navigation/enums";
const {
  PROFILE_EDIT,
  PROFILE_CHANGE_PHONE,
  PROFILE_INFO,
  PROFILE_TRANSACTION,
  HISTORY_NEWS,
} = SCREENS;

export type ProfileStackParamList = {
  PROFILE: undefined;
  PROFILE_EDIT: undefined;
  PROFILE_INFO: undefined;
  PROFILE_TRANSACTION: undefined;
  PROFILE_CHANGE_PHONE: undefined;
  HISTORY_NEWS: undefined;
};

export type ProfileStackProps = NativeStackScreenProps<
  ProfileStackParamList,
  "PROFILE_EDIT"
>;
