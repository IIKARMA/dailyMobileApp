import { white } from "@src/theme/colors";
import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
interface IDifferencePercentProps {
  diffrence: number;
}
const DifferencePercent: FC<IDifferencePercentProps> = ({ diffrence }) => {
  return (
    <LinearGradient
      style={s.block}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0.5 }}
      colors={["#fd151b", "#ff6d00"]}
    >
      <Text style={s.text}>{diffrence}%</Text>
    </LinearGradient>
  );
};
export default DifferencePercent;
const s = StyleSheet.create({
  block: {
    borderRadius: 8,
    borderBottomRightRadius: 8,
    position: "absolute",
    top: 10,
    left: 8,
    width: 35,
    padding: 3,
  },
  text: { textAlign: "center", fontSize: 8, color: white, fontWeight: "bold" },
});
