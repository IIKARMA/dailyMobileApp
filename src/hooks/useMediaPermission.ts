import {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
export const useMediaPermissions = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const openSettingsAlert = useCallback(({title}: {title: string}) => {
    Alert.alert(title, '', [
      {
        isPreferred: true,
        style: 'default',
        text: 'Open Settings',
        onPress: () => Linking?.openSettings(),
      },
      {
        isPreferred: false,
        style: 'destructive',
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  }, []);
  const checkAndroidPermissions = useCallback(async () => {
    if (parseInt(Platform.Version as string, 10) >= 33) {
      const permissions = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      ]);
      if (
        permissions[PERMISSIONS.ANDROID.CAMERA] ===
          Permissions.RESULTS.GRANTED &&
        permissions[PERMISSIONS.ANDROID.RECORD_AUDIO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      ]);
      if (
        res[PERMISSIONS.ANDROID.CAMERA] ===
          Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.RECORD_AUDIO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
      }
      if (
        res[PERMISSIONS.ANDROID.CAMERA] ===
          Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.RECORD_AUDIO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions();
      }
      if (
        res[PERMISSIONS.ANDROID.CAMERA] ===
          Permissions.RESULTS.BLOCKED ||
        res[PERMISSIONS.ANDROID.RECORD_AUDIO] ===
          Permissions.RESULTS.BLOCKED
      ) {
        openSettingsAlert({
          title: 'Please allow access to your photos and videos from settings',
        });
      }
    } else {
      const permission = await Permissions.check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (permission === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (res === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    }
  }, [openSettingsAlert]);
  const checkPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.CAMERA);
      if (
        permission === Permissions.RESULTS.GRANTED ||
        permission === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.IOS.CAMERA);
      if (
        res === Permissions.RESULTS.GRANTED ||
        res === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    } else if (Platform.OS === 'android') {
      checkAndroidPermissions();
    }
  }, [checkAndroidPermissions, openSettingsAlert]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);
};
