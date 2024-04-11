import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import { FC } from "react";
interface IPaginationDot {
  animValue: { value: number };
  index: number;
  length: number;
  isRotate: boolean;
}
const PaginationDot: FC<IPaginationDot> = ({
  animValue,
  index,
  length,
  isRotate,
}) => {
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        ...s.dot,
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: "#3E52B5",
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};
const s = StyleSheet.create({
  container: { flexDirection: "row", paddingVertical: 10 },
  item: {
    paddingHorizontal: 20,
  },
  img: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 0,
    borderRadius: 20,
  },
  containerDots: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 12,
    gap: 8,
  },
  dot: {
    backgroundColor: "#F1F1F1",
    height: 8,
    borderRadius: 8,
    overflow: "hidden",
    width: 8,
    borderWidth: 1,
    borderColor: "#3E52B5",
  },
});
export default PaginationDot;
