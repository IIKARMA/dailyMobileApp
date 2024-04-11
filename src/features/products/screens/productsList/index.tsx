import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Screen from "@src/components/Screen";
import { PrtoductTypes } from "@src/features/home/components/ProductsByType";
import {
  ProductListScreenProps,
  ProductScreenProps,
} from "@src/navigation/stacks/home/type";
import {
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from "@src/services/productApi";
import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { FlatList, Keyboard, View } from "react-native";
import ProductCard from "../../components/productCard";
import Skeleton from "@src/components/Skeleton";
import translations from "@src/translations";
import SearchPanel from "@src/components/SearchPanel";
import useInput from "@src/hooks/useInput";
import { Product, ProductList } from "@src/services/types";
const ProductsList = () => {
  const { value, onChangeText } = useInput("");
  const [page, setPage] = useState<number>(1);
  const [getLazyProduct] = useLazyGetProductsQuery();
  const navigation = useNavigation<ProductScreenProps["navigation"]>();
  const productType = useRoute<ProductListScreenProps["route"]>()?.params
    ?.productType as PrtoductTypes;
  const { data } = useGetProductsQuery(
    {
      page: 1,
      filterInput: "",
      promoPriceType: productType,
    },
    {
      selectFromResult: ({ data }) => ({ data: data?.data }),
    }
  );
  const [products, setProducts] = useState<Product[]>(data ?? []);
  const listProducts = useDeferredValue(products);

  const handleCanel = useCallback(() => {
    onChangeText("");
    getLazyProduct({
      page: 1,
      filterInput: "",
      promoPriceType: productType,
    })
      .unwrap()
      .then((res: ProductList) => {
        setProducts(res.data);
      });
    Keyboard.dismiss();
  }, []);

  const handleInput = (text: string) => {
    onChangeText(text);
    if (!text.search(/^\S+/g)) {
      getLazyProduct({
        page: 1,
        filterInput: text,
        promoPriceType: productType,
      })
        .unwrap()
        .then((res: ProductList) => {
          setProducts(res.data);
        });
    }
  };
  const handlePaggination = () => {
    getLazyProduct({
      page: page + 2,
      filterInput: value,
      promoPriceType: productType,
    })
      .unwrap()
      .then((res: ProductList) => {
        setPage((prevPage) => prevPage + 1);
        setProducts(products.concat(res.data));
      });
  };

  const getItemLayout = (data: any, index: number) => ({
    length: 220,
    offset: 220 * index,
    index,
  });

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: translations.prtoductTypes[productType],
      });
      getLazyProduct({
      page: 1,
      filterInput: "",
      promoPriceType: productType,
    })
      .unwrap()
      .then((res: ProductList) => {
        setProducts(res.data);
      });
    }, [])
  );

  return (
    <Screen isHiddenLogo offTop="off">
      <SearchPanel
        value={value}
        handleCancel={handleCanel}
        handleInput={handleInput}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          getItemLayout={getItemLayout}
          onEndReached={handlePaggination}
          onEndReachedThreshold={1}
          // ListHeaderComponent={<SearchPanel />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            gap: 20,
          }}
          columnWrapperStyle={{
            flexShrink: 1,
            justifyContent: "space-between",
          }}
          numColumns={2}
          data={!data ? new Array(20) : listProducts}
          renderItem={({ item }) =>
            !data ? (
              <View>
                <Skeleton />
              </View>
            ) : (
              <ProductCard {...item} />
            )
          }
        />
      </View>
    </Screen>
  );
};
export default ProductsList;
