import { IconCancel } from "@src/assets/icons/IconCancel";
import { FC } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
interface IIMageViewer {
  modalVisible: boolean;
  handleClose: () => void;
  image: string;
}
const ImageViewer: FC<IIMageViewer> = ({
  modalVisible,
  handleClose,
  image,
}) => {
  return (
    <View style={{ backgroundColor: "#4444044" }}>
      <Modal
        style={{ flex: 1, backgroundColor: "black" }}
        presentationStyle="pageSheet"
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <TouchableOpacity style={s.close} onPress={handleClose}>
            <IconCancel />
          </TouchableOpacity>
          <View style={{ borderRadius: 20, marginTop: "45%" }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{
                borderRadius: 20,
                height: 260,
                width: "95%",
                alignSelf: "center",
              }}
              source={{ uri: image }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ImageViewer;
const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 22,
  },
  close: { padding: 15, alignSelf: "flex-end" },
});
