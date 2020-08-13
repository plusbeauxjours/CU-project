import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator, TouchableOpacity} from 'react-native';

import CloseBtn from './Header/CloseBtn';
import LoggedInNavigation from '../navigations/LoggedInNavigation';
import LoggedOutNavigation from '../navigations/LoggedOutNavigation';
import HelpModalScreen from '../screens/LoggedInScreen/Home/HelpModalScreen/index';
import styled from 'styled-components/native';

export default () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state: any) => state.userReducer);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [allHelpTextView, setAllHelpTextView] = useState<boolean>(false);

  const RootStack = createStackNavigator();

  // const loadImagesAsync = async () => {
  //   await Asset.loadAsync([require('../../assets/images/shopSol.png')]);
  // };

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
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="LoggedOutNavigation"
          component={LoggedOutNavigation}
          options={{headerShown: false}}
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
      {/* {splash.visible && (
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
      )} */}
    </NavigationContainer>
  );
};
