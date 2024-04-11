import React, {FC, useEffect, useMemo, useState} from 'react';
import {ScannerOverlay} from '../../components/ScannerOverlay';
import {checkLocation} from '@src/utils/checkLocation';

import {
  Camera,
  useCodeScanner,
  useCameraDevices,
  Code,
  useCameraDevice,
  CameraDevice,
} from 'react-native-vision-camera';
import {requestCameraPermission} from '@src/utils/requestCameraPermission';
import {
  Platform,
  StatusBar,
  Vibration,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useCallback, useRef} from 'react';
import {useLazyGetProductByBarCodeQuery} from '@src/services/productApi';
import {Product, ProductArg, ProductList} from '@src/services/types';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import GetLocation from 'react-native-get-location';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {useGetShopMapsQuery} from '@src/services/shopApi';
import useShowToast from '@src/hooks/useShowToast';
import Screen from '@src/components/Screen';
import translations from '@src/translations';
import {TimeoutId} from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import {RNCamera} from 'react-native-camera';
import {SCREENS} from '@src/navigation/enums';
import {setIsLocationInShop} from '@src/store/slices/userSlice';

const Scanner = () => {
  const openSettingsAlert = useCallback(({title}: {title: string}) => {
    Alert.alert(title, '', [
      {
        isPreferred: true,
        style: 'default',
        text: 'Відкрити налаштування',
        onPress: () => Linking?.openSettings(),
      },
      {
        isPreferred: false,
        style: 'destructive',
        text: 'Відмінити',
        onPress: () => {},
      },
    ]);
  }, []);
  const dispatch = useAppDispatch();
  const isShopLocation = useAppSelector(state => state.user.isLocationInShop);
  console.log("🚀 ~ Scanner ~ isShopLocation:", isShopLocation)
  const {handleToastShow, hadnleHideAllToast} = useShowToast();
  const navigation = useNavigation<BottomTabBarProps['navigation']>();
  const {data: shops} = useGetShopMapsQuery();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [hasPermissionMiro, setHasPermissionMicro] = useState<boolean>(false);
  const device = useCameraDevice('back');
  const [barcodes, setBarcodes] = useState<Code[]>();
  const [scanning, setScanning] = useState<boolean>(true);
  const isFocused = useIsFocused();
  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: codes => scanning && setBarcodes(codes),
  });

  const [layoutSize, setLayoutSize] = useState({
    height: 1,
    width: 1,
    x: 0,
    y: 0,
  });

  const [isScanned, setIsScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanned, setScanned] = useState(false);

  const [isAccessLocation, setIsLocation] = useState<boolean>(false);
  console.log('🚀 ~ Scanner ~ isAccessLocation:', isAccessLocation);

  const [getProductByBarcode, {error: errorProduct}] =
    useLazyGetProductByBarCodeQuery();

  const onCodeScanned = useCallback((barcodes: string) => {
    getProductByBarcode({
      barcode: String(barcodes).split(' ').join(''),
    })
      .unwrap()
      .then(res => {
        if (res.id) {
          const item = res as Product;
          navigation.navigate('Home', {
            screen: 'PRODUCT_SCREEN',
            params: {
              product: item,
              isVisibleMobilePrice: true,
            },
          });
        }
      })
      .catch(e => {
        handleToastShow({
          message: String(e?.data?.message) || '',
          type: 'danger',
        });
        setScanned(false);
      });
  }, []);
  // useEffect(() => {
  //   checkCameraPermissionReactNative();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      isFocused && setScanning(true);
    }, [isFocused]),
  );
  let t: TimeoutId;
  useEffect(() => {
    setTimeout(() => {
      if (scanning && barcodes) {
        setScanning(false);
      }
    }, 2000);
  }, [barcodes]);

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    onCodeScanned(data);
  };

  useEffect(() => {
    try {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          if (location)
            setIsLocation(
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
            );
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
        .catch(error => {
          const {code, message} = error;
          setIsLocation(false);
          console.warn(code, message);
          // Alert.alert('Не можемо визначити ваше місцеположення')
        });
      setTimeout(() => {
        (async () => {
          const checkStatusMicro = Camera.getMicrophonePermissionStatus();
          if (checkStatusMicro === 'granted') {
            setHasPermissionMicro(true);
            return;
          }
          const statusRequestMicro = await Camera.requestMicrophonePermission();
          if (statusRequestMicro === 'granted') {
            setHasPermissionMicro(true);
          }
          if (statusRequestMicro === 'denied')
            openSettingsAlert({
              title:
                'Дозвольте Щодня використовувати мікрофон, для можливості сканування штрих кодів на продуктах магазину.',
            });
        })();
      }, 500);
      setTimeout(() => {
        (async () => {
          const checkStatus = Camera.getCameraPermissionStatus();
          if (checkStatus === 'granted') {
            setHasPermission(true);
            return;
          }
          const statusRequest = await Camera.requestCameraPermission();
          if (statusRequest === 'granted') {
            setHasPermission(true);
          }
          if (statusRequest === 'denied')
            openSettingsAlert({
              title:
                'Дозвольте Щодня використовувати камеру, для можливості сканування штрих кодів на продуктах магазину.',
            });
        })();
      }, 500);
    } catch (error) {}
  }, []);
  return !isShopLocation ||
    (!isAccessLocation && !hasPermissionMiro && !hasPermissionMiro) ? (
    <Screen isHiddenLogo>
      <View
        style={{
          flex: 1,
          zIndex: 222,
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
  ) : (
    <>
      <RNCamera
        permissionDialogMessage=""
        style={{flex: 1}}
        onBarCodeRead={
          hasPermissionMiro &&
          hasPermission &&
          isFocused &&
          isShopLocation &&
          scanned
            ? undefined
            : handleBarCodeScanned
        }
        barCodeTypes={[RNCamera.Constants.BarCodeType.ean13]}></RNCamera>
      <ScannerOverlay layoutSize={layoutSize} />
    </>
  );
};

export default Scanner;

export const styles = StyleSheet.create({
  appWrapperStyle: {
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  appWrapperSafeStyle: {
    flex: 1,
    backgroundColor: '#3E52B5',
  },
  cameraWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#3E52B5',
  },
  containerText: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  textNotFound: {
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
