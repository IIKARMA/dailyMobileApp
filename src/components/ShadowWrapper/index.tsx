import { FC, PropsWithChildren } from "react";
import { View } from "react-native";
import { ShadowedView } from "react-native-fast-shadow";
interface IShadowWrapperProps {
  bg?: string;
}
const ShadowWrapper: FC<PropsWithChildren<IShadowWrapperProps>> = ({ children, bg='white'}) => {
  return (
    <View>
      <ShadowedView
        style={{
          backgroundColor: bg,
          shadowOpacity: 0.2,
          shadowRadius: 7,
          borderRadius: 8,
          shadowOffset: {
            width: 0,
            height: 5,
          },
        }}
      >
        {children}
      </ShadowedView>
    </View>
  );
};
export default ShadowWrapper;
