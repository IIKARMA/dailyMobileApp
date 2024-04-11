import {Product} from '@src/services/types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import FastImage from 'react-native-fast-image';
import Badge from '@src/components/Badge';
import {PrtoductTypes} from '@src/features/home/components/ProductsByType';
import {gray, red} from '@src/theme/colors';
import {priceFormat} from '@src/utils/priceFormat';
import {CamelCase} from '@src/consts/regEx';
import {differencePercent} from '@src/utils/differencePercent';
import DifferencePercent from '@src/components/DifferencePercent';
import {useNavigation} from '@react-navigation/native';
import {
  HomeStackParamList,
  HomeStackProps,
} from '@src/navigation/stacks/home/type';
import {ShadowedView} from 'react-native-fast-shadow';

const ProductCard = (product: Product) => {
  const navigation = useNavigation<HomeStackProps['navigation']>();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('PRODUCT_SCREEN', {product: product});
      }}>
      <ShadowedView
        style={{
          backgroundColor: 'white',
          shadowOpacity: 0.2,
          shadowRadius: 7,
          elevation: 2,
          borderRadius: 8,
          shadowOffset: {
            width: 0,
            height: 5,
          },
        }}>
        <View style={s.card}>
          {/* <Badge type={product.promo_price_type as PrtoductTypes} /> */}
          <FastImage
            defaultSource={require('@src/assets/images/no_image.png')}
            style={s.img}
            source={{uri: product?.image}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={[{bottom: product?.promo_price ? 5 : 0}, s.textBlock]}>
            <Text numberOfLines={2} style={s.title}>
              <Text style={{fontWeight: 'bold'}}>
                {product.title?.match(CamelCase)}
              </Text>
              {product.title?.replace(CamelCase, '')}
            </Text>
            <View>
              {product?.promo_price && (
                <Text style={[s.price, s.promoPrice]}>
                  {priceFormat(Number(product?.promo_price))?.slice(
                    0,
                    priceFormat(Number(product?.promo_price))?.indexOf('.'),
                  )}
                  <Text style={{fontSize: 10}}>
                    {priceFormat(Number(product?.promo_price))?.slice(
                      priceFormat(Number(product?.promo_price))?.indexOf('.'),
                    )}
                  </Text>
                </Text>
              )}
              <Text
                style={
                  (s.price, [product?.promo_price ? s.oldPrice : s.price])
                }>
                {priceFormat(Number(product?.price))?.slice(
                  0,
                  priceFormat(Number(product?.price))?.indexOf('.'),
                )}
                <Text style={{fontSize: 10}}>
                  {priceFormat(Number(product?.price))?.slice(
                    priceFormat(Number(product?.price))?.indexOf('.'),
                  )}
                </Text>
              </Text>
            </View>
          </View>
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
        </View>
      </ShadowedView>
    </TouchableOpacity>
  );
};
export default ProductCard;
const s = StyleSheet.create({
  card: {
    height: 210,
    gap: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    textAlign: 'left',
    width: Dimensions.get('window').width / 2.5,
    borderRadius: 8,
  },
  img: {height: 120, width: '100%'},
  title: {fontSize: 12, color: gray},
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  promoPrice: {
    color: red,
  },
  oldPrice: {
    fontSize: 11,
    fontWeight: '400',
    textDecorationLine: 'line-through',
  },
  textBlock: {
    paddingHorizontal: 8,
    gap: 10,
  },
});
