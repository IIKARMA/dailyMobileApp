import { purple } from "@src/theme/colors";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface PurplePuttonProps {
  label: string;
  onHanldePress: () => void;
}
const PurplePutton: FC<PurplePuttonProps> = ({ label, onHanldePress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onHanldePress}>
        <Text style={s.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PurplePutton;
const s = StyleSheet.create({
  label: { color: purple, paddingVertical: 9, fontSize: 14 },
});
