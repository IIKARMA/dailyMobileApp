import { FC, PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

const KeyboardAvoid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </KeyboardAvoidingView>
  );
};
export default KeyboardAvoid;
