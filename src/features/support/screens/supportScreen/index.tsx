import ActiveButton from "@src/components/ActiveButton";
import Screen from "@src/components/Screen";
import TextField from "@src/components/TextField";
import useInput from "@src/hooks/useInput";
import useKeyboardPadding from "@src/hooks/useKeyboardPadding";
import useShowToast from "@src/hooks/useShowToast";
import { useSendFeedbackMutation } from "@src/services/feedBackApi";
import { User } from "@src/store/slices/types";
import { useAppSelector } from "@src/store/store";
import translations from "@src/translations";
import { useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";

const SupportScreen = () => {
  const { value, onChangeText } = useInput("");
  const { handleToastShow } = useShowToast();
  const { keyboardPadding } = useKeyboardPadding(120);
  const [sendMessage] = useSendFeedbackMutation();
  const { phone, nameFirst } = useAppSelector(
    (state) => state.user.user
  ) as User;

  const handleSend = () => {
    sendMessage({
      phone: phone,
      name: nameFirst,
      email: "",
      text: value,
    })
      .unwrap()
      .then((res) => {
        handleToastShow({
          message: "Повідомлення успішно відправлено",
          type: "success",
        });
      })
      .catch((error) =>
        handleToastShow({
          type: "danger",
        })
      );
  };

  return (
    <Screen offTop="off" isHiddenLogo>
      <View style={{ flex: 1, justifyContent: "center", paddingBottom: 120 }}>
        <Text style={{ fontWeight: "500" }}>
          {translations.haveQuestion}
          {"\n"}
          {translations.writeUs}
        </Text>
        <TextField
          keyboardType="default"
          label={translations.yourMessage}
          placeholder={translations.message}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <View style={{ paddingBottom: keyboardPadding }}>
        <ActiveButton label={translations.sending} onHanldePress={handleSend} />
      </View>
    </Screen>
  );
};
export default SupportScreen;
