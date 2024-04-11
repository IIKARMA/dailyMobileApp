import { FC, PropsWithChildren } from "react";
import { EdgeMode, SafeAreaView } from "react-native-safe-area-context";
import { white } from "@src/theme/colors";
import Logo from "@src/components/Logo";
import {
  Keyboard,
  StatusBar,
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
  View,
  ViewStyle,
} from "react-native";
import KeyboardAvoid from "../KeyboardAwoid";

interface ScreenProps {
  style?: StyleProp<ViewStyle>;
  isHiddenLogo?: boolean;
  offTop?: EdgeMode;
}
const Screen: FC<PropsWithChildren<ScreenProps>> = ({
  children,
  style,
  isHiddenLogo,
  offTop = "additive",
}) => {
  return (
    <SafeAreaView edges={{ top: offTop }} style={[s.container, style && style]}>
      <KeyboardAvoid>
        <TouchableWithoutFeedback
          accessible={false}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ flex: 1 }}>
            {!isHiddenLogo && <Logo />}
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoid>
    </SafeAreaView>
  );
};
export default Screen;
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
});
