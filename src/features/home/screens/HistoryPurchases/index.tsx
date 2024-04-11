import Label from "@src/components/Label";
import { useUserTransactionQuery } from "@src/services/userApi";
import translations from "@src/translations";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import Screen from "@src/components/Screen";
import { white } from "@src/theme/colors";
import Transction from "@src/features/profile/screens/profileTransactions/components/transaction";

const ProfileTransactions = () => {
  const { data: transactions } = useUserTransactionQuery();
  return (
    <View style={s.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flexShrink: 1 }}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={transactions?.data || []}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", marginTop: "25%", gap: 20 }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{ height: 200, width: "100%" }}
              source={require("@src/assets/images/empty.png")}
            />
            <Label size={18} text={translations.listEmpty} />
          </View>
        )}
        renderItem={({ item }) => <Transction transaction={item} />}
      />
    </View>
  );
};
export default ProfileTransactions;
const s = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom: 30,
  },
});
