import { PERMISSIONS, request } from "react-native-permissions";
import { Platform } from "react-native";

export const locationPermission = async () => {
  const requestPermisionLocation = {
    ["ios"]: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ["android"]: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  } as const;
  const platform =
    requestPermisionLocation[Platform.OS === "ios" ? "ios" : "android"];

  const granted = await request(platform);
  return granted
};
