import Badge from '@src/components/Badge';
import Screen from '@src/components/Screen';
import {PrtoductTypes} from '@src/features/home/components/ProductsByType';
import {ProductScreenProps} from '@src/navigation/stacks/home/type';
import type {Product} from '@src/services/types';
import {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from '../../components/ImageViewer';
import useBoolean from '@src/hooks/useBoolean';
import {CamelCase} from '@src/consts/regEx';
import {useRoute} from '@react-navigation/native';
import {priceFormat} from '@src/utils/priceFormat';
import {gray, lightPurple, red} from '@src/theme/colors';
import DifferencePercent from '@src/components/DifferencePercent';
import {differencePercent} from '@src/utils/differencePercent';
import translations from '@src/translations';

const ProductScreen = () => {
  const {product, isVisibleMobilePrice = false} =
    useRoute<ProductScreenProps['route']>().params;
  const {
    isBool: modalVisible,
    setTrue: handleOpenModal,
    setFalse: handleCloseModal,
  } = useBoolean();
  console.log(product);

  return (
    <Screen offTop="off" isHiddenLogo>
      <View style={{flex: 1, paddingTop: 20}}>
        <Badge type={product?.promo_price_type as PrtoductTypes} />
        <TouchableOpacity onPress={handleOpenModal}>
          <FastImage
            defaultSource={require('@src/assets/images/no_image.png')}
            resizeMode={FastImage.resizeMode.contain}
            style={{height: 280, width: '100%'}}
            source={{uri: product?.image}}
          />
          {product?.promo_price && (
            <DifferencePercent
              diffrence={Number(
                differencePercent(
                  Number(product?.promo_price),
                  Number(product?.price),
                ),
              )}
            />
          )}
          {product?.status === 'deactivated' ? (
            <Text style={[s.price, {fontSize: 16, fontWeight: 'bold'}]}>
              Не актуальний товар
            </Text>
          ) : (
            <View style={s.priceContainer}>
              {product?.promo_price && (
                <Text style={[s.price, s.promoPrice]}>
                  {priceFormat(Number(product?.promo_price))}
                </Text>
              )}
              <Text
                style={[s.price, product?.promo_price ? s.oldPrice : s.price]}>
                {!product?.price_mobile && priceFormat(Number(product?.price))}
                {isVisibleMobilePrice &&
                  product?.price_mobile &&
                  priceFormat(Number(product?.price_mobile))}
              </Text>
            </View>
          )}
          <View style={s.promoEndDate}>
            <Text style={{fontSize: 10, fontWeight: '500'}}>
              {translations.promoEndDate}:{' '}
              {new Date(product?.promo_end_at)?.getUTCMonth() < 9 ? 0 : ''}
              {new Date(product?.promo_end_at)?.getUTCMonth() +
                1 +
                '.' +
                new Date(product?.promo_end_at)?.getUTCDate()}
            </Text>
          </View>
          <View style={{gap: 5}}>
            <Text numberOfLines={2}>
              <Text style={{fontWeight: 'bold'}}>
                {product?.title?.match(CamelCase)}
              </Text>
              {product?.title?.replace(CamelCase, '')}
            </Text>
            <Text>Категорія: {product?.category}</Text>
            <Text>Артикул: {product?.sku}</Text>
            <Text>Баркод: {product?.barcode}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ImageViewer
        image={product?.image || ''}
        modalVisible={modalVisible}
        handleClose={handleCloseModal}
      />
    </Screen>
  );
};
export default ProductScreen;
const s = StyleSheet.create({
  card: {
    height: 205,
    gap: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    textAlign: 'left',
    width: Dimensions.get('window').width / 2.5,
    paddingTop: 5,
    borderRadius: 8,
  },
  img: {height: 120, width: '100%'},
  title: {fontSize: 12, color: gray},
  priceContainer: {
    alignItems: 'baseline',
    gap: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
  promoPrice: {
    color: red,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: '300',
    color: gray,
    textDecorationLine: 'line-through',
  },
  textBlock: {
    paddingHorizontal: 8,
    gap: 10,
  },
  promoEndDate: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginVertical: 5,
    borderColor: lightPurple,
    borderWidth: 1,
    padding: 4,
    borderCurve: 'continuous',
  },
});
