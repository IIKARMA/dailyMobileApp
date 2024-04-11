import { useGetFaqQuery } from "@src/services/faqApi";
import { IFaq } from "@src/services/types";
import { gray, white } from "@src/theme/colors";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ShadowedView } from "react-native-fast-shadow";
import Carousel from "react-native-reanimated-carousel";
import FaqModal from "../FaqModal";
import useBoolean from "@src/hooks/useBoolean";
import { useCallback, useRef } from "react";
import { current } from "@reduxjs/toolkit";
const PAGE_WIDTH = Dimensions.get("window").width;
const baseOptions = {
  vertical: false,
  width: PAGE_WIDTH * 0.9,
  height: 80,
} as const;
const FaqList = () => {
  const {
    isBool: modalVisible,
    setTrue: handleOpenModal,
    setFalse: handleCloseModal,
  } = useBoolean();
  const currentAnswer = useRef("");
  const { data } = useGetFaqQuery();
  const faqs = data?.data.map((faq: IFaq) => {
    return {
      answer: faq?.answer.match(/([А-ЩЬЮЯҐЄІЇа-щьюяґєії]+)/g)?.join(" "),
      question: faq.question,
    };
  });
  const handleSelectFaq = useCallback((answer: string) => {
    currentAnswer.current = answer;
    handleOpenModal();
  }, []);

  return (
    <View style={{ marginTop: 30 }}>
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 10,
          color: gray,
          fontWeight: "bold",
        }}
      >
        Популярні питання
      </Text>
      <Carousel
        autoPlay
        style={s.carousel}
        pagingEnabled
        autoPlayInterval={4000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 0,
          parallaxAdjacentItemScale: 0.8,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        {...baseOptions}
        data={faqs || []}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleSelectFaq(item.answer as string);
            }}
          >
            <ShadowedView style={s.shadow}>
              <View style={s.faqCard}>
                <Text>{item.question}</Text>
              </View>
            </ShadowedView>
          </TouchableOpacity>
        )}
      />
      <FaqModal
        answer={currentAnswer.current}
        handleClose={handleCloseModal}
        modalVisible={modalVisible}
      />
    </View>
  );
};
export default FaqList;
const s = StyleSheet.create({
  carousel: { alignSelf: "center" },
  shadow: {
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  faqCard: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 50,
    width: PAGE_WIDTH - 80,
    backgroundColor: white,
  },
});
