import { SCREENS } from "@src/navigation/enums";
import HomeScreen from "@src/features/home/screens/HomeScreen";
import { HomeStackParamList } from "./type";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeTab } from "@src/navigation/tab";
import HistoryPurchases from "@src/features/home/screens/HistoryPurchases";
import ProfileStack from "../profile";
import Profile from "@src/features/profile/screens/profileMenu";
import ProductsList from "@src/features/products/screens/productsList";
import ProductScreen from "@src/features/products/screens/productScreen";
import { black, gray, purple } from "@src/theme/colors";

const { Screen, Navigator } = createStackNavigator<HomeStackParamList>();
const HomeStack = () => {
  return (
    <Navigator
      screenOptions={{
        detachPreviousScreen:true,
        keyboardHandlingEnabled: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerShown: false,
        headerTitleStyle: { fontSize: 16, color: "#333" },
        headerLeftContainerStyle: { left: 10 },
        headerTruncatedBackTitle: "#333",
        headerTintColor: purple,
      }}
    >
      <Screen name={"HOME"} component={HomeScreen} />
      <Screen name={"HISTORY_PURCHASES"} component={HistoryPurchases} />
      <Screen
        options={{
          headerShown: true,
          title: " ",
        }}
        name={"PRODUCT_CATEGORY"}
        component={ProductsList}
      />
      <Screen
        options={{
          headerShown: true,
          title: "Детальна інформація",
        }}
        name={"PRODUCT_SCREEN"}
        component={ProductScreen}
      />
    </Navigator>
  );
};
export default HomeStack;
