import { FC } from "react";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import translations from "@src/translations";
import { useAppSelector } from "@src/store/store";
import { User } from "@src/store/slices/types";
import { firstLetterToUpperCase } from "@src/utils/firstLetterToUpperCase";
interface IBarCode {
  isHiddenName?: boolean;
  barcode?: string;
  _style?: StyleProp<ViewStyle>;
}
const BarCode: FC<IBarCode> = ({
  isHiddenName,
  barcode,
  _style = StyleSheet.create({
    barcode: {
      overflow: "hidden",
      height: 38,
      marginHorizontal: 20,
      marginVertical: 8,
    },
  }),
}) => {
  const { code, nameFirst } = useAppSelector(
    (state) => state.user.user as User
  );

  return (
    <View
      style={{
        top: Platform.OS === "ios" ? 120 : 100,
        alignSelf: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 20,
        position: "absolute",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        zIndex: 32,
      }}
    >
      {!isHiddenName && <Text>{firstLetterToUpperCase(nameFirst)}</Text>}
      <Barcode
        value={!isHiddenName ? `app.${code}` : String(barcode)}
        style={{
          overflow: "hidden",
          height: 38,
          marginHorizontal: 20,
          marginVertical: !isHiddenName ? 8 : 0,
        }}
        maxWidth={Dimensions.get("window").width / 1.3}
      />
      {!isHiddenName && (
        <Text style={{ fontSize: 10, color: "#6C6C6C" }}>
          {translations.scanBarCode}
        </Text>
      )}
    </View>
  );
};
export default BarCode;
