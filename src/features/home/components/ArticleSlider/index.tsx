import Carousel from 'react-native-reanimated-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {white} from '@src/theme/colors';
import {
  useGetArticlesQuery,
  useLazyGerArticleIdQuery,
} from '@src/services/articlesApi';
import FastImage from 'react-native-fast-image';
import {useSharedValue} from 'react-native-reanimated';
import PaginationDot from '@src/components/PaginationDot';
import ArticleModal from '../ArticleModal';
import useBoolean from '@src/hooks/useBoolean';
import {
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {IArticle, IArticleResponse} from '@src/services/types';
import {setArticles} from '@src/store/slices/articleSlice';
import RenderHTML from 'react-native-render-html';
const PAGE_WIDTH = Dimensions.get('window').width;

const ArticleSlider = () => {
  const {data: article, refetch, error} = useGetArticlesQuery();
  console.log('🚀 ~ ArticleSlider ~ error:', error);
  const [getArticleId, {data}] = useLazyGerArticleIdQuery();
  const [isPending, startTransition] = useTransition();
  const [selectedAricle, setSelectedArticle] = useState<IArticle>();
  const [description, setDescription] = useState<string>('');
  console.log('🚀 ~ ArticleSlider ~ selectedAricle:', selectedAricle);
  const descriptionDefer = useDeferredValue(data?.description);
  const progressValue = useSharedValue(0);
  const {
    isBool: modalVisible,
    setTrue: handleOpenModal,
    setFalse: handleCloseModal,
  } = useBoolean();
  const [currentAnswer, setCurrentAnswer] = useState<IArticle>();
  const handleOpen = useCallback((item: IArticle) => {
    startTransition(() => {
      getArticleId(item.id)
        .unwrap()
        .then(res => {
          if (res) setDescription(res.description);
        });
      setSelectedArticle(item);
      handleOpenModal();
    });
  }, []);
  const _renderHtml = useMemo(
    () =>
      description ? (
        <RenderHTML contentWidth={300} source={{html: description}} />
      ) : (
        <View />
      ),
    [description],
  );
  useEffect(() => {
    data && setDescription(data?.description);
    return () => {};
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <View>
      <Carousel
        width={Dimensions.get('window').width - 40}
        height={Dimensions.get('window').width / 2}
        loop
        style={s.carousel}
        autoPlay={false}
        pagingEnabled
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        autoPlayInterval={3200}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
        }}
        data={article ?? []}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleOpen(item);
              }}
              style={{
                height: Dimensions.get('window').width / 2,
                width: Dimensions.get('window').width - 60,
                alignSelf: 'center',
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{uri: item?.banner}}
                style={s.img}
              />
            </TouchableOpacity>
          );
        }}
      />
      {!!progressValue && (
        <View style={s.pagination}>
          {article?.map((backgroundColor, index) => (
            <PaginationDot
              animValue={progressValue}
              index={index}
              key={index}
              isRotate={false}
              length={article?.length || 2}
            />
          ))}
        </View>
      )}
      <Suspense>
        <ArticleModal
          renderHtml={() => _renderHtml}
          description={String(descriptionDefer)}
          title={selectedAricle?.title || ''}
          image={selectedAricle?.banner || ''}
          articleId={selectedAricle?.id || ''}
          modalVisible={modalVisible}
          handleClose={handleCloseModal}
        />
      </Suspense>
    </View>
  );
};
const s = StyleSheet.create({
  carousel: {alignSelf: 'center', marginTop: 20},
  shadow: {
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  img: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 0,
    borderRadius: 20,
  },
  faqCard: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 200,
    width: PAGE_WIDTH - 80,
    backgroundColor: white,
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
    paddingTop: 10,
  },
});
export default ArticleSlider;
