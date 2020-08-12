// import { Platform } from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../screens/LoggedOutScreen/StartScreen';
import LogInScreen from '../screens/LoggedOutScreen/LogInScreen';
import FindPasswordScreen from '../screens/LoggedOutScreen/FindPasswordScreen';

// import VerificationScreen from '../screens/LoggedOutScreen/VerificationScreen';
// import SignupScreen from '../screens/LoggedOutScreen/SignupScreen';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import StartScreen from '../screens/LoggedOutScreen/StartScreen';
// import LogInScreen from '../screens/LoggedOutScreen/LogInScreen';

import BackBtn from '../components/BackBtn';

// // API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
// const AppNavigator = createStackNavigator(
//   {
//     Start: {
//       screen: StartScreen,
//       navigationOptions: {
//         header: null,
//         // headerTitle: '시작',
//         //  headerShown: false,
//         //  headerTitle: '일정 추가',
//       },
//     },
//     LogIn: {
//       screen: LogInScreen,
//       navigationOptions: {
//         headerTitle: '로그인',
//         headerTintColor: '#fff',
//       },
//     },
//     Signup1: {
//       screen: SignupScreen1,
//       navigationOptions: {
//         headerTitle: '회원가입',
//         headerTintColor: '#fff',
//         //  headerShown: false,
//         //  headerTitle: '일정 추가',
//       },
//     },
//     Signup2: {
//       screen: SignupScreen,
//       navigationOptions: {
//         headerTitle: '회원가입',
//         headerTintColor: '#fff',
//         //  headerShown: false,
//         //  headerTitle: '일정 추가',
//       },
//     },
//     Find: {
//       screen: FindScreen,
//       navigationOptions: {
//         headerTitle: '비밀번호 찾기',
//         headerTintColor: '#fff',
//         //  headerShown: false,
//         //  headerTitle: '일정 추가',
//       },
//     },
//   },
//   {
//     initialRouteName: 'Start',
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

// const LoggedOutNavigation = createAppContainer(AppNavigator);

// export default LoggedOutNavigation;

const LoggedOutNavigation = createStackNavigator();
export default () => (
  <LoggedOutNavigation.Navigator
    headerMode={'screen'}
    screenOptions={{
      headerStyle: {
        backgroundColor: '#AACE36',
        borderColor: '#fff',
        borderWidth: 0,
      },
      headerBackTitleVisible: false,
      headerBackImage: () => <BackBtn />,
    }}>
    <LoggedOutNavigation.Screen
      name="StartScreen"
      component={StartScreen}
      options={{
        headerShown: false,
      }}
    />
    <LoggedOutNavigation.Screen
      name="LogInScreen"
      component={LogInScreen}
      options={{
        title: '로그인',
        headerTintColor: '#fff',
      }}
    />
    {/* <LoggedOutNavigation.Screen
      name="VerificationScreen"
      component={VerificationScreen}
      options={{
        title: '회원가입',
        headerTintColor: '#fff',
      }}
    /> */}
    <LoggedOutNavigation.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{
        title: '회원가입',
        headerTintColor: '#fff',
      }}
    />
    <LoggedOutNavigation.Screen
      name="FindPasswordScreen"
      component={FindPasswordScreen}
      options={{
        title: '비밀번호 찾기',
        headerTintColor: '#fff',
      }}
    />
  </LoggedOutNavigation.Navigator>
);
