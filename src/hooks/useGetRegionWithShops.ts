import { useFocusEffect } from "@react-navigation/native";
import {
  useGetRegionsQuery,
  useGetShopByRegionIdQuery,
  useGetShopsQuery,
} from "@src/services/shopApi";
import { IShop, IShopAddress, IShopList } from "@src/services/types";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { setBaseZIndexForActionSheets } from "react-native-actions-sheet";

const useGetRegionWithShops = (regionID: string, favoriteShopsID: string[]) => {
  const { data: regions, refetch: refetchRegion } = useGetRegionsQuery();
  const { data: allShops } = useGetShopsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.data,
    }),
  });
  console.log(favoriteShopsID);

  const { data: shopsByRegion, refetch: shopsByRegionRefetch } =
    useGetShopByRegionIdQuery({ regionId: regionID });

  const regionName: string = useMemo(
    () =>
      regions?.find((_region) => _region.id === regionID)
        ?.title as unknown as string,
    [regionID]
  );
  console.log(regionName);

  const favoriteShops =
    typeof shopsByRegion !== "undefined" &&
    ([...shopsByRegion]?.filter(
      (shop: IShop) =>
        typeof favoriteShopsID !== "undefined" &&
        [...favoriteShopsID]?.filter((favShopId) => favShopId == shop.id)[0]
    ) as unknown as IShop[]);
  useFocusEffect(
    useCallback(() => {
      refetchRegion();
      shopsByRegionRefetch();
    }, [])
  );
  useEffect(() => {
    shopsByRegionRefetch();
  }, [regionID]);

  return { regions, regionName, allShops, shopsByRegion, favoriteShops };
};
export default useGetRegionWithShops;
