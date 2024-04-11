import { blue } from "@src/theme/colors";
import { StyleSheet, Dimensions, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "ios" ? 12 : 0,
    zIndex: 3,
    alignItems: "center",
    backgroundColor: "#fffff0f",
  },
  img: {
    width: 100,
    height: 47,
  },
  label: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "400",
  },
  count: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
  },
  box: {
    position: "absolute",
    right: 0,
    top: Platform.OS == "ios" ? 12 : 2,
    flexDirection: "row",
  },
});
