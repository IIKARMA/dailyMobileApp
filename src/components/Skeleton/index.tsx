import { Dimensions, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const WIDTH = Dimensions.get("window").width / 2.1;
const Skeleton = () => {
  return (
    <SkeletonPlaceholder angle={0} borderRadius={4}>
      <SkeletonPlaceholder.Item width={WIDTH}>
        <SkeletonPlaceholder.Item width="80%" height={125} />
        <SkeletonPlaceholder.Item width="80%" marginVertical={3} height={5} />
        <SkeletonPlaceholder.Item width={70} marginVertical={3} height={5} />
        <SkeletonPlaceholder.Item width={70} marginVertical={3} height={5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default Skeleton;
