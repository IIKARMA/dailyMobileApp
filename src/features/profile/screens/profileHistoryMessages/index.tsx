import { useGetArticlesQuery } from "@src/services/articlesApi";
import { black, gray, lightPurple, white } from "@src/theme/colors";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
const HistoryMessages = () => {
  const { data: article } = useGetArticlesQuery();
  return (
    <View style={s.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flexShrink: 1 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        ListFooterComponent={() => <View style={{ height: 89 }} />}
        data={article || []}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#33333013",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                height: 200,
                overflow: "hidden",
              }}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                source={{ uri: item.banner }}
                style={{ flex: 1, width: "100%", height: 150 }}
              />
            </View>
            <View style={{alignSelf:'center',paddingTop:20}}>
              <Text style={{ color: black }}>{item.title}</Text>
              <Text style={{ color: black }}>{item.messageBody}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default HistoryMessages;
const s = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom: 30,
  },
});
