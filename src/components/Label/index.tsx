import { black, darkGray, gray } from "@src/theme/colors";
import { FC } from "react";
import { StyleSheet, Text } from "react-native";
type LabelType = 18 | 16 | 14 | 12;

interface LabelProps {
  text: string;
  size?: LabelType;
}

const Label: FC<LabelProps> = ({ text, size = 12 }) => {
  return <Text style={[s.label, { fontSize: size }]}>{text}</Text>;
};
export default Label;
const s = StyleSheet.create({
  label: {
    color: gray,
    fontSize: 12,
  },
});
