import { blue } from "@src/theme/colors";
import { StyleSheet } from "react-native-size-scaling";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  button: { marginVertical: 15 },
  bottomBar: {
    shadowColor: "#0e0e0e",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },

    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 1,
    zIndex: 0,
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3E52B5",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  img: {
    width: 30,
    height: 30,
  },
});
