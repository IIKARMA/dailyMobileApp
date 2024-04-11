import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardPadding = (initialValue: number) => {
  const [keyboardPadding, setKeyboardPaddin] = useState(initialValue);
  useEffect(() => {
    Keyboard.addListener("keyboardWillChangeFrame", () => {
      setKeyboardPaddin(20);
    });
    Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardPaddin(initialValue);
    });
  }, [initialValue]);
  return { keyboardPadding };
};
export default useKeyboardPadding;
