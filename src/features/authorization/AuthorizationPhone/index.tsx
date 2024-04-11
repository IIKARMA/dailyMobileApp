import Screen from '@src/components/Screen';
import {FC, useCallback, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import uk from '@src/translations';
import TextField from '@src/components/TextField';
import useInput from '@src/hooks/useInput';
import {
  black,
  blue,
  lightBlue,
  lightPurple,
  mediumPurple,
  purple,
  white,
} from '@src/theme/colors';

import ActiveButton from '@src/components/ActiveButton';
import PurplePutton from '@src/components/PurpleButton';
import useBoolean from '@src/hooks/useBoolean';
import CheckBox from '@react-native-community/checkbox';
import {
  useUserPhoneRegistrationMutation,
  useUserPhoneAuthorizationMutation,
  useUserCreateMutation,
} from '@src/services/userApi';
import {AuthorizationPhoneProps} from '@src/navigation/stacks/authorization/type';
import {SCREENS} from '@src/navigation/enums';
import useShowToast from '@src/hooks/useShowToast';
import {ResposeError} from '@src/services/types';

const AuthorizationPhone: FC<AuthorizationPhoneProps> = ({navigation}) => {
  const {value: phoneNumber, onChangeText} = useInput('');
  const {isBool: isNotNewUser, onToggle} = useBoolean();
  const {isBool: isAgree, onToggle: onToggleAgree} = useBoolean();
  const {handleToastShow} = useShowToast();
  const [sendPhoneRegistration, {error: registrationError}] =
    useUserPhoneRegistrationMutation();
  const [sendPhoneAuthorization, {error: authorizationError}] =
    useUserPhoneAuthorizationMutation();
  console.log(registrationError, authorizationError);

  const handleSubmitRegistration = useCallback(() => {
    sendPhoneRegistration(phoneNumber)
      .unwrap()
      .then(() => {
        navigation.navigate(SCREENS.AUTHORIZATION_SMS, {
          phone: phoneNumber,
          isRegistration: true,
        });
      })
      .catch((error: ResposeError) => {
        console.log(error);
        error && handleToastShow({message: String(error), type: 'danger'});
      });
  }, [phoneNumber]);
  const handleSubmitAuthorization = useCallback(() => {
    sendPhoneAuthorization(phoneNumber)
      .then(res => {
        navigation.navigate(SCREENS.AUTHORIZATION_SMS, {
          phone: phoneNumber,
          isRegistration: false,
        });
      })
      .catch((error: ResposeError) => {
        error && handleToastShow({message: String(error), type: 'danger'});
      });
  }, [phoneNumber]);

  return (
    <Screen offTop="additive" style={{gap: 10}}>
      <View style={{flex: 1, paddingTop: 20, gap: 10}}>
        <Text style={s.title}>
          {!isNotNewUser ? uk.inputPhoneAuth : uk.inputPhoneReg}
        </Text>
        <TextField
          label={uk.phone}
          placeholder="+38 (000) 000 00 00"
          value={phoneNumber || ''}
          onChangeText={onChangeText}
          keyboardType="numeric"
          isPhone={true}
        />
      </View>
      <View>
        <TouchableOpacity
          hitSlop={10}
          onPress={Platform.OS === 'android' ? onToggleAgree : () => {}}
          style={[
            s.row,
            {
              alignSelf: 'flex-start',
              paddingBottom: 30,
              justifyContent: 'space-evenly',
            },
          ]}>
          <CheckBox
            onChange={onToggleAgree}
            value={isAgree}
            lineWidth={2}
            onCheckColor={white}
            onFillColor={mediumPurple}
            onTintColor="#fefef0e"
            onAnimationType="stroke"
            offAnimationType="stroke"
            animationDuration={0.2}
            boxType="square"
            style={{borderRadius: 12, opacity: isAgree ? 1 : 0.4}}
          />
          <Text style={{fontSize: 14}}> {uk.agree}</Text>
          <PurplePutton onHanldePress={() => {}} label={uk.policy} />
        </TouchableOpacity>
        <ActiveButton
          isDisabled={!isAgree || phoneNumber.length < 10}
          label={!isNotNewUser ? uk.auth : uk.reg}
          onHanldePress={() =>
            !isNotNewUser
              ? handleSubmitAuthorization()
              : handleSubmitRegistration()
          }
        />
        <View style={s.row}>
          <Text>{!isNotNewUser ? uk.newUser : uk.oldUser}</Text>
          <PurplePutton
            label={!isNotNewUser ? uk.reg : uk.auth}
            onHanldePress={onToggle}
          />
        </View>
      </View>
    </Screen>
  );
};
export default AuthorizationPhone;
const s = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: black,
  },
  row: {
    flexWrap: 'wrap',
    paddingVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
