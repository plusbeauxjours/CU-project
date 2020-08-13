import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// CalendarScreen 3개
import CalendarAddScreen from '../screens/LoggedInScreen/CalendarScreen/CalendarAddScreen';
import CalendarInfoScreen from '../screens/LoggedInScreen/CalendarScreen/CalendarInfoScreen';
import CalendarMainScreen from '../screens/LoggedInScreen/CalendarScreen/CalendarMainScreen';
import workTimeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkTimeScreen';
import RealWorkTimeScreen from '../screens/LoggedInScreen/CalendarScreen/RealWorkTimeScreen';
import WorkDayScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayScreen';
import WorkDayRestTypeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayRestTypeScreen';
import WorkDayRestTimeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayRestTimeScreen';

import AddButton from '../components/AddButton(CalendarInfo)';

// API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppNavigator = createStackNavigator(
  {
    // ↓ CalendarScreen 3개
    CalendarMain: {
      screen: CalendarMainScreen,
      navigationOptions: {
        headerTitle: '일정관리',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    CalendarInfo: {
      screen: CalendarInfoScreen,
      navigationOptions: {
        headerTitle: '일정관리',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
        headerRight: <AddButton />,
      },
    },
    CalendarAdd: {
      screen: CalendarAddScreen,
      navigationOptions: {
        headerTitle: '일정 추가',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    RealWorkTime: {
      screen: RealWorkTimeScreen,
      navigationOptions: {
        headerTitle: '출퇴근시간 수정하기',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    WorkTime: {
      screen: workTimeScreen,
      navigationOptions: {
        headerTitle: '근무시간 수정하기',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    WorkDay: {
      screen: WorkDayScreen,
      navigationOptions: {
        headerTitle: '휴무/휴게시간 설정',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    WorkDayRestType: {
      screen: WorkDayRestTypeScreen,
      navigationOptions: {
        headerTitle: '휴무 설정',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    WorkDayRestTime: {
      screen: WorkDayRestTimeScreen,
      navigationOptions: {
        headerTitle: '시간 설정',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
  },
  {
    initialRouteName: 'CalendarMain',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#AACE36',
      },
    },
    // headerMode: 'none'
    headerLayoutPreset: 'center',
  },
);

const LoggedInBTN_CalendarNavigation = createAppContainer(AppNavigator);

export default LoggedInBTN_CalendarNavigation;
