import ShadowWrapper from "@src/components/ShadowWrapper";
import { ITransaction } from "@src/services/types";
import { green, lightPurple, red } from "@src/theme/colors";
import { priceFormat } from "@src/utils/priceFormat";
import moment from "moment";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
interface ITransctionProps {
  transaction: ITransaction;
}
const Transction: FC<ITransctionProps> = ({ transaction }) => {
  return (
    <View>
      <View style={s.date}>
        <Text style={{ textAlign: "center" }}>
          {moment(transaction.createdAt).format("DD.MM.YYYY")}
        </Text>
      </View>
      <ShadowWrapper>
        <View style={s.transaction}>
          <View style={{ gap: 2 }}>
            <Text style={{ fontSize: 14 }}>{transaction?.region}</Text>
            <Text style={{ fontSize: 14 }}>{transaction?.address}</Text>
          </View>
          <View style={{ gap: 5, alignItems: "flex-end" }}>
            <Text style={[s.text, { fontWeight: "500" }]}>
              {priceFormat(transaction?.sum)}
            </Text>
            <Text
              style={[s.text, { color: transaction?.amount < 0 ? red : green }]}
            >
              {transaction?.amount < 0
                ? transaction?.amount
                : "+" + transaction?.amount}
            </Text>
          </View>
        </View>
      </ShadowWrapper>
    </View>
  );
};
export default Transction;
const s = StyleSheet.create({
  text: { fontSize: 16, fontWeight: "bold" },
  date: {
    backgroundColor: lightPurple,
    paddingVertical: 5,
    borderRadius: 8,
    marginVertical: 10,
   
  },
  transaction: {
    borderRadius: 8,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
