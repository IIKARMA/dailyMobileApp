import { IconCancel } from "@src/assets/icons/IconCancel";
import Label from "@src/components/Label";
import { gray, lightPurple, white } from "@src/theme/colors";
import RenderHtml from "react-native-render-html";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import {
  ReactElement,
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  useGerArticleIdQuery,
  useGetArticlesQuery,
  useLazyGerArticleIdQuery,
} from "@src/services/articlesApi";
import { IArticle, IArticleResponse } from "@src/services/types";
import { useFocusEffect } from "@react-navigation/native";
import WebView from "react-native-webview";
interface IArticleModal {
  articleId: string;
  modalVisible: boolean;
  handleClose: () => void;
  image: string;
  title: string;
  description: string;
  renderHtml: () => JSX.Element;
}
const ArticleModal = ({
  modalVisible,
  articleId,
  renderHtml,
  handleClose,
  image,
  title,
  description,
}: IArticleModal) => {
  console.log(renderHtml());

  return (
    <View style={{ backgroundColor: "#4444044" }}>
      <Modal
        style={{ flex: 1, backgroundColor: "black" }}
        presentationStyle="pageSheet"
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={{ flex: 1, backgroundColor: white }}>
          <TouchableOpacity style={s.close} onPress={handleClose}>
            <IconCancel />
          </TouchableOpacity>
          <View
            style={{
              borderRadius: 20,
              overflow: "hidden",
              height: 280,
              alignSelf: "center",
              width: "95%",
            }}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={{
                alignSelf: "center",
                height: 280,
                width: "100%",
              }}
              source={{ uri: image }}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: "100%" }}
          >
            <View
              style={{
                paddingBottom: 20,
                paddingHorizontal: 15,
                gap: 20,
                paddingTop: 20,
              }}
            >
              <Label text={title} size={18} />
              {/* <RenderHtml source={{ html: description }} contentWidth={200} /> */}
              {renderHtml()}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 22,
  },
  close: { padding: 15, alignSelf: "flex-end" },
});
export default ArticleModal;
