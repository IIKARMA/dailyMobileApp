import {
  DefaultTheme,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import {RootStackParamList} from '@src/navigation/RootStack/types';
import {AuthorisationStack} from '@src/navigation/stacks/authorization';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {TokenState, User} from '@src/store/slices/types';
import {PortalProvider} from '@gorhom/portal';
import {useCallback, useEffect} from 'react';
import {setUser, setUserToken} from '@src/store/slices/userSlice';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTab} from '../tab';
const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
const RootStack = () => {
  const user = useAppSelector(state => state.user.user as User);
  // const user = useAppSelector((state) => state.user.user);
  // const { data, error } = useGetUserInfoQuery(null);
  return (
    <PortalProvider>
      <NavigationContainer theme={DefaultTheme} independent>
        {!user?.id ? <AuthorisationStack /> : <HomeTab />}
      </NavigationContainer>
    </PortalProvider>
  );
};
export default RootStack;
