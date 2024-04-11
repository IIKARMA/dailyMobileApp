import IconHomeBalls from "@src/assets/icons/IconHomeBalls";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { styles } from "./styles";
import Logo from "@src/components/Logo";
import translations from "@src/translations";
import { useAppSelector } from "@src/store/store";
import { User } from "@src/store/slices/types";
import BarCode from "@src/components/BarCode";
import {
  HomeStackParamList,
  HomeStackProps,
} from "@src/navigation/stacks/home/type";
import { SCREENS } from "@src/navigation/enums";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";

const HomeHeader: FC = () => {
  const { balance, code } = useAppSelector((state) => state.user.user as User);
  const navigation = useNavigation<HomeStackProps['navigation']>();
  return (
    <View style={styles.container}>
      <Logo />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(SCREENS.HISTORY_PURCHASES);
        }}
        style={styles.box}
      >
        <IconHomeBalls />
        <View style={{ paddingLeft: 14 }}>
          <Text style={styles.label}>{translations.bonus}</Text>
          <Text style={styles.count}>{balance}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};
export default HomeHeader;
