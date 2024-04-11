import { lightPurple, purple } from "@src/theme/colors";
import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { gap: 20, marginTop: 20 },
  cell: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",

    color: "#C9C9C9",
  },
  cellWrapper: {
    borderBottomWidth: 1,
    width: 40,
    borderBottomColor: purple,
    alignContent: "center",
    alignItems: "center",
  },
  focusCell: { borderBottomWidth: 1, borderBottomColor: lightPurple },
});
const CELL_COUNT = 4;
interface OtpInputProps {
  otpCode: string;
  handleInput: (code: string) => void;
}
const OtpInput: FC<OtpInputProps> = ({ otpCode, handleInput }) => {
  const [value, setValue] = useState<string>("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View
      style={{
        alignSelf: "center",
        gap: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 56,
      }}
    >
      <CodeField
        ref={ref}
        {...props}
        value={otpCode}
        onChangeText={(text) => {
          handleInput(text);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index.toString()}
            style={[styles.cellWrapper, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={[styles.cell]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
export default OtpInput;
