import { TypeSex } from "@src/store/slices/types";
import { buttonBlue, lightPurple, purple, white } from "@src/theme/colors";
import { FC, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ISwitch {
  data: any[];
  handleSelect: (item: TypeSex | any) => void;
}
const Switch: FC<ISwitch> = ({ data, handleSelect }) => {
  const [selectedItem, setSelectItem] = useState(0);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        alignItems: "flex-end",
        borderRadius: 10,
        paddingVertical: 10,
     
      }}
    >
      {data.map((value, index) => (
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            borderRadius: 5,
            alignItems: "center",
            width: Dimensions.get("window").width /2.2,
            backgroundColor: selectedItem === index ? buttonBlue : white,
          }}
          onPress={() => {
            handleSelect(value.value);

            setSelectItem(index);
          }}
        >
          <Text>{value?.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default Switch;
