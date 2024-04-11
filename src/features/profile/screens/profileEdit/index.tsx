import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import Label from '@src/components/Label';
import Screen from '@src/components/Screen';
import useGetRegionWithShops from '@src/hooks/useGetRegionWithShops';
import {
  useAddFeavoriteShopMutation,
  useEditUserInfoMutation,
  useGetUserInfoQuery,
  useRemoveClientMutation,
  useRemoveFavoriteShopMutation,
} from '@src/services/userApi';
import {TypeSex, User} from '@src/store/slices/types';
import {lightPurple, purple, red, white} from '@src/theme/colors';
import translations from '@src/translations';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {SelectType} from '../../types';
import MultiSelect from '@src/components/MultiSelect';
import {IRegion, IShop, IShopArg} from '@src/services/types';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import ActiveButton from '@src/components/ActiveButton';
import {ProfileStackProps} from '@src/navigation/stacks/profile/types';
import {useNavigation} from '@react-navigation/native';
import {IconCancel} from '@src/assets/icons/IconCancel';
import {IconTrash} from '@src/assets/icons/IconTrash';
import {
  useGetRegionsQuery,
  useGetShopByRegionIdQuery,
  useLazyGetShopByRegionIdQuery,
} from '@src/services/shopApi';
import Switch from '@src/components/Switch';
import useShowToast from '@src/hooks/useShowToast';
import {loggedOut} from '@src/store/slices/userSlice';
import {useAppDispatch} from '@src/store/store';
const ProfileEdit = () => {
  const {goBack, navigate} = useNavigation<ProfileStackProps['navigation']>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const userSex = [
    {id: 'female', text: 'Чоловік'},
    {id: 'male', text: 'Жінка'},
  ];
  const dispatch = useAppDispatch();
  const {data: userData} = useGetUserInfoQuery('');
  const {handleToastShow} = useShowToast();
  const [addFavoriteShop] = useAddFeavoriteShopMutation();
  const [removeFavoriteShop] = useRemoveFavoriteShopMutation();
  const [editUser] = useEditUserInfoMutation();
  const [user, setUser] = useState<User & unknown>(userData as unknown as User);
  const {data: regions} = useGetRegionsQuery();
  const [typeAction, setTypeAction] = useState<SelectType>('sex');
  const [currentRegion, setCurrentRegion] = useState<string>(
    user?.regionId || '',
  );
  const [currentData, setCurrentData] = useState<(any | IRegion | IShop)[]>();
  const {data: shopByRegion} = useGetShopByRegionIdQuery(
    user?.regionId as unknown as IShopArg,
  );
  const [selectedCurrentData, setSelectedCurrentData] = useState<
    (any | IRegion | IShop)[]
  >([]);
  const {allShops, favoriteShops, shopsByRegion} = useGetRegionWithShops(
    currentRegion,
    user?.shops,
  );
  console.log('🚀 ~ ProfileEdit ~ shopsByRegion:', shopsByRegion);
  const [shopsByRegionRefetch, {data: _shopsByRegion}] =
    useLazyGetShopByRegionIdQuery();
  console.log('🚀 ~ ProfileEdit ~ _shopsByRegion:', _shopsByRegion);

  const handleChangeUser = (value: string, typeField: string | SelectType) => {
    setUser({...user, [String(typeField)]: value});
    if (typeField === 'shops') {
      setUser({...user, [String(typeField)]: value});
      addFavoriteShop(value)
        .unwrap()
        .then(res => {
          console.log(res);
        })
        .catch(() => {
          handleToastShow({type: 'danger'});
        });
    }
    if (typeField === 'regionId') {
      setCurrentRegion(value);
    }
  };
  // // const favoriteShops = useMemo(
  // //   () =>
  // //     typeof shopsByRegion !== "undefined" &&
  // //     ([...shopsByRegion]?.filter(
  // //       (shop: IShop) =>
  // //         typeof user.shops !== "undefined" &&
  // //         [...user.shops]?.filter((favShopId) => favShopId == shop.id)[0]
  // //     ) as unknown as IShop[]),
  // //   [shopsByRegion]
  // );
  const handleChangePhone = useCallback((phone: string) => {
    console.log(phone);
  }, []);
  const [handleRemoveClient] = useRemoveClientMutation();
  const handleSelectBottomSheet = useCallback(
    (type: SelectType) => {
      setTypeAction(type);
      switch (type) {
        case 'sex':
          setCurrentData(userSex);
          setSelectedCurrentData([
            {...userSex.find(sex => sex.id === user.sex)},
          ]);
          break;
        case 'regionId':
          setSelectedCurrentData([
            {
              id: user.regionId,
              address: regions?.find(
                (_region: IRegion) => _region.id === user.regionId,
              )?.title as unknown as string,
            },
          ]);
          setCurrentData(regions);
          break;
        case 'shops':
          setSelectedCurrentData([
            ...[...shopsByRegion]
              ?.filter(
                (shop: IShop) =>
                  typeof userData?.shops !== 'undefined' &&
                  [...userData?.shops]?.filter(
                    favShopId => favShopId == shop.id,
                  )[0],
              )
              .map(item => {
                return {
                  id: item.id,
                  address: item.address,
                };
              }),
          ]);
          setCurrentData(_shopsByRegion);
        default:
          break;
      }

      bottomSheetRef.current?.collapse();
    },
    [_shopsByRegion],
  );
  const hancleSubmit = useCallback(() => {
    editUser({
      nameFirst: user.nameFirst,
      region: user.regionId,
      sex: user.sex as TypeSex,
    })
      .unwrap()
      .then(() => {
        handleToastShow({
          message: translations.toastMessages.editUserInfoSuccess,
          type: 'success',
        });
      })
      .finally(() => {
        goBack();
      });
  }, [user]);
  const handleRemoveShop = useCallback((shopId: string) => {
    removeFavoriteShop(shopId).unwrap();
  }, []);

  const userFormField = [
    {
      label: translations.profile.name,
      typeField: 'nameFirst',
      value: user?.nameFirst,
      handler: (text: string) => {
        handleChangeUser(text, 'nameFirst');
      },
    },
    {
      label: translations.profile.phone,
      typeField: 'phone',
      value: user?.phone,
      handler: () => {
        navigate('PROFILE_CHANGE_PHONE');
      },
    },
    {
      label: translations.profile.sex,
      typeField: 'sex',
      value: user?.sex === 'female' ? 'Чоловік' : 'Жінка',
      handler: (type: string) => {
        handleSelectBottomSheet(type as SelectType);
      },
    },
    {
      label: translations.profile.region,
      typeField: 'regionId',
      value: regions?.find((_region: IRegion) => _region.id === user.regionId)
        ?.title as unknown as string,
      handler: (type: string) => {
        handleSelectBottomSheet(type as SelectType);
      },
    },
    {
      label: translations.profile.shops,
      typeField: 'shops',
      value:
        shopsByRegion &&
        ([...shopsByRegion]?.filter(
          (shop: IShop) =>
            typeof userData?.shops !== 'undefined' &&
            [...userData?.shops]?.filter(favShopId => favShopId == shop.id)[0],
        ) as unknown as IShop[]),
      handler: (type: string) => {
        handleSelectBottomSheet(type as SelectType);
      },
    },
  ];

  useEffect(() => {
    shopsByRegionRefetch({regionId: currentRegion});
  }, [currentRegion]);

  return (
    <Screen isHiddenLogo offTop="off">
      <ScrollView style={s.container}>
        <View style={{gap: 20, paddingTop: 3}}>
          {userFormField.map(field =>
            'shops'.includes(String(field.typeField)) ? (
              Array.isArray(field.value) && field.value?.length !== 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    field.handler(field.typeField);
                  }}
                  key={field.typeField}
                  style={[s.infoContainer]}>
                  <View style={[s.infoBlock]}>
                    <Label size={14} text={field.label} />
                  </View>
                  {field.value?.map((shop, index) => (
                    <View
                      key={shop.id}
                      style={{
                        borderBottomColor: purple,
                        borderBottomWidth:
                          typeof field.value !== 'boolean' &&
                          index !== field.value?.length - 1
                            ? StyleSheet.hairlineWidth
                            : 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[s.text, {paddingVertical: 5}]}>
                        {String(shop.address)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          handleRemoveShop(shop.id);
                        }}>
                        <IconTrash />
                      </TouchableOpacity>
                    </View>
                  ))}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    field.handler(field.typeField);
                  }}
                  key={field.label}
                  style={[s.infoContainer, {paddingVertical: 10}]}>
                  <View style={s.infoBlock}>
                    <Label size={14} text={field.label} />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      field.handler(field.typeField);
                    }}>
                    <Text style={s.text}>Обрати</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )
            ) : (
              <View
                key={field.label}
                style={[
                  s.infoContainer,
                  {
                    paddingVertical: ['phone', 'sex', 'regionId'].includes(
                      field.typeField,
                    )
                      ? 10
                      : 0,
                  },
                ]}>
                <View style={s.infoBlock}>
                  <Label size={14} text={field.label} />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    field.handler(field.typeField);
                  }}>
                  {['phone', 'sex', 'regionId'].includes(field.typeField) ? (
                    <Text style={s.text}>{String(field.value)}</Text>
                  ) : (
                    <TextInput
                      style={{padding: 5, paddingVertical: 7, fontSize: 16}}
                      onChangeText={field.handler}
                      value={String(field.value)}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ),
          )}
          <MultiSelect
            selectedItem={selectedCurrentData}
            handleChange={handleChangeUser}
            bottomSheetRef={bottomSheetRef}
            selectType={typeAction}
            data={currentData as unknown as (any | IShop | IRegion)[]}
          />
          <ActiveButton
            label="Зберегти"
            onHanldePress={() => {
              hancleSubmit();
            }}
          />

          <TouchableOpacity
            style={{
              padding: 8,
              alignSelf: 'center',
              borderColor: red,
              borderRadius: 12,
              borderWidth: StyleSheet.hairlineWidth,
            }}
            onPress={() => {
              Alert.alert(
                'Видалити аккаунт?',
                'Аккаунт можливо буде востоновити на протязі 30 днів',
                [
                  {
                    text: 'Видалити',
                    onPress: () => {
                      handleRemoveClient()
                        .unwrap()
                        .then(() => dispatch(loggedOut()));
                    },
                    style: 'destructive',
                  },
                  {
                    text: 'Ні',
                    onPress: () => console.log('canel'),

                    style: 'cancel',
                  },
                ],
              );
            }}>
            <Text style={{color: red, textAlign: 'center'}}>
              Видалити профіль
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};
export default ProfileEdit;
const s = StyleSheet.create({
  infoContainer: {
    borderRadius: 10,
    padding: 10,
    borderColor: lightPurple,
    justifyContent: 'space-between',
    borderWidth: 2,
    paddingVertical: 10,
  },
  infoBlock: {
    position: 'absolute',
    borderRadius: 3,
    top: -10,
    paddingHorizontal: 5,
    backgroundColor: white,
    overflow: 'hidden',
    left: 10,
  },
  container: {paddingTop: 20, gap: 20, borderRadius: 12},
  text: {
    fontSize: 16,

    paddingRight: 10,
  },
});
