import {
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
  View,
} from "react-native";
import { FC, MutableRefObject, RefObject, useRef } from "react";
import { black, blue, gray } from "@src/theme/colors";
import Label from "../Label";
import TextInputMask from "react-native-text-input-mask";

interface TextFieldProps {
  label?: string;
  placeholder: string;
  keyboardType: TextInputProps["keyboardType"];
  value: string;
  isBoldLebel?: boolean;
  isPhone?: boolean;
  onChangeText: (value: string) => void;
  leftImage?: string;
}

const TextField: FC<TextFieldProps> = ({
  label = "",
  placeholder = "",
  keyboardType = "default",
  value = "",
  isBoldLebel,
  isPhone,
  onChangeText,
  leftImage,
}) => {
  return (
    <View style={s.inputContainter}>
      {label && <Label text={label} />}
      {!isPhone ? (
        <TextInput
          inlineImageLeft={leftImage}
          style={s.input}
          placeholderTextColor={gray}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInputMask
          style={s.input}
          keyboardType={keyboardType}
          cursorColor={black}
          placeholderTextColor={gray}
          placeholder={placeholder}
          value={value}
          mask={"+38 ([000]) [000] [00] [00]"}
          onChangeText={(text, extracted) => {
            onChangeText(String(extracted));
          }}
        />
      )}
    </View>
  );
};

export default TextField;

const s = StyleSheet.create({
  inputContainter: {
    width: "100%",
    paddingVertical: 10,
    alignSelf: "center",
    borderBottomColor: blue,
    borderBottomWidth: 1,
    gap: 10,
  },
  input: {
    fontSize: 16,
    color: black,
    fontWeight: "500",
  },
  boldLabel: { fontWeight: "bold" },
  label: { fontSize: 10, color: black },
});
