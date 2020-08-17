import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import RootModal from '../components/RootModal';
import LogOutBtn from '../components/Header/LogOutBtn';
import SettingBtn from '../components/Header/SettingBtn';

import SelectStoreScreen from '../screens/LoggedInScreen/Home/SelectStoreScreen';
import AddStoreScreen from '../screens/LoggedInScreen/Home/AddStoreScreen';
import SearchAddressScreen from '../screens/LoggedInScreen/Home/SearchAddressScreen';

// 마이페이지
import MyPageAlarmSetScreen from '../screens/LoggedInScreen/MyPage/MyPageAlarmSetScreen';
import MyPageAppointmentScreen from '../screens/LoggedInScreen/MyPage/MyPageAppointmentScreen';
import MyPageMainScreen from '../screens/LoggedInScreen/MyPage/MyPageMainScreen';
import MyPagePlaceSetScreen from '../screens/LoggedInScreen/MyPage/MyPagePlaceSetScreen';

import MyPageIdSetMainScreen from '../screens/LoggedInScreen/MyPage/MyPageIdSetMainScreen';
import MyPageDeleteSetScreen from '../screens/LoggedInScreen/MyPage/MyPageDeleteSetScreen';
import MyPageNameSetScreen from '../screens/LoggedInScreen/MyPage/MyPageNameSetScreen';
import MyPagePasswordSetScreen from '../screens/LoggedInScreen/MyPage/MyPagePasswordSetScreen';
import ElectronicContractsScreen from '../screens/LoggedInScreen/Home/ElectronicContractsScreen';
import MyCuMonthlyListScreen from '../screens/LoggedInScreen/MyCu/MyCuMonthlyListScreen';
import MyCuMonthlyDetailScreen from '../screens/LoggedInScreen/MyCu/MyCuMonthlyDetailScreen';
import MyCuVideoListScreen from '../screens/LoggedInScreen/MyCu/MyCuVideoListScreen';
import MyCuVideoDetailScreen from '../screens/LoggedInScreen/MyCu/MyCuVideoDetailScreen';
import EducationVideoListScreen from '../screens/LoggedInScreen/MyCu/EducationVideoListScreen';
import EducationVideoDetailScreen from '../screens/LoggedInScreen/MyCu/EducationVideoDetailScreen';

const LoggedInNavigation = createStackNavigator();
export default () => {
  const alert = useSelector((state: any) => state.alertReducer);
  return (
    <React.Fragment>
      <LoggedInNavigation.Navigator
        headerMode={'screen'}
        initialRouteName={'SelectStoreScreen'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#AACE36',
            borderColor: '#fff',
            borderWidth: 0,
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
        }}>
        <LoggedInNavigation.Screen
          name="SelectStoreScreen"
          component={SelectStoreScreen}
          options={{
            title: '점포 선택',
            headerLeft: () => <SettingBtn />,
            headerRight: () => <LogOutBtn />,
          }}
        />
        <LoggedInNavigation.Screen
          name="SearchAddressScreen"
          component={SearchAddressScreen}
          options={{
            title: '점포 검색',
          }}
        />
        <LoggedInNavigation.Screen
          name="AddStoreScreen"
          component={AddStoreScreen}
          options={{
            title: '점포 등록',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageMainScreen"
          component={MyPageMainScreen}
          options={{
            title: '마이페이지',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageAlarmSetScreen"
          component={MyPageAlarmSetScreen}
          options={{
            title: '알림 설정',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageAppointmentScreen"
          component={MyPageAppointmentScreen}
          options={{
            title: '약관 보기',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPagePlaceSetScreen"
          component={MyPagePlaceSetScreen}
          options={{
            title: '점포 관리 이력',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageIdSetMainScreen"
          component={MyPageIdSetMainScreen}
          options={{
            title: '마이페이지',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageDeleteSetScreen"
          component={MyPageDeleteSetScreen}
          options={{
            title: '회원탈퇴',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPageNameSetScreen"
          component={MyPageNameSetScreen}
          options={{
            title: '이름 변경',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyPagePasswordSetScreen"
          component={MyPagePasswordSetScreen}
          options={{
            title: '비밀번호 재설정',
          }}
        />
        <LoggedInNavigation.Screen
          name="ElectronicContractsScreen"
          component={ElectronicContractsScreen}
          options={{
            title: '전자근로계약서 체결',
          }}
        />
        {/* /////// TEST /////// */}
        <LoggedInNavigation.Screen
          name="MyCuMonthlyListScreen"
          component={MyCuMonthlyListScreen}
          options={{
            title: '노무 월간지',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyCuMonthlyDetailScreen"
          component={MyCuMonthlyDetailScreen}
          options={{
            title: '노무 월간지',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyCuVideoListScreen"
          component={MyCuVideoListScreen}
          options={{
            title: '노무 월간지',
          }}
        />
        <LoggedInNavigation.Screen
          name="MyCuVideoDetailScreen"
          component={MyCuVideoDetailScreen}
          options={{
            title: '노무 월간지',
          }}
        />
        <LoggedInNavigation.Screen
          name="EducationVideoListScreen"
          component={EducationVideoListScreen}
          options={{
            title: '교육자료',
          }}
        />
        <LoggedInNavigation.Screen
          name="EducationVideoDetailScreen"
          component={EducationVideoDetailScreen}
          options={{
            title: '교육자료',
          }}
        />
      </LoggedInNavigation.Navigator>
      {alert.visible && <RootModal alert={alert} />}
    </React.Fragment>
  );
};
