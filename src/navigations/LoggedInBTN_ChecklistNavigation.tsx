import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// ChecklistScreen 5개
import ChecklistMainScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistMainScreen';
import ChecklistAddScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistAddScreen';
import ChecklistShareMainScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareMainScreen';
import ChecklistShareItemScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareItemScreen';
import ChecklistItemsScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistItemsScreen';
import ChecklistSpecificationScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistSpecificationScreen';
import ChecklistShareInsertScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareInsertScreen';
import ChecklistShareUpdateScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareUpdateScreen';


import EditButton from '../components/AddButton(Notice)'
import AddButton from '../components/AddButton(ChecklistSpecificationScreen)'
import ShareAddButton from '../components/AddButton(ChecklistShareMainScreen)'

// API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppNavigator = createStackNavigator(
    {
      // ↓ ChecklistScreen 4개
      ChecklistMain:{
        screen: ChecklistMainScreen,
        navigationOptions: {
          headerTitle: '체크리스트',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '200',
          },
        },
      },
      ChecklistItems:{
        screen: ChecklistItemsScreen,
        navigationOptions: {
          headerTitle: '체크리스트',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '200',
          },
        },
      },
      ChecklistAdd:{
        screen: ChecklistAddScreen,
        navigationOptions: ({ navigation }) => ({
          headerTitle: `${navigation.state.params.TITLE || '체크리스트 입력'}`,
          // headerTitle: '체크리스트 입력',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '200',
          },
        }),
      },
      ChecklistSpecification:{
        screen: ChecklistSpecificationScreen,
        navigationOptions: {
          headerTitle: '체크리스트',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '200',
          },
          headerRight: (
            <AddButton/>
          )
        },
      },
      ChecklistShareMain:{
        screen: ChecklistShareMainScreen,
        navigationOptions: ({ navigation }) => ({
          headerTitle: `${navigation.state.params.TITLE}`,
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '200',
          },
          headerRight: (
            <ShareAddButton/>
          )
        }),
      },
      
      ChecklistShareUpdateScreen:{
        screen: ChecklistShareUpdateScreen,
        navigationOptions: ({ navigation }) => ({
          headerTitle: '글수정',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '200',
          },
        }),
      },
      ChecklistShareInsertScreen:{
        screen: ChecklistShareInsertScreen,
        navigationOptions: ({ navigation }) => ({
          headerTitle: '글등록',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '200',
          },
        }),
      },
      ChecklistShareItem:{
        screen: ChecklistShareItemScreen,
        navigationOptions: ({ navigation }) => ({
          headerTitle: `${navigation.state.params.TITLE || '공지사항'}`,
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '200',
          },
          headerRight: (
            <EditButton/>
          )
        }),
      },
    },
    {
      initialRouteName: 'ChecklistMain',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#AACE36',
        },
      },
      // headerMode: 'none'
      headerLayoutPreset: 'center'
    },
  );
  
  const LoggedInBTN_ChecklistNavigation = createAppContainer(AppNavigator);
  
  export default LoggedInBTN_ChecklistNavigation;