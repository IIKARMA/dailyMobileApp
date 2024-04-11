import {PermissionsAndroid, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const requestCameraPermission = (): Promise<boolean> => {
  return new Promise(async resolve => {
    try {
      if (Platform.OS !== 'ios') {
        const req = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (req === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          openSettings();
          resolve(false);
        } else {
          resolve(true);
        }
        resolve(false);
      } else {
        check(PERMISSIONS.IOS.CAMERA).then(response => {
          if (response === RESULTS.BLOCKED) {
            openSettings();
            resolve(false);
          } else {
            resolve(true);
          }
          resolve(false);
        });
      }
    } catch (e) {
      resolve(false);
    }
  });
};
