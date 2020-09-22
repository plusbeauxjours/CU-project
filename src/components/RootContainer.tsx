import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import * as Sentry from '@sentry/react-native';

import CloseBtn from './Header/CloseBtn';
import LoggedInNavigation from '../navigations/LoggedInNavigation';
import LoggedOutNavigation from '../navigations/LoggedOutNavigation';
import HelpModalScreen from '../screens/LoggedInScreen/Home/HelpModalScreen/index';

export default () => {
  const {visible} = useSelector((state: any) => state.splashReducer);
  const {isLoggedIn} = useSelector((state: any) => state.userReducer);
  const RootStack = createStackNavigator();

  // Sentry.init({
  //   dsn:
  //     'https://5c8f1a5981bf43e19397aac65b8588f7@o450648.ingest.sentry.io/5436659',
  //   enableAutoSessionTracking: true,
  //   sessionTrackingIntervalMillis: 10000,
  // });

  return (
    <NavigationContainer>
      <RootStack.Navigator
        mode="modal"
        initialRouteName={
          isLoggedIn ? 'LoggedInNavigation' : 'LoggedOutNavigation'
        }>
        <RootStack.Screen
          name="LoggedInNavigation"
          component={LoggedInNavigation}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <RootStack.Screen
          name="LoggedOutNavigation"
          component={LoggedOutNavigation}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <RootStack.Screen
          name="HelpModalScreen"
          component={HelpModalScreen}
          options={{
            title: '도움말 전체보기',
            headerRight: () => <CloseBtn />,
            headerStyle: {
              backgroundColor: '#AACE36',
              borderColor: '#fff',
              borderWidth: 0,
            },
            headerTintColor: '#fff',
            headerLeft: null,
          }}
        />
      </RootStack.Navigator>
      {visible && (
        <ActivityIndicator
          color="#A0D9E2"
          size="large"
          style={{
            flex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          }}
        />
      )}
    </NavigationContainer>
  );
};
