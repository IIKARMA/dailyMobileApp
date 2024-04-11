import { useNavigation } from "@react-navigation/native";
import {
  IconProductsBestPrice,
  IconProductsNew,
  IconProductsWeek,
  ProductCardArrow,
} from "@src/assets/icons/ProductTypesIcons";
import { SCREENS } from "@src/navigation/enums";
import {
  HomeStackProps,
  ProductScreenProps,
} from "@src/navigation/stacks/home/type";
import translations from "@src/translations";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { ShadowedView } from "react-native-fast-shadow";
import { Shadow } from "react-native-shadow-2";

export type PrtoductTypes = "week" | "new" | "best";
export interface ProductCardType {
  title: string;
  img: JSX.Element;
  type: PrtoductTypes;
}
const productTypeList: Record<PrtoductTypes, ProductCardType> = {
  ["best"]: {
    title: translations.prtoductTypes.best,
    img: <IconProductsBestPrice />,
    type: "best",
  },
  ["week"]: {
    title: translations.prtoductTypes.week,
    img: <IconProductsWeek />,
    type: "week",
  },
  ["new"]: {
    title: translations.prtoductTypes.new,
    img: <IconProductsNew />,
    type: "new",
  },
};
const ProductsByType = () => {
  const navigation = useNavigation<ProductScreenProps["navigation"]>();
  function handleSelectType(type: PrtoductTypes) {
    navigation.navigate("PRODUCT_CATEGORY", { productType: type });
  }
  const renderCard = (productType: ProductCardType) => (
    <TouchableOpacity
      key={productType.type}
      onPress={() => handleSelectType(productType.type)}
    >
      <ShadowedView
        style={{
          backgroundColor: "white",
          shadowOpacity: 0.2,
          shadowRadius: 7,
          borderRadius: 8,
          shadowOffset: {
            width: 0,
            height: 5,
          },
        }}
      >
        <View style={s.productCard}>
          <View style={s.iconContainer}>{productType.img}</View>
          <Text style={s.text}>{productType.title}</Text>
          {<ProductCardArrow />}
        </View>
      </ShadowedView>
    </TouchableOpacity>
  );

  return (
    <View style={s.container}>
      {Object.values(productTypeList).map((card: ProductCardType) =>
        renderCard(card)
      )}
    </View>
  );
};
export default ProductsByType;
const s = StyleSheet.create({
  container: {
    gap: 15,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  productCard: {
    borderRadius: 12,
    backgroundColor: "#fff",
    width: 100,
    overflow: "hidden",
    alignItems: "center",
  },
  iconContainer: {
    paddingVertical: 25,
    width: 100,
    top: -15,
    backgroundColor: "#33333023",
    borderRadius: 55,
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    color: "#333",
  },
});
