import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesome} from '@expo/vector-icons';

import MyCuMainScreen from '../screens/LoggedInScreen/MyCuScreen/MyCuMainScreen';
import MyCuMonthlyListScreen from '../screens/LoggedInScreen/MyCuScreen/MyCuMonthlyListScreen';
import MyCuMonthlyDetailScreen from '../screens/LoggedInScreen/MyCuScreen/MyCuMonthlyDetailScreen';
import MyCuVideoListScreen from '../screens/LoggedInScreen/MyCuScreen/MyCuVideoListScreen';
import MyCuVideoDetailScreen from '../screens/LoggedInScreen/MyCuScreen/MyCuVideoDetailScreen';
import ElectronicContractsScreen2 from '../screens/LoggedInScreen/HomeTabScreen/ElectronicContractsScreen2';

import UpdateStoreScreen from '../screens/LoggedInScreen/HomeTabScreen/UpdateStoreScreen';

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

// ↓ 보건증 조기경보시스템 5개 (임시)
import HealthCertificateStoreListScreen from '../screens/LoggedInScreen/HealthCertificate/StoreListScreen';
import HealthCertificateTypeScreen from '../screens/LoggedInScreen/HealthCertificate/CertificateTypeScreen';
import HealthCertificateEmpListScreen from '../screens/LoggedInScreen/HealthCertificate/EmpListScreen';
import HealthCertificateEmpDetailScreen from '../screens/LoggedInScreen/HealthCertificate/EmpDetailScreen';
import HealthCertificateEmpFormScreen from '../screens/LoggedInScreen/HealthCertificate/EmpFormScreen';
import ModButton from '../components/ModButton(HealthCertificateEmp)';

import HealthCertificateEmpUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/EmpUpdateScreen';

// API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppNavigator = createStackNavigator(
  {
    MyCuMain: {
      screen: MyCuMainScreen,
      navigationOptions: {
        headerTitle: 'My CU',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyCuMonthlyList: {
      screen: MyCuMonthlyListScreen,
      navigationOptions: {
        headerTitle: '노무 월간지',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyCuMonthlyDetail: {
      screen: MyCuMonthlyDetailScreen,
      navigationOptions: {
        headerTitle: '노무 월간지',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyCuVideoList: {
      screen: MyCuVideoListScreen,
      navigationOptions: {
        headerTitle: '노무 교육 콘텐츠',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyCuVideoDetail: {
      screen: MyCuVideoDetailScreen,
      navigationOptions: {
        headerTitle: '노무 교육 콘텐츠',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
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

    // 조기경보시스템 (매장 목록)
    HealthCertificateStoreList: {
      screen: HealthCertificateStoreListScreen,
      navigationOptions: {
        headerTitle: '조기경보시스템 매장 목록',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    // 조기경보시스템 (타입 선택(위생,보건))
    HealthCertificateType: {
      screen: HealthCertificateTypeScreen,
      navigationOptions: {
        headerTitle: '조기경보시스템 타입선택',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    // 보건증조기경보시스템 (직원 목록)
    HealthCertificateEmpList: {
      screen: HealthCertificateEmpListScreen,
      navigationOptions: {
        headerTitle: '조기경보시스템 직원 목록',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    // 보건증조기경보시스템 (직원 상세) ${navigation.state.params.type == '0' ? '위생교육증' : '보건증'} ${navigation.state.params.FORM}
    HealthCertificateEmpDetail: {
      screen: HealthCertificateEmpDetailScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: `조기경보시스템 상세`,
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '200',
        },
        headerRight: <ModButton />,
      }),
    },
    HealthCertificateEmpUpdate: {
      screen: HealthCertificateEmpUpdateScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: `조기경보시스템 ${
          navigation.state.params.type == '0' ? '위생교육증' : '보건증'
        } ${navigation.state.params.FORM}`,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
        },
      }),
    },
    // 보건증조기경보시스템 (교육 정보입력)
    HealthCertificateEmpForm: {
      screen: HealthCertificateEmpFormScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: `조기경보시스템 ${
          navigation.state.params.type == '0' ? '위생교육증' : '보건증'
        } ${navigation.state.params.FORM}`,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
        },
      }),
    },
    ElectronicContracts2: {
      screen: ElectronicContractsScreen2,
      navigationOptions: {
        headerTitle: '전자근로계약서 체결',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
        },
      },
    },
    MyPagePositionSet: {
      screen: MyPagePositionSetScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: '200', color: 'white', fontSize: 16}}>
              점주
            </Text>
            <FontAwesome
              name="arrows-h"
              size={16}
              color="white"
              style={{fontWeight: '200', marginHorizontal: 5}}
            />
            <Text style={{fontWeight: '200', color: 'white', fontSize: 16}}>
              직원
            </Text>
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
    // initialRouteName: 'MyPageMain',
    initialRouteName: 'MyCuMain',
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

const LoggedInBTN_MyCuNavigation = createAppContainer(AppNavigator);

export default LoggedInBTN_MyCuNavigation;
