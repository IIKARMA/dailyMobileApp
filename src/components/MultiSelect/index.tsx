import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { IRegion, IShop, IShopList, IUserUpdate } from "@src/services/types";
import { black, buttonBlue, white } from "@src/theme/colors";
import { Portal } from "@gorhom/portal";
import React, { RefObject, useCallback, useDeferredValue, useState } from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import ActiveButton from "../ActiveButton";
import { SelectType } from "@src/features/profile/types";
interface IMultiSelect {
  selectedItem: (SelectType | any | IRegion | IShop)[];
  bottomSheetRef: RefObject<BottomSheetMethods>;
  data: (SelectType | any | IRegion | IShop)[];
  selectType: SelectType;
  handleChange: (value: string, typeField: SelectType) => void;
}
const MultiSelect = ({
  bottomSheetRef,
  data,
  selectType,
  handleChange,
  selectedItem: selected,
}: IMultiSelect) => {
  console.log("🚀 ~ selected:", selected);
  const [selectedItem, setSelectItem] = useState<string>("");
const _data=useDeferredValue(data)
  const selectItem = useCallback(
    (item: any, index: number) => (
      <TouchableOpacity
        key={index.toString()}
        onPress={() => {
          setSelectItem(item.id);
          handleChange(item.id, selectType);
          bottomSheetRef.current?.close();
        }}
        style={{
          backgroundColor: selected.find((sel) => sel.id === item.id)
            ? buttonBlue
            : "#3333301f",
          borderRadius: 6,
          padding: 8,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {item.address || item.title || item.text}
        </Text>
      </TouchableOpacity>
    ),
    [data]
  );

  return (
    <Portal>
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        style={s.shadow}
        handleHeight={2}
        snapPoints={[data?.length > 2 ? "45%" : "25%"]}
      >
        <BottomSheetScrollView>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={s.scroll}>
            <View style={{ gap: 5 }}>{_data?.map(selectItem)}</View>
            <View style={{ paddingVertical: 20, marginBottom: 50 }}>
              <ActiveButton
                label="Обрати"
                onHanldePress={() => {
                  bottomSheetRef.current?.close();
                }}
              />
            </View>
          </ScrollView>
        </BottomSheetScrollView>
      </BottomSheet>
    </Portal>
  );
};
export default MultiSelect;
const s = StyleSheet.create({
  shadow: {
    shadowColor: black,
    shadowOffset: {
      height: -8,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  scroll: {
    borderRadius: 20,
    paddingVertical: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: white,
  },
});
