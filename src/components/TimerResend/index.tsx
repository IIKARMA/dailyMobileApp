import useBoolean from "@src/hooks/useBoolean";
import { lightPurple, mediumPurple, purple } from "@src/theme/colors";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PurplePutton from "../PurpleButton";
import translations from "@src/translations";
interface TimerResendProps {
  hadleResend: () => Promise<void>;
}
const TimerResend: FC<TimerResendProps> = ({ hadleResend }) => {
  const [second, setSecond] = useState<number>(30);
  useEffect(() => {
    let timer: any;
    if (second > 0)
      timer = setInterval(
        () => setSecond((prevSecond) => prevSecond - 1),
        1000
      );
    return () => clearInterval(timer);
  }, [second]);

  return second > 0 ? (
    <Text style={s.timerText}>
      {translations.repeatSendSms}{" "}
      {second <= 9 ? `00:0${second}` : `00:${second}`}
    </Text>
  ) : (
    <PurplePutton
      label={translations.sendCode}
      onHanldePress={() => {
        hadleResend();
        setSecond(30);
      }}
    />
  );
};
export default TimerResend;
const s = StyleSheet.create({
  timerText: { paddingVertical: 8, color: mediumPurple, fontWeight: "bold" },
});
