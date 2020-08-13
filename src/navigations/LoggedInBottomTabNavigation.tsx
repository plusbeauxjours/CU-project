import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {SimpleLineIcons} from '@expo/vector-icons';
import {Text, View, Image} from 'react-native';
import LoggedInBTN_HomeNavigation from './LoggedInBTN_HomeNavigation';
import LoggedInBTN_CalendarNavigation from './LoggedInBTN_CalendarNavigation';
import LoggedInBTN_ChecklistNavigation from './LoggedInBTN_ChecklistNavigation';
import LoggedInBTN_MyCuNavigation from './LoggedInBTN_MyCuNavigation';
// import LoggedInBTN_MypageNavigation from './LoggedInBTN_MypageNavigation';

const getTabBarIcon = ({navigation, focused, horizontal, tintColor}) => {
  const {routeName} = navigation.state;

  if (routeName === 'Home') {
    if (focused === true) {
      return (
        <View style={{alignItems: 'center'}}>
          <SimpleLineIcons name="home" size={23} color="#642A8C" />
          <Text style={{fontSize: 10, color: '#642A8C'}}>사업장관리</Text>
        </View>
      );
    } else {
      return <SimpleLineIcons name="home" size={25} color="#CCCCCC" />;
    }
  }

  if (routeName === 'Calendar') {
    if (focused === true) {
      return (
        <View style={{alignItems: 'center'}}>
          <SimpleLineIcons name="event" size={25} color="#642A8C" />
          <Text style={{fontSize: 10, color: '#642A8C'}}>일정관리</Text>
        </View>
      );
    } else {
      return <SimpleLineIcons name="event" size={25} color="#CCCCCC" />;
    }
  }

  if (routeName === 'Checklist') {
    if (focused === true) {
      return (
        <View style={{alignItems: 'center'}}>
          <SimpleLineIcons name="note" size={25} color="#642A8C" />
          <Text style={{fontSize: 10, color: '#642A8C'}}>체크리스트</Text>
        </View>
      );
    } else {
      return <SimpleLineIcons name="note" size={25} color="#CCCCCC" />;
    }
  }

  if (routeName === 'MyCu') {
    const imageStyle = {
      width: 43,
      height: 43,
    };

    if (!focused) {
      imageStyle.tintColor = '#DADADA';
    }

    return (
      <View
        style={{alignItems: 'center', justifyContent: 'center', paddingTop: 3}}>
        <Image
          source={require('../assets/cu_active_icon.png')}
          style={imageStyle}
          resizeMode="stretch"
        />
      </View>
    );
    // if (focused === true) {
    //   return (
    //     <View style={{ alignItems: 'center' }}>
    //       <SimpleLineIcons name="user" size={25} color="#642A8C" />
    //       <Text style={{ fontSize: 10, color: '#642A8C' }}>My CU</Text>
    //     </View>
    //   );
    // } else {
    //   return <SimpleLineIcons name="user" size={25} color="#CCCCCC" />;
    // }
  }
};

const AppNavigator = createBottomTabNavigator(
  {
    Home: {screen: LoggedInBTN_HomeNavigation},
    Calendar: {screen: LoggedInBTN_CalendarNavigation},
    Checklist: {screen: LoggedInBTN_ChecklistNavigation},
    MyCu: {screen: LoggedInBTN_MyCuNavigation},
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
    tabBarOptions: {
      showLabel: false,
      keyboardHidesTabBar: true,
    },
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) =>
        getTabBarIcon({navigation, focused, horizontal, tintColor}),
    }),
  },
);

const LoggedInMaterialBottomTabNavigation = createAppContainer(AppNavigator);

export default LoggedInMaterialBottomTabNavigation;
