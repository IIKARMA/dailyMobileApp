import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS } from "@src/navigation/enums";
import { ProfileStackParamList } from "../stacks/profile/types";
import {
  NativeStackNavigationConfig,
  NativeStackNavigatorProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
const { HOME, SUPPORT, PROFILE, SHOPS } = SCREENS;
export interface TabBarProps {
  routeName: string;
  selectedTab: string;
  navigate: string;
}

export enum ScreenName {
  HOME,
  HELP,
  PROFILE,
  SHOPS,
}

export type ButtonTab = {
  icon: SVGImageElement;
  title: string;
};

export enum PositionTabButtom {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  CENTER = "CENTER",
}

export type BottomTab = {
  [SCREENS.HOME]: undefined;
  [SCREENS.SUPPORT]: undefined;
  [SCREENS.SCANNER]: undefined;
  [SCREENS.HISTORY_PURCHASES]: undefined;
  [SCREENS.SHOPS]: undefined;
  [SCREENS.PROFILE_STACK]: NavigatorScreenParams<ProfileStackParamList>;
};

export type BottomTabProps = BottomTabScreenProps<BottomTab>;
