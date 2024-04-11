import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SCREENS } from "@src/navigation/enums";
import { ProfileStackParamList } from "../profile/types";
import { PrtoductTypes } from "@src/features/home/components/ProductsByType";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Product } from "@src/services/types";
const {
  HOME,
  PRODUCT_CATEGORY,

  PROFILE_INFO,
  HISTORY_PURCHASES,
  PROFILE,
  PRODUCT_SCREEN,
} = SCREENS;
export type HomeStackParamList = {
  HOME: NavigatorScreenParams<BottomTabBarProps>;

  HISTORY_PURCHASES: undefined;
  PROFILE_INFO: undefined;
  PROFILE: NavigatorScreenParams<ProfileStackParamList>;
  PRODUCT_CATEGORY: { productType: PrtoductTypes } | undefined;
  PRODUCT_SCREEN: { product: Product; isVisibleMobilePrice?: boolean };
};

export type HomeStackProps = NativeStackScreenProps<HomeStackParamList>;
export type ProductScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  SCREENS.PRODUCT_SCREEN
>;
export type ProductListScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  SCREENS.PRODUCT_CATEGORY
>;
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
}
