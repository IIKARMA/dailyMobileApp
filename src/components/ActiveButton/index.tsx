import { buttonBlue, white } from "@src/theme/colors";
import { FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ActiveButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
  onHanldePress: () => void;
}
const ActiveButton: FC<ActiveButtonProps> = ({
  isDisabled,
  isLoading,
  label,
  onHanldePress,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[s.containerBtn, isDisabled && s.disabled]}
      onPress={() => {
        onHanldePress();
      }}
    >
      <View>
        <Text style={s.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActiveButton;
const s = StyleSheet.create({
  containerBtn: {
    backgroundColor: buttonBlue,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
