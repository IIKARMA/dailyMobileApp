import ActiveButton from '@src/components/ActiveButton';
import OtpInput from '@src/components/OtpInput';
import Screen from '@src/components/Screen';
import useInput from '@src/hooks/useInput';
import {AuthorizationSmsProps} from '@src/navigation/stacks/authorization/type';
import {FC} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import uk from '@src/translations';
import {black, purple} from '@src/theme/colors';
import {
  useUserPhoneAuthorizationMutation,
  useUserSendOtpCodeAuthorizationMutation,
  useLazyGetUserInfoQuery,
  useUserCreateMutation,
  useUserPhoneRegistrationConfirmMutation,
} from '@src/services/userApi';
import {useToast} from 'react-native-toast-notifications';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {setUser, setUserToken} from '@src/store/slices/userSlice';
import TimerResend from '@src/components/TimerResend';
import useBoolean from '@src/hooks/useBoolean';
import {SCREENS} from '@src/navigation/enums';
import {User} from '@src/store/slices/types';
import useKeyboardPadding from '@src/hooks/useKeyboardPadding';
import useShowToast from '@src/hooks/useShowToast';
import translations from '@src/translations';

const AuthorizationSMS: FC<AuthorizationSmsProps> = ({route, navigation}) => {
  const {value: otpCode, onChangeText} = useInput('');
  const dispatch = useAppDispatch();
  const {handleToastShow} = useShowToast();
  const [sendOtpCodeAuthorization, {data}] =
    useUserSendOtpCodeAuthorizationMutation();
  const [sendOtpCodeRegistration] = useUserPhoneRegistrationConfirmMutation();
  const [createUser] = useUserCreateMutation();
  const [resendCode, {error: authorizationError}] =
    useUserPhoneAuthorizationMutation();
  const [getUserInfo] = useLazyGetUserInfoQuery();
  const {keyboardPadding} = useKeyboardPadding(5);
  console.log(route.params.isRegistration);

  const {isBool: isResendSmsCode, setTrue, setFalse} = useBoolean();
  const handleResendCode = async () => {
    onChangeText('');
    await resendCode(route.params.phone)
      .then(() => {
        handleToastShow({message: uk.codeIsSender, type: 'success'});
      })
      .catch(error => {
        error &&
          handleToastShow({
            message: error?.message || error,
            type: 'success',
          });
      });
  };
  const handleSubmit = async () => {
    if (route.params.isRegistration)
      await sendOtpCodeRegistration({
        phone: route.params.phone,
        code: +otpCode,
      
      })
        .unwrap()
        .then(res => {
          handleUserInfo();
        })
        .catch(
          error =>
            error &&
            handleToastShow({
              message: error.message,
              type: 'danger',
            }),
        );
    else
      await sendOtpCodeAuthorization({
        phone: route.params.phone,
        code: otpCode,
      })
        .unwrap()
        .then((res: any) => {
          dispatch(setUserToken(res));
          handleUserInfo();
        })
        .catch(error => {
          error &&
            handleToastShow({
              message: error.message,
              type: 'danger',
            });
          onChangeText('');
        });
  };
  const handleUserInfo = () => {
    if (route.params.isRegistration) {
      handleToastShow({
        message: translations.toastMessages.createUserInfoSuccess,
        type: 'success',
      });

      navigation.goBack();
    } else
      getUserInfo()
        .unwrap()
        .then((res: User) => {
          console.log('🚀 ~ .then ~ res:', res);
          dispatch(setUser(res));
        });
  };
  return (
    <Screen offTop="additive" isHiddenLogo={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: 20,
          gap: 10,
        }}>
        <View>
          <Text
            style={{
              paddingTop: '40%',
              fontWeight: '600',
              fontSize: 20,
              color: black,
              alignSelf: 'center',
            }}>
            Код підтвердження
          </Text>
          <OtpInput otpCode={otpCode} handleInput={onChangeText} />
        </View>
      </View>
      <View style={{paddingVertical: 5, paddingBottom: keyboardPadding}}>
        <ActiveButton
          isDisabled={otpCode.length < 4}
          label={uk.submit}
          onHanldePress={handleSubmit}
        />
        <View
          style={{
            alignSelf: 'center',
            paddingBottom: keyboardPadding,
            flexDirection: 'row',
          }}>
          <TimerResend hadleResend={handleResendCode} />
        </View>
      </View>
    </Screen>
  );
};
export default AuthorizationSMS;
const s = StyleSheet.create({});
