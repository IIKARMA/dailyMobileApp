import { createStackNavigator } from "@react-navigation/stack";
import type { ProfileStackParamList, ProfileStackProps } from "./types";
import { SCREENS } from "@src/navigation/enums";
import Profile from "@src/features/profile/screens/profileMenu";
import ProfileInfo from "@src/features/profile/screens/profileInfo";
import { black, purple } from "@src/theme/colors";
import translations from "@src/translations";
import { TouchableOpacity, Text } from "react-native";
import ProfileEdit from "@src/features/profile/screens/profileEdit";
import { useNavigation } from "@react-navigation/native";
import { useUserTransactionQuery } from "@src/services/userApi";
import ProfileTransactions from "@src/features/profile/screens/profileTransactions";
import ProfileChangePhone from "@src/features/profile/screens/profileChangePhone";
import HistoryMessages from "@src/features/profile/screens/profileHistoryMessages";
const { Screen, Navigator } = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  const navigation = useNavigation<ProfileStackProps["navigation"]>();
  const handlEdit = () => {
    navigation.navigate(SCREENS.PROFILE_EDIT);
  };
  const { data } = useUserTransactionQuery();
  console.log("🚀 ~ ProfileStack ~ data:", data);
  return (
    <Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerShown: false,
        headerTitleStyle: { fontSize: 16, color: "#333" },
        headerLeftContainerStyle: { left: 10 },
        headerTruncatedBackTitle: "#333",
        headerTintColor: purple,
      }}
      initialRouteName={"PROFILE"}
    >
      <Screen name={"PROFILE"} component={Profile} />
      <Screen
        name={"PROFILE_INFO"}
        options={{
          headerShown: true,
          title: translations.personalInfo,
          headerRight: () => (
            <TouchableOpacity
              onPress={handlEdit}
              style={{ alignItems: "baseline", right: 20 }}
            >
              <Text style={{ fontSize: 16, color: purple, fontWeight: "600" }}>
                Змінити
              </Text>
            </TouchableOpacity>
          ),
        }}
        component={ProfileInfo}
      />
      <Screen
        name={"PROFILE_EDIT"}
        options={{
          presentation: "card",
          headerShown: true,
          title: translations.editPersonalInfo,
        }}
        component={ProfileEdit}
      />
      <Screen
        name={"PROFILE_TRANSACTION"}
        options={{
          presentation: "card",
          headerShown: true,
          title: translations.transactionsHistory,
        }}
        component={ProfileTransactions}
      />
      <Screen
        name={"PROFILE_CHANGE_PHONE"}
        options={{
          presentation: "card",
          headerShown: true,
          title: translations.editPersonalInfo,
        }}
        component={ProfileChangePhone}
      />
      <Screen
        name={"HISTORY_NEWS"}
        options={{
          presentation: "card",
          headerShown: true,
          title: '',
        }}
        component={HistoryMessages}
      />
    </Navigator>
  );
};
export default ProfileStack;
