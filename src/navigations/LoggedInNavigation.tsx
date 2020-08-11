// import {Platform} from 'react-native';
// import React from 'react';
// import {createAppContainer} from 'react-navigation';
// import {Text, View, Image} from 'react-native';
// import {FontAwesome} from '@expo/vector-icons';
// import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SelectStore from '../screens/LoggedInScreen/SelectStore';

// import SelectStoreScreen from '../screens/LoggedInMainScreen/SelectStoreScreen';
// import AddStoreScreen from '../screens/LoggedInScreen/HomeTabScreen/AddStoreScreen';
// import LogOutBtn from '../components/LogOutBtn';
// import SettingBtn from '../components/SettingBtn';
// import SearchAddressScreen from '../screens/LoggedInScreen/HomeTabScreen/SearchAddressScreen';

// // 마이페이지
// import MyPageAlarmSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageAlarmSetScreen';
// import MyPageAppointmentScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageAppointmentScreen';
// import MyPageMainScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageMainScreen';
// import MyPagePlaceSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPagePlaceSetScreen';

// import MyPageIdSetMainScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageIdSetMainScreen';
// import MyPageDeleteSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageDeleteSetScreen';
// import MyPageNameSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageNameSetScreen';
// import MyPagePasswordSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPagePasswordSetScreen';
// import MyPagePositionSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPagePositionSetScreen';
// import ElectronicContractsScreen2 from '../screens/LoggedInScreen/HomeTabScreen/ElectronicContractsScreen2';

// // API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
// const AppNavigator = createStackNavigator(
//   {
//     SelectStore: {
//       screen: SelectStoreScreen,
//       navigationOptions: {
//         headerTitle: '점포선택',
//         headerTintColor: '#fff',
//         headerLeft: <SettingBtn />,
//         headerRight: <LogOutBtn />,
//       },
//     },
//     AddStore: {
//       screen: AddStoreScreen,
//       navigationOptions: {
//         headerTitle: '점포 등록',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     SearchAddress: {
//       screen: SearchAddressScreen,
//       navigationOptions: {
//         headerTitle: '점포 검색',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     // 마이페이지 ==================================,
//     MyPageMain: {
//       screen: MyPageMainScreen,
//       navigationOptions: {
//         headerTitle: '마이페이지',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     MyPageAlarmSet: {
//       screen: MyPageAlarmSetScreen,
//       navigationOptions: {
//         headerTitle: '알림설정',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     MyPageAppointment: {
//       screen: MyPageAppointmentScreen,
//       navigationOptions: {
//         headerTitle: '약관보기',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     MyPagePlaceSet: {
//       screen: MyPagePlaceSetScreen,
//       navigationOptions: {
//         headerTitle: '점포관리이력',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     MyPageIdSetMain: {
//       screen: MyPageIdSetMainScreen,
//       navigationOptions: {
//         headerTitle: '마이페이지',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     MyPageDeleteSet: {
//       screen: MyPageDeleteSetScreen,
//       navigationOptions: {
//         headerTitle: '회원탈퇴',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     MyPageNameSet: {
//       screen: MyPageNameSetScreen,
//       navigationOptions: {
//         headerTitle: '이름 변경',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     MyPagePasswordSet: {
//       screen: MyPagePasswordSetScreen,
//       navigationOptions: {
//         headerTitle: '비밀번호 재설정',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     ElectronicContracts2: {
//       screen: ElectronicContractsScreen2,
//       navigationOptions: {
//         headerTitle: '전자근로계약서 체결',
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       },
//     },
//     MyPagePositionSet: {
//       screen: MyPagePositionSetScreen,
//       navigationOptions: ({navigation}) => ({
//         headerTitle: (
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Text style={{fontWeight: '200', color: 'white', fontSize: 16}}>
//               점주
//             </Text>
//             <FontAwesome
//               name="arrows-h"
//               size={16}
//               color="white"
//               style={{fontWeight: '200', marginHorizontal: 5}}
//             />
//             <Text style={{fontWeight: '200', color: 'white', fontSize: 16}}>
//               직원
//             </Text>
//           </View>
//         ),
//         // headerTitle: `${navigation.state.params.TITLE}`,
//         // headerTitle: '점주 <-> 직원',
//         headerTintColor: 'white',
//         headerTitleStyle: {
//           fontWeight: '200',
//         },
//       }),
//     },
//   },
//   {
//     initialRouteName: 'SelectStore',
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#AACE36',
//         borderColor: 'rgb(255, 255, 255)',
//         borderWidth: 0,
//       },
//     },
//     headerLayoutPreset: 'center',
//     headerMode: 'screen',
//   },
// );

// const LoggedInNavigation = createAppContainer(AppNavigator);

// export default LoggedInNavigation;

const LoggedInNavigation = createStackNavigator();
export default () => (
  <LoggedInNavigation.Navigator>
    <LoggedInNavigation.Screen
      name="SelectStore"
      component={SelectStore}
      options={{
        title: '점포선택',
        headerTintColor: '#fff',
        // headerLeft: <SettingBtn />,
        // headerRight: <LogOutBtn />,
      }}
    />
  </LoggedInNavigation.Navigator>
);
