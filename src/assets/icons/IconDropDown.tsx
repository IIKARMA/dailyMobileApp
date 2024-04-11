import {
  Svg,
  Path,
  Rect,
  Mask,
  G,
  Circle,
  ClipPath,
  Defs,
  Stop,
  LinearGradient,
} from "react-native-svg";
export const IconDropDown = () => {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
    >
      <G filter="url(#a)">
        <Path
          fill="#1C1C1E"
          d="M19.651 13.654a1.145 1.145 0 0 0-.36-.808l-6.838-6.689a1.016 1.016 0 0 0-.73-.299c-.588 0-1.045.457-1.045 1.046 0 .282.114.545.316.747l6.152 6.003-6.152 6.003a1.037 1.037 0 0 0-.316.747c0 .59.457 1.046 1.046 1.046.28 0 .527-.105.73-.299l6.837-6.697c.246-.228.36-.492.36-.8Z"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
};
