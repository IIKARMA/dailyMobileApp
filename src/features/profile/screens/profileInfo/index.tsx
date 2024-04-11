import React, { useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "@src/components/Screen";
import Label from "@src/components/Label";
import { useGetUserInfoQuery } from "@src/services/userApi";
import { useAppSelector } from "@src/store/store";
import translations from "@src/translations";
import { lightPurple, purple, white } from "@src/theme/colors";
import type { IUserForm, TSex } from "@src/features/profile/types";
import useGetRegionWithShops from "@src/hooks/useGetRegionWithShops";
import { IShop } from "@src/services/types";
import { useGetRegionsQuery } from "@src/services/shopApi";
import { User } from "@src/store/slices/types";
import { useFocusEffect } from "@react-navigation/native";

const sex = {
  female: "Чоловік",
  male: "Жінка",
} as const;

const ProfileInfo = () => {
  const { data: userInfoData, refetch } = useGetUserInfoQuery({});
  const user = userInfoData as User;
  const { data: regions, refetch: regionRefetch } = useGetRegionsQuery();
  const { favoriteShops } = useGetRegionWithShops(user?.regionId, user?.shops);
  const regionName: string = useMemo(
    () =>
      regions?.find((_region) => _region.id === user?.regionId)
        ?.title as unknown as string,
    [user, regions]
  );
  const userInfo: IUserForm[] = [
    { label: translations.profile.name, info: user?.nameFirst },
    { label: translations.profile.phone, info: user?.phone },
    { label: translations.profile.sex, info: String(sex[user?.sex as TSex]) },
    { label: translations.profile.region, info: String(regionName) },
    {
      label: translations.profile.shops,
      info: favoriteShops as IShop[],
      type: "shops",
    },
  ];
  useFocusEffect(
    useCallback(() => {
      // refetch();
    }, [])
  );
  return (
    <Screen offTop="off" isHiddenLogo>
      <View style={s.container}>
        {userInfo.map((info: IUserForm) => (
          <View key={info.label} style={s.infoContainer}>
            <View style={s.infoBlock}>
              <Label size={14} text={info.label} />
            </View>
            {info.type === "shops" ? (
              Array.isArray(info.info) &&
              info.info.map((shop: any, index: number) => (
                <React.Fragment key={index}>
                  <Text style={s.shopText}>{shop.address}</Text>
                  <View
                    style={{
                      borderBottomColor: purple,
                      borderBottomWidth:
                        typeof favoriteShops !== "boolean" &&
                        index !== favoriteShops.length - 1
                          ? StyleSheet.hairlineWidth
                          : 0,
                    }}
                  />
                </React.Fragment>
              ))
            ) : (
              <Text style={s.infoText}>{String(info?.info)}</Text>
            )}
          </View>
        ))}
      </View>
    </Screen>
  );
};

export default ProfileInfo;

const s = StyleSheet.create({
  infoContainer: {
    borderRadius: 10,
    padding: 10,
    borderColor: lightPurple,
    justifyContent: "space-between",
    borderWidth: 2,
    paddingVertical: 10,
  },
  infoBlock: {
    position: "absolute",
    borderRadius: 3,
    top: -10,
    paddingHorizontal: 5,
    backgroundColor: white,
    overflow: "hidden",
    left: 10,
  },
  container: { paddingTop: 20, gap: 20, borderRadius: 12 },
  shopText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingRight: 10,
  },
  infoText: {
    fontSize: 16,
    paddingRight: 10,
  },
});
