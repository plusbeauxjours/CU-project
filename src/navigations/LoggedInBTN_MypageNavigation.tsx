import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UpdateStoreScreen from '../screens/LoggedInScreen/HomeTabScreen/UpdateStoreScreen';
import { FontAwesome } from '@expo/vector-icons';

// ↓ MyPageScreen 5개
import MyPageAlarmSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageAlarmSetScreen';
import MyPageAppointmentScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageAppointmentScreen';
import MyPageMainScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageMainScreen';
import MyPagePlaceSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPagePlaceSetScreen';

// ↓ MyPageIdSetScreen 5개
import MyPageIdSetMainScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageIdSetMainScreen';
import MyPageDeleteSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageDeleteSetScreen';
import MyPageNameSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageNameSetScreen';
import MyPagePasswordSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPagePasswordSetScreen';
import MyPagePositionSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPagePositionSetScreen';


// API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppNavigator = createStackNavigator(
  {
    // ↓ EmployeeScheduleScreen 3개
    MyPageMain: {
      screen: MyPageMainScreen,
      navigationOptions: {
        headerTitle: '마이페이지',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyPageAlarmSet: {
      screen: MyPageAlarmSetScreen,
      navigationOptions: {
        headerTitle: '알림설정',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyPageAppointment: {
      screen: MyPageAppointmentScreen,
      navigationOptions: {
        headerTitle: '약관보기',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyPagePlaceSet: {
      screen: MyPagePlaceSetScreen,
      navigationOptions: {
        headerTitle: '사업장관리이력',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    UpdateStore1: {
      screen: UpdateStoreScreen,
      navigationOptions: {
        headerTitle: '사업장 정보',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyPageIdSetMain: {
      screen: MyPageIdSetMainScreen,
      navigationOptions: {
        headerTitle: '마이페이지',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyPageDeleteSet: {
      screen: MyPageDeleteSetScreen,
      navigationOptions: {
        headerTitle: '회원탈퇴',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyPageNameSet: {
      screen: MyPageNameSetScreen,
      navigationOptions: {
        headerTitle: '이름 변경',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyPagePasswordSet: {
      screen: MyPagePasswordSetScreen,
      navigationOptions: {
        headerTitle: '비밀번호 재설정',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
       
    MyPagePositionSet: {
      screen: MyPagePositionSetScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: '200', color: 'white', fontSize: 16 }}>점주</Text>
            <FontAwesome name="arrows-h" size={16} color="white" style={{ fontWeight: '200', marginHorizontal: 5 }} />
            <Text style={{ fontWeight: '200', color: 'white', fontSize: 16 }}>직원</Text>
          </View>
        ),
        // headerTitle: `${navigation.state.params.TITLE}`,
        // headerTitle: '점주 <-> 직원',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      }),
    },
  },
  {
    initialRouteName: 'MyPageMain',
    defaultNavigationOptions: {
      headerStyle: {
        //  backgroundColor: 'rgb(88, 135, 249)',
        backgroundColor: '#AACE36',
      },
    },
    tabBarOptions: {
      keyboardHidesTabBar: false,
    },
    // headerMode: 'none'
    headerLayoutPreset: 'center',
  },
);

const LoggedInBTN_MypageNavigation = createAppContainer(AppNavigator);

export default LoggedInBTN_MypageNavigation;
