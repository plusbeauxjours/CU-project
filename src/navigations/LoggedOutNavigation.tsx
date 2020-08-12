import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../screens/LoggedOutScreen/StartScreen';
import LogInScreen from '../screens/LoggedOutScreen/LogInScreen';
import SignupScreen from '../screens/LoggedOutScreen/SignupScreen';
import FindPasswordScreen from '../screens/LoggedOutScreen/FindPasswordScreen';
import VerificationScreen from '../screens/LoggedOutScreen/VerificationScreen';
import BackBtn from '../components/BackBtn';

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
    <LoggedOutNavigation.Screen
      name="VerificationScreen"
      component={VerificationScreen}
      options={{
        title: '회원가입',
        headerTintColor: '#fff',
      }}
    />
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
