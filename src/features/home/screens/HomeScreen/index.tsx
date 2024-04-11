import Screen from '@src/components/Screen';
import {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
} from '@src/services/userApi';
import HomeHeader from '../../components/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions, ScrollView, View} from 'react-native';
import {useCallback, useEffect} from 'react';
import BarCode from '@src/components/BarCode';
import {TokenState, User} from '@src/store/slices/types';
import ProductsByType from '../../components/ProductsByType';

import {useFocusEffect} from '@react-navigation/native';
import FaqList from '../../components/FaqList';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {
  setIsLocationInShop,
  setUser,
  userRefreshToken,
} from '@src/store/slices/userSlice';
import ArticleSlider from '../../components/ArticleSlider';
import {useGetShopMapsQuery} from '@src/services/shopApi';
import GetLocation from 'react-native-get-location';
import {checkLocation} from '@src/utils/checkLocation';
import {IShopsMap} from '@src/services/types';
const HomeScreen = () => {
  const {data, refetch} = useGetUserInfoQuery('');
  const {data: shops} = useGetShopMapsQuery();
  const refresh_token = useAppSelector(
    state => state.user.tokens,
  ) as TokenState;
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      if (data) dispatch(setUser(data));
    } catch (error) {}
  }, []);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const checkLocationInShop = async (shops: IShopsMap[]) => {
    try {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          location &&
            dispatch(
              setIsLocationInShop(
                Boolean(
                  shops
                    ?.map(
                      shop =>
                        checkLocation(
                          location.longitude,
                          location.latitude,
                          shop?.latitude,
                          shop?.longitude,
                        ) <= 0.1,
                    )
                    .filter(i => i).length,
                ),
              ),
            );
        })
        .catch(() => {
          dispatch(setIsLocationInShop(false));
        });
    } catch (error) {}
  };
  useEffect(() => {
    checkLocationInShop(shops as IShopsMap[]);
  }, []);

  return (
    <Screen offTop="off">
      <LinearGradient
        style={{
          height: 160,
          zIndex: 2,
          position: 'absolute',
          width: Dimensions.get('screen').width,
          alignSelf: 'center',
          alignItems: 'flex-end',
          borderBottomRightRadius: 45,
          borderBottomLeftRadius: 45,
        }}
        end={{x: 0.5, y: 1}}
        colors={['#3E52B5', '#6A7FE7']}
      />
      <HomeHeader />
      <BarCode />
      <View style={{paddingTop: 20, flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          pinchGestureEnabled
          contentContainerStyle={{}}>
          <View style={{paddingTop: 120, marginBottom: 120}}>
            <ArticleSlider />
            <ProductsByType />
            <FaqList />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};
export default HomeScreen;
