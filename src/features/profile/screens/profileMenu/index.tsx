import { useNavigation } from "@react-navigation/native";
import Screen from "@src/components/Screen";
import { SCREENS } from "@src/navigation/enums";
import { ProfileStackProps } from "@src/navigation/stacks/profile/types";
import { loggedOut } from "@src/store/slices/userSlice";
import { useAppDispatch } from "@src/store/store";
import { red, white } from "@src/theme/colors";
import translations from "@src/translations";
import { useCallback } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
interface ProfileNavigateItem {
  label: string;
  handlePress: () => void;
}
const Profile = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<ProfileStackProps["navigation"]>();
  const profileNav: ProfileNavigateItem[] = [
    {
      label: translations.profileItem.userInfo,
      handlePress: () => navigate(SCREENS.PROFILE_INFO),
    },
    {
      label: translations.profileItem.historyPurchases,
      handlePress: () => {
        navigate(SCREENS.PROFILE_TRANSACTION);
      },
    },
    {
      label: translations.profileItem.historyMessages,
      handlePress: () => navigate(SCREENS.HISTORY_NEWS),
    },
  ];
  const renderNavigate = useCallback((item: ProfileNavigateItem) => {
    return (
      <TouchableOpacity
        key={item.label}
        style={s.itemNaviagte}
        onPress={item.handlePress}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Screen isHiddenLogo={true}>
      <View style={s.containerNav}>{profileNav.map(renderNavigate)}</View>
      <TouchableOpacity
        style={{
          marginBottom: 120,
          backgroundColor: red,
          borderRadius: 8,
          height: 40,
          paddingHorizontal: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          dispatch(loggedOut());
        }}
      >
        <Text style={{ color: white }}>Вийти</Text>
      </TouchableOpacity>
    </Screen>
  );
};
export default Profile;
const s = StyleSheet.create({
  containerNav: { paddingTop: 30, gap: 2, flex: 1 },
  itemNaviagte: {
    height: 40,
    backgroundColor: "#3333301f",
    padding: 12,

    marginVertical: 5,
    borderRadius: 6,
  },
});
