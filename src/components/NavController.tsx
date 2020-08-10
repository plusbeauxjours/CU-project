import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoggedInNavigation from '../../src/navigations/LoggedInNavigation';
import LoggedOutNavigation from '../../src/navigations/LoggedOutNavigation';
import {useSelector} from 'react-redux';

export default () => {
  const {isLoggedIn} = useSelector((state: any) => state.usersReducer);
  const RootStack = createStackNavigator();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        headerMode="none"
        initialRouteName={
          isLoggedIn ? 'LoggedInNavigation' : 'LoggedOutNavigation'
        }>
        <RootStack.Screen
          name="LoggedInNavigation"
          component={LoggedInNavigation}
        />
        <RootStack.Screen
          name="LoggedOutNavigation"
          component={LoggedOutNavigation}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
