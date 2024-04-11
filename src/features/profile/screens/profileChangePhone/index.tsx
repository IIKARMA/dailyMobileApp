import { useNavigation } from "@react-navigation/native";
import ActiveButton from "@src/components/ActiveButton";
import Label from "@src/components/Label";
import OtpInput from "@src/components/OtpInput";
import PurplePutton from "@src/components/PurpleButton";
import Screen from "@src/components/Screen";
import TextField from "@src/components/TextField";
import useBoolean from "@src/hooks/useBoolean";
import useInput from "@src/hooks/useInput";
import useShowToast from "@src/hooks/useShowToast";
import {
  useUserChangePhoneMutation,
  useUserConfirmChangePhoneMutation,
} from "@src/services/userApi";
import { loggedOut } from "@src/store/slices/userSlice";
import { useAppDispatch } from "@src/store/store";
import { black } from "@src/theme/colors";
import translations from "@src/translations";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileChangePhone = () => {
  const {
    isBool: showConfirmInput,
    setTrue: onShowConfirmInput,
    setFalse: onHidenConfirmInput,
  } = useBoolean();
  const dispatch = useAppDispatch();
  const { value: code, onChangeText: onChangeCode } = useInput("");
  const { value: phone, onChangeText } = useInput("");
  const { handleToastShow } = useShowToast();
  const [changePhone] = useUserChangePhoneMutation();
  const [confirmChangePhone] = useUserConfirmChangePhoneMutation();
  const hanldeSubmit = useCallback(() => {
    changePhone(phone)
      .unwrap()
      .then(() => {
        onShowConfirmInput();
      });
  }, [phone]);
  const handleConfirm = useCallback(() => {
    confirmChangePhone(Number(code))
      .unwrap()
      .then(() => {
        dispatch(loggedOut());
      })
      .catch((error) =>
        handleToastShow({
          message:
            error?.data?.message || error || translations.toastMessages.error,
          type: "danger",
        })
      );
  }, [code]);
  return (
    <Screen offTop="off" isHiddenLogo>
      <View style={s.container}>
        <Label size={14} text={translations.profile.inputNewPhone} />
        {!showConfirmInput ? (
          <>
            <TextField
              isPhone
              keyboardType="numeric"
              value={phone}
              onChangeText={onChangeText}
              placeholder="+38 (000) 000 00 00"
              label={translations.phone}
            />
            <Label size={12} text={translations.profile.afterChangePhone} />
          </>
        ) : (
          <>
            <Text style={s.labelCode}>{translations.codeConfirm}</Text>

            <OtpInput otpCode={code} handleInput={onChangeCode} />
            <View style={{ alignSelf: "center" }}>
              <PurplePutton
                label="Змінити номер телефону"
                onHanldePress={onHidenConfirmInput}
              />
            </View>
          </>
        )}
      </View>
      <View style={{ paddingBottom: 120 }}>
        <ActiveButton
          label={
            !showConfirmInput ? translations.sendCode : translations.submit
          }
          onHanldePress={!showConfirmInput ? hanldeSubmit : handleConfirm}
        />
      </View>
    </Screen>
  );
};
export default ProfileChangePhone;
const s = StyleSheet.create({
  labelCode: {
    fontWeight: "600",
    fontSize: 20,
    color: black,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    paddingBottom: 120,
  },
});
