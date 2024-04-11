import {
  IconProductsBestPrice,
  IconProductsNew,
  IconProductsWeek,
} from "@src/assets/icons/ProductTypesIcons";
import { PrtoductTypes } from "@src/features/home/components/ProductsByType";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
interface BadgeType {
  icon: JSX.Element;
}
interface BadgeProps {
  type: PrtoductTypes;
}
const Badge: FC<BadgeProps> = ({ type }) => {
  console.log(type);

  const badgeTypeList: Record<PrtoductTypes, BadgeType> = {
    ["week"]: {
      icon: <IconProductsWeek size="60" />,
    },
    ["best"]: {
      icon: <IconProductsBestPrice size="60" />,
    },
    ["new"]: {
      icon: <IconProductsNew size="60" />,
    },
  } as const;
  return (
    <View style={s.badge}>
      <Text>{badgeTypeList[type]?.icon}</Text>
    </View>
  );
};
export default Badge;

const s = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 111,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});
