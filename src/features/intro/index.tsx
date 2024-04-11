import Screen from "@src/components/Screen";
import { useCallback, useRef, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import FastImage, { Source } from "react-native-fast-image";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { black } from "@src/theme/colors";
import ActiveButton from "@src/components/ActiveButton";
import PurplePutton from "@src/components/PurpleButton";
import { useAppDispatch } from "@src/store/store";
import { setOnBoard } from "@src/store/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { AuthorizationIntroProps } from "@src/navigation/stacks/authorization/type";
import { SCREENS } from "@src/navigation/enums";
interface ISlide {
  key: number;
  title: string;
  text: string;
  image: Source;
}
const slideList: ISlide[] = [
  {
    key: 1,
    title: "Накопичуй бонуси",
    text: "Отримай бонуси за кожну покупку, та використовуй їх в майбутньому.",
    image: require("@src/assets/images/intro/1.png"),
  },
  {
    key: 2,
    title: "Слідкуй за новинами",
    text: "Актуальні акції та новини в твоєму улюбленому магазині відтепер завжди під рукою.",
    image: require("@src/assets/images/intro/2.png"),
  },
  {
    key: 3,
    title: "Знаходь магазини",
    text: "Всі магазини міста на мапі. Знайди найближчий варіант для себе.",
    image: require("@src/assets/images/intro/3.png"),
  },
  {
    key: 4,
    title: "Скануй товар",
    text: "Скануй товар в магазині, та дізнавайся всю актуальну інформацію про нього.",
    image: require("@src/assets/images/intro/4.png"),
  },
];
const Intro = () => {
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef(null);
  const navigation = useNavigation<AuthorizationIntroProps["navigation"]>();
  const _renderSlide = useCallback(
    (item: ISlide) => (
      <View style={styles.slide}>
        <View style={styles.containerImage}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={item.image}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.text}</Text>
        </View>
      </View>
    ),
    []
  );

  const handleNextPress = useCallback(() => {
    if (currentSlide !== slideList.length - 1) {
      setCurrentSlide(currentSlide + 1);
      !!slider.current && slider.current?.goToSlide(currentSlide + 1);
    } else {
      dispatch(setOnBoard(true));
      navigation.navigate(SCREENS.AUTHORIZATION_PHONE);
    }
  }, [currentSlide]);

  const handleSkipPress = useCallback(() => {
    dispatch(setOnBoard(true));
    navigation.navigate(SCREENS.AUTHORIZATION_PHONE);
  }, []);
  return (
    <Screen isHiddenLogo offTop="off">
      <View style={styles.container}>
        <AppIntroSlider
          goToSlide={currentSlide}
          ref={(ref) => (slider.current = ref)} // the ref
          dotStyle={styles.dots}
          activeDotStyle={styles.activeDots}
          data={slideList}
          onSlideChange={(e) => setCurrentSlide(e)}
          renderItem={({ item }) => _renderSlide(item)}
          showNextButton={false}
          showDoneButton={false}
        />
        <View style={styles.containerButtons}>
          <ActiveButton label="Далі" onHanldePress={handleNextPress} />

          <View style={{ alignSelf: "center" }}>
            <PurplePutton label="Пропустити" onHanldePress={handleSkipPress} />
          </View>
        </View>
      </View>
    </Screen>
  );
};
export default Intro;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    marginHorizontal: -20,
    // height: 700,
  },
  slide: {
    justifyContent: "space-evenly",
    alignContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    paddingBottom: 16,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: black,
  },
  containerImage: {
    maxHeight: Dimensions.get("window").height / 2.6,
    height: "100%",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  dots: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#3E52B5",
    width: 8,
    height: 8,
    marginTop: 10,
  },
  activeDots: {
    backgroundColor: "#3E52B5",
    width: 8,
    height: 8,
    marginTop: 10,
  },
  containerButtons: {
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
});
