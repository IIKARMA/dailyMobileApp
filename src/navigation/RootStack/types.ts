import type { NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { SCREENS } from "@src/navigation/enums";
import { AuthorizationStackParamList } from "@src/navigation/stacks/authorization/type";
import { HomeStackParamList } from "../stacks/home/type";
import { PrtoductTypes } from "@src/features/home/components/ProductsByType";
export type RootStackParamList = {
  [SCREENS.ROOT]: undefined;
};
export type RootStackProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
