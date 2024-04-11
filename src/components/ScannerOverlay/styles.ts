import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scanTitle: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    position: "absolute",
    zIndex: 1002,
  },
  spinnerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000003",
    zIndex: 1002,
  },
  codeScanArea: {
    borderWidth: 3,
    borderColor: "#fff",
    top: 190,
    alignSelf: "center",
    height: 190,
    borderRadius: 8,
    backfaceVisibility: "hidden",
    width: "80%",
    paddingBottom: "70%",
    position: "absolute",
    zIndex: 1001,
  },
  codeScanTrans: {
    backgroundColor: "#000",
    opacity: 0.3,
    zIndex: 1000,
    position: "absolute",
  },
  codeScanTransTop: {
    width: "100%",
    top: 420,
    alignSelf: "center",
    left: 90,
  },
  codeScanTransRight: {
    right: 0,
  },
  codeScanTransBottom: {
    width: "100%",
    bottom: 10,
    left: 0,
  },
  codeScanTransLeft: {
    left: 0,
  },
});
