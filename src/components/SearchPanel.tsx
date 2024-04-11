import { IconSearch } from "@src/assets/icons/IconSearch";
import { TextInput, Pressable, StyleSheet, View } from "react-native";
import { ShadowedView } from "react-native-fast-shadow";
import { IconCancel } from "@src/assets/icons/IconCancel";
import { FC } from "react";
import { blue, buttonBlue } from "@src/theme/colors";

interface ISearchPanel {
  value: string;
  handleCancel: () => void;
  handleInput: (text: string) => void;
}

const SearchPanel: FC<ISearchPanel> = ({
  value,
  handleCancel,
  handleInput,
}) => {
  return (
    <View>
      <ShadowedView style={s.shadow}>
        <View style={s.panel}>
          <IconSearch />
          <TextInput  
            value={value}
            style={{color:blue,fontWeight:'500', padding: 6, width: "85%" }}
            onChangeText={handleInput}
          />
          {value !== "" && (
            <Pressable onPress={handleCancel}>
              <IconCancel />
            </Pressable>
          )}
        </View>
      </ShadowedView>
    </View>
  );
};
export default SearchPanel;
const s = StyleSheet.create({
  panel: {
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,paddingHorizontal:6,
    flexDirection: "row",
    alignItems: "center",
  },
  shadow: {
    backgroundColor: "#fffff0f",
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});
