import { IconCancel } from "@src/assets/icons/IconCancel";
import ActiveButton from "@src/components/ActiveButton";
import { buttonBlue, purple, white } from "@src/theme/colors";
import { FC } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface IFaqModal {
  modalVisible: boolean;
  handleClose: () => void;
  answer: string;
}
const FaqModal: FC<IFaqModal> = ({ modalVisible, handleClose, answer }) => {
  return (
    <View>
      <Modal
        style={{ backgroundColor: "black" }}
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View
          style={{
            marginTop: "70%",
            borderRadius: 20,
            padding: 20,
            paddingBottom: 10,
            backgroundColor: buttonBlue,
            width: "90%",
            alignSelf: "center",
          }}
        >
          <View style={{ padding: 10, justifyContent: "center" }}>
            <Text style={s.text}>{answer}</Text>
          </View>
          <TouchableOpacity style={s.button} onPress={handleClose}>
            <Text style={s.text}>Зрозуміло</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default FaqModal;
const s = StyleSheet.create({
  centeredView: {
    height: 600,
  },
  button: {
    alignSelf: "center",
    backgroundColor: purple,
    padding: 10,
    borderRadius: 12,
  },
  close: { paddingTop: 10, paddingRight: 10, alignSelf: "flex-end" },
  text: { color: white, fontWeight: "500", textAlign: "center" },
});
