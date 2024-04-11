import { PERMISSIONS, request } from "react-native-permissions";
import { Platform } from "react-native";

export const cameraPermision = async () => {
  const requestPermisionCamera = {
    ["ios"]: PERMISSIONS.IOS.CAMERA,
    ["android"]: PERMISSIONS.ANDROID.CAMERA,
  } as const;

  const platform =
    requestPermisionCamera[Platform.OS === "ios" ? "ios" : "android"];
  const granted = await request(platform);
  return granted;
};
