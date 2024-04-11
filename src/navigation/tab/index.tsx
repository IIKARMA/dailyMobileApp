import {SCREENS} from '@src/navigation/enums';
import HomeScreen from '@src/features/home/screens/HomeScreen';
import {BottomTabProps, ScreenName, PositionTabButtom} from './types';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import React, {useCallback, useEffect} from 'react';
import {Linking, TouchableOpacity, Text, View} from 'react-native';
import {styles} from './styles';
import {
  IconTabHome,
  IconTabProfile,
  IconTabLocation,
  IconTabScanner,
  IconTabChat,
} from '@src/assets/icons/TabIcons';
import translations from '@src/translations';
import LinearGradient from 'react-native-linear-gradient';
import Shops from '@src/features/shops';
import Profile from '@src/features/profile/screens/profileMenu';
import ProfileStack from '../stacks/profile';
import {
  CommonActions,
  StackActions,
  TabActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import SupportScreen from '@src/features/support/screens/supportScreen';
import HomeStack from '../stacks/home';
import {useGetFaqQuery} from '@src/services/faqApi';
import {useLazyGetUserInfoQuery} from '@src/services/userApi';
import Scanner from '@src/features/scaner';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {TokenState} from '@src/store/slices/types';
import {setUserToken} from '@src/store/slices/userSlice';

const Icons = {
  [String(SCREENS.HOME)]: {
    icon: <IconTabHome />,
    title: translations.tabButtons.home,
  },
  [String(SCREENS.PROFILE_STACK)]: {
    icon: <IconTabProfile />,
    title: translations.tabButtons.profile,
  },
  [String(SCREENS.SHOPS)]: {
    icon: <IconTabLocation />,
    title: translations.tabButtons.shop,
  },
  [String(SCREENS.SUPPORT)]: {
    icon: <IconTabChat />,
    title: translations.tabButtons.help,
  },
};
 export const HomeTab = () => {
  const navigation = useNavigation<BottomTabProps['navigation']>();
const dispatch = useAppDispatch();
  const tokens = useAppSelector(state => state.user.tokens) as TokenState;
 
  const renderTabBar = useCallback((routeName: ScreenName | any) => {
    return (
      <TouchableOpacity
        style={{
          flex: 0,
          zIndex: 333,
          paddingBottom: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={event => {
          try {
            if (event && event.nativeEvent && event.nativeEvent.target) {
              navigation.dispatch(() => {
                const resetAction = CommonActions?.reset({
                  index: 0,
                  routes: [{name: routeName}],
                });

                return navigation.dispatch(resetAction);
              });
            }
          } catch (error) {}
        }}>
        {Icons[routeName]?.icon}
        <Text>{Icons[routeName]?.title}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <CurvedBottomBar.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
        },
      }}
      defaultScreenOptions={navigation}
      style={styles.bottomBar}
      height={75}
      circleWidth={60}
      bgColor="#fefefe"
      shadowStyle={{
        shadowColor: 'black',
        elevation: 2,
        shadowOpacity: 1,
        shadowRadius: 12,
        shadowOffset: {height: 70, width: 30},
      }}
      initialRouteName={SCREENS.HOME}
      borderTopLeftRight
      renderCircle={() => (
        <LinearGradient
          end={{x: 0.5, y: 1}}
          colors={['#3E52B5', '#6A7FE7']}
          style={styles.btnCircle}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
            onPress={event => {
              try {
                if (event && event.nativeEvent && event.nativeEvent.target) {
                  navigation.dispatch(() => {
                    const resetAction = TabActions.jumpTo(SCREENS.SCANNER);

                    return navigation.dispatch(resetAction);
                  });
                }
              } catch (error) {}
            }}>
            <IconTabScanner />
          </TouchableOpacity>
        </LinearGradient>
      )}
      tabBar={props => renderTabBar(props.routeName as ScreenName | any)}>
      <CurvedBottomBar.Screen
        options={{headerShown: false}}
        name={SCREENS.HOME}
        position={PositionTabButtom.LEFT}
        component={() => <HomeStack />}
      />
      <CurvedBottomBar.Screen
        options={{headerShown: false}}
        name={SCREENS.SCANNER}
        position={PositionTabButtom.CENTER}
        component={() => <Scanner />}
      />
      <CurvedBottomBar.Screen
        options={{headerShown: false}}
        name={SCREENS.SHOPS}
        position={PositionTabButtom.LEFT}
        component={() => <Shops />}
      />
      <CurvedBottomBar.Screen
        options={{headerShown: true}}
        name={SCREENS.SUPPORT}
        position={PositionTabButtom.RIGHT}
        component={() => <SupportScreen />}
      />
      <CurvedBottomBar.Screen
        options={{headerShown: false}}
        name={SCREENS.PROFILE_STACK}
        component={() => <ProfileStack />}
        position={PositionTabButtom.RIGHT}
      />
    </CurvedBottomBar.Navigator>
  );
};
