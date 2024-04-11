import { Image, Platform, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
const Logo = () => {
  return (
    <FastImage
      style={s.logo}
      resizeMode="contain"
      source={require("@src/assets/images/Logo.png")}
    />
  );
};
export default Logo;
const s = StyleSheet.create({
  containerLogo: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 135,
    marginBottom: 0,
    height: 47,
  },
  logo: { paddingTop: 30, width: "100%", height: 42, resizeMode: "cover" },
});
