import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useGetShopMapsQuery, useGetShopsQuery} from '@src/services/shopApi';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {buttonBlue} from '@src/theme/colors';
import FastImage from 'react-native-fast-image';
import ActiveButton from '@src/components/ActiveButton';
import {Linking} from 'react-native';
import GetLocation from 'react-native-get-location/dist';
import {PERMISSIONS, request} from 'react-native-permissions';
import Screen from '@src/components/Screen';
import translations from '@src/translations';
import {useAppSelector} from '@src/store/store';
interface Location {
  longitude: number;
  latitude: number;
}
const Shops = () => {
  const isShopLocation = useAppSelector(state => state.user.isLocationInShop);

  const {data, refetch} = useGetShopMapsQuery();
  const [permissionLocation, setPermissionLocation] = useState<boolean>(
    isShopLocation || false,
  );
  const [location, setLocation] = useState<Location>({
    latitude: 49.03459,
    longitude: 27.231744,
  });
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );
  const getLocattion = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLocation({
          longitude: location.longitude,
          latitude: location.latitude,
        });
      })
      .catch(() => {});
  };
  useFocusEffect(
    useCallback(() => {
      request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      )
        .then(accuracy => {
          setPermissionLocation(true);
          getLocattion();
        })
        .catch(() => console.warn('Cannot request location accuracy'));
    }, []),
  );
  const openRouteToMap = (
    longitude: number,
    latitude: number,
    title: string = '',
  ) => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = title;
    const url: string = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    }) as unknown as string;

    Linking.openURL(url);
  };
  const _renderMarker = useCallback(
    () =>
      data?.map(shop => (
        <Marker
          pinColor={buttonBlue}
          key={shop.id}
          coordinate={{
            latitude: Number(shop.longitude),
            longitude: Number(shop.latitude),
          }}
          title={shop.title}
          description={shop.address}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={{height: 38, width: 28}}
            source={require('@src/assets/images/marker.png')}
          />
          <Callout
            onPress={() => {
              openRouteToMap(Number(shop.latitude), Number(shop.longitude), '');
            }}
            tooltip={true}
            key={shop.id}>
            <View style={styles.calloutContainer}>
              <View style={styles.calloutItem}>
                <Text style={styles.calloutText}>{shop.address}</Text>
              </View>

              <View>
                <ActiveButton
                  label="Прокласти маршрут"
                  onHanldePress={() => ({})}
                />
              </View>
            </View>
            <View style={styles.calloutRomb}>
              <Text />
            </View>
          </Callout>
        </Marker>
      )),
    [data],
  );

  return permissionLocation ? (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        {_renderMarker()}
      </MapView>
    </View>
  ) : (
    <Screen isHiddenLogo>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Text style={{textAlign: 'center'}}>
          {translations.offGeooPermision}
          {'\n'}
          {translations.locationNoShop}
        </Text>
      </View>
    </Screen>
  );
};
export default Shops;
export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  calloutContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10,

    minWidth: 240,
    minHeight: 50,
    width: '100%',
    // flex: 1,
    zIndex: Platform.OS === 'android' ? undefined : 5,
  },
  calloutItem: {
    paddingBottom: 8,
    maxWidth: Dimensions.get('window').width - 80,
  },
  calloutText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    // fontFamily: 'Montserrat',
  },
  calloutRomb: {
    backgroundColor: '#fff',
    position: 'absolute',
    height: 20,
    width: 20,
    left: '50%',
    borderRadius: 2,
    transform: [{translateX: -10}, {rotate: '45deg'}],
    bottom: 6, // -4

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: 'hidden',
  },
});
