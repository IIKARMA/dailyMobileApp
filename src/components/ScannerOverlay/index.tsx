import React from "react";
import { styles } from "./styles";
import { Dimensions, View, Text } from "react-native";

export const ScannerOverlay = (layoutSize: any) => {
  return (
    <>
      <View style={[styles.codeScanArea]} />
      <View style={[styles.codeScanTrans, styles.codeScanTransTop]} />
      <View style={[styles.codeScanTrans, styles.codeScanTransRight]} />
      <View style={[styles.codeScanTrans, styles.codeScanTransBottom]} />
      <View style={[styles.codeScanTrans, styles.codeScanTransLeft]} />
    </>
  );
};
