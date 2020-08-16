import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BackBtn from '../components/Header/BackBtn';
import HomeBtn from '../components/Header/HomeBtn';
import CalendarInfoHeader from '../components/Header/CalendarInfoHeader';

// 직원관리 ============================
import HomeScreen from '../screens/LoggedInScreen/Home/HomeScreen';
import AddStoreScreen from '../screens/LoggedInScreen/Home/AddStoreScreen';
import UpdateStoreScreen from '../screens/LoggedInScreen/Home/UpdateStoreScreen';
import SearchAddressScreen from '../screens/LoggedInScreen/Home/SearchAddressScreen';
import SetEmployeeInfoScreen from '../screens/LoggedInScreen/Home/SetEmployeeInfoScreen';
import ElectronicContractsScreen from '../screens/LoggedInScreen/Home/ElectronicContractsScreen';

// EmployeeScheduleScreen============================
import EmployeeScheduleMainScreen from '../screens/LoggedInScreen/Home/EmployeeScheduleMainScreen';
import EmployeeScheduleInfoScreen from '../screens/LoggedInScreen/Home/EmployeeScheduleInfoScreen';
import EmployeeScheduleAddScreen from '../screens/LoggedInScreen/Home/EmployeeScheduleAddScreen';

import StoreScreen from '../screens/LoggedInScreen/Home/StoreScreen';
import InviteEmployeeScreen from '../screens/LoggedInScreen/Home/InviteEmployeeScreen';
import EmployeeListScreen from '../screens/LoggedInScreen/Home/EmployeeListScreen';
import PaymentInfoScreen from '../screens/LoggedInScreen/Home/PaymentInfoScreen';
import EmpPaymentInfoScreen from '../screens/LoggedInScreen/Home/EmpPayInfoScreen';
import ShelfLifeCheckScreen from '../screens/LoggedInScreen/Home/ShelfLifeCheckScreen';
import ShelfLifeUpdateScreen from '../screens/LoggedInScreen/Home/ShelfLifeUpdateScreen';
import AddShelfLifeScreen from '../screens/LoggedInScreen/Home/AddShelfLifeScreen';

import ManageInviteEmployeeScreen from '../screens/LoggedInScreen/Home/ManageInviteEmployeeScreen';
import EmployeeInfoScreen from '../screens/LoggedInScreen/Home/EmployeeInfoScreen';
import EmployeeInfoEMPScreen from '../screens/LoggedInScreen/Home/EmployeeInfoEMPScreen';

// 직원용
import StoreScreenEmp from '../screens/LoggedInScreen/Home/StoreScreenEmp';

// 캘린더============================
import CalendarAddScreen from '../screens/LoggedInScreen/Calendar/CalendarAddScreen';
import CalendarInfoScreen from '../screens/LoggedInScreen/Calendar/CalendarInfoScreen';
import WorkTimeScreen from '../screens/LoggedInScreen/Calendar/WorkTimeScreen';
import RealWorkTimeScreen from '../screens/LoggedInScreen/Calendar/RealWorkTimeScreen';
import WorkDayScreen from '../screens/LoggedInScreen/Calendar/WorkDayScreen';
import WorkDayRestTypeScreen from '../screens/LoggedInScreen/Calendar/WorkDayRestTypeScreen';
import WorkDayRestTimeScreen from '../screens/LoggedInScreen/Calendar/WorkDayRestTimeScreen';

// 체크리스트============================
import ChecklistAddScreen from '../screens/LoggedInScreen/Checklist/ChecklistAddScreen';
import ChecklistItemsScreen from '../screens/LoggedInScreen/Checklist/ChecklistItemsScreen';
import ChecklistSpecificationScreen from '../screens/LoggedInScreen/Checklist/ChecklistSpecificationScreen';
import ChecklistDetailScreen from '../screens/LoggedInScreen/Checklist/ChecklistDetailScreen';

// 업무일지
import ChecklistShareMainScreen from '../screens/LoggedInScreen/Checklist/ChecklistShareMainScreen';
import ChecklistShareItemScreen from '../screens/LoggedInScreen/Checklist/ChecklistShareItemScreen';
import ChecklistShareInsertScreen from '../screens/LoggedInScreen/Checklist/ChecklistShareInsertScreen';
import ChecklistShareUpdateScreen from '../screens/LoggedInScreen/Checklist/ChecklistShareUpdateScreen';

// 교육컨텐츠============================
import MyCuMonthlyListScreen from '../screens/LoggedInScreen/MyCu/MyCuMonthlyListScreen';
import MyCuMonthlyDetailScreen from '../screens/LoggedInScreen/MyCu/MyCuMonthlyDetailScreen';
import MyCuVideoListScreen from '../screens/LoggedInScreen/MyCu/MyCuVideoListScreen';
import MyCuVideoDetailScreen from '../screens/LoggedInScreen/MyCu/MyCuVideoDetailScreen';
import EducationVideoListScreen from '../screens/LoggedInScreen/MyCu/EducationVideoListScreen';
import EducationVideoDetailScreen from '../screens/LoggedInScreen/MyCu/EducationVideoDetailScreen';

// 마이페이지============================
import MyPageAlarmSetScreen from '../screens/LoggedInScreen/MyPage/MyPageAlarmSetScreen';
import MyPageAppointmentScreen from '../screens/LoggedInScreen/MyPage/MyPageAppointmentScreen';
import MyPageMainScreen from '../screens/LoggedInScreen/MyPage/MyPageMainScreen';
import MyPagePlaceSetScreen from '../screens/LoggedInScreen/MyPage/MyPagePlaceSetScreen';

import MyPageIdSetMainScreen from '../screens/LoggedInScreen/MyPage/MyPageIdSetMainScreen';
import MyPageDeleteSetScreen from '../screens/LoggedInScreen/MyPage/MyPageDeleteSetScreen';
import MyPageNameSetScreen from '../screens/LoggedInScreen/MyPage/MyPageNameSetScreen';
import MyPagePasswordSetScreen from '../screens/LoggedInScreen/MyPage/MyPagePasswordSetScreen';

// 조기경보============================
import HealthCertificateTypeScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateTypeScreen';
import HealthCertificateEmpListScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpListScreen';
import HealthCertificateEmpDetailScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpDetailScreen';
import HealthCertificateEmpFormScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpFormScreen';
import HealthCertificateStoreFormScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreFormScreen';
import HealthCertificateStoreDetailScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreDetailScreen';
import HealthCertificateEmpUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateEmpUpdateScreen';
import HealthCertificateStoreUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/HealthCertificateStoreUpdateScreen';

const LoggedInBTN_HomeNavigation = createStackNavigator();
export default () => (
  <LoggedInBTN_HomeNavigation.Navigator
    headerMode={'screen'}
    initialRouteName={'HomeScreen'}
    screenOptions={{
      headerStyle: {
        backgroundColor: '#AACE36',
        borderColor: '#fff',
        borderWidth: 0,
      },
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerBackImage: () => <BackBtn />,
      headerRight: () => <HomeBtn />,
    }}>
    <LoggedInBTN_HomeNavigation.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="AddStoreScreen"
      component={AddStoreScreen}
      options={{
        title: '점포 등록',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="UpdateStoreScreen"
      component={UpdateStoreScreen}
      options={{
        title: '점포 수정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="SearchAddressScreen"
      component={SearchAddressScreen}
      options={{
        title: '점포 검색',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="SetEmployeeInfoScreen"
      component={SetEmployeeInfoScreen}
      options={{
        title: '직원정보 입력',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ElectronicContractsScreen"
      component={ElectronicContractsScreen}
      options={{
        title: '전자근로계약서 체결',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EmployeeScheduleMainScreen"
      component={EmployeeScheduleMainScreen}
      options={{
        title: '직원 정보',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EmployeeScheduleInfoScreen"
      component={EmployeeScheduleInfoScreen}
      options={{
        title: '직원 정보',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EmployeeScheduleAddScreen"
      component={EmployeeScheduleAddScreen}
      options={{
        title: '일정추가',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="StoreScreen"
      component={StoreScreen}
      options={{
        title: '점포 현황',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="StoreScreenEmp"
      component={StoreScreenEmp}
      options={{
        title: '점포 현황',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="InviteEmployeeScreen"
      component={InviteEmployeeScreen}
      options={{
        title: '직원 초대',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EmployeeListScreen"
      component={EmployeeListScreen}
      options={{
        title: '직원 목록',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="PaymentInfoScreen"
      component={PaymentInfoScreen}
      options={{
        title: '점포급여 정보',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EmpPaymentInfoScreen"
      component={EmpPaymentInfoScreen}
      options={{
        title: '직원급여 정보',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ShelfLifeCheckScreen"
      component={ShelfLifeCheckScreen}
      options={{
        title: '유통기한 체크',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ShelfLifeUpdateScreen"
      component={ShelfLifeUpdateScreen}
      options={{
        title: '유통기한 체크 수정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="AddShelfLifeScreen"
      component={AddShelfLifeScreen}
      options={{
        title: '유통기한 체크 등록',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ManageInviteEmployeeScreen"
      component={ManageInviteEmployeeScreen}
      options={{
        title: '직원 초대현황',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EmployeeInfoScreen"
      component={EmployeeInfoScreen}
      options={{
        title: '직원 정보',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EmployeeInfoEMPScreen"
      component={EmployeeInfoEMPScreen}
      options={{
        title: '직원 정보',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="CalendarAddScreen"
      component={CalendarAddScreen}
      options={{
        title: '일정추가',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="CalendarInfoScreen"
      component={CalendarInfoScreen}
      options={{
        title: '비밀번호 찾기',
        headerRight: () => <CalendarInfoHeader />,
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="WorkTimeScreen"
      component={WorkTimeScreen}
      options={{
        title: '근무시간 수정하기',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="RealWorkTimeScreen"
      component={RealWorkTimeScreen}
      options={{
        title: '출퇴근시간 수정하기',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="WorkDayScreen"
      component={WorkDayScreen}
      options={{
        title: '휴무/휴게시간 설정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="WorkDayRestTypeScreen"
      component={WorkDayRestTypeScreen}
      options={{
        title: '휴무 설정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="WorkDayRestTimeScreen"
      component={WorkDayRestTimeScreen}
      options={{
        title: '시간 설정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ChecklistAddScreen"
      component={ChecklistAddScreen}
      options={{
        title: '체크리스트 입력',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ChecklistItemsScreen"
      component={ChecklistItemsScreen}
      options={{
        title: '체크리스트',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ChecklistSpecificationScreen"
      component={ChecklistSpecificationScreen}
      options={{
        title: '체크리스트 상세',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ChecklistDetailScreen"
      component={ChecklistDetailScreen}
      options={{
        title: '체크리스트 체크상세',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ChecklistShareMainScreen"
      component={ChecklistShareMainScreen}
      options={{
        title: '업무일지',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ChecklistShareItemScreen"
      component={ChecklistShareItemScreen}
      options={{
        title: '체크리스트 상세',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ChecklistShareInsertScreen"
      component={ChecklistShareInsertScreen}
      options={{
        title: '체크리스트 등록',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="ChecklistShareUpdateScreen"
      component={ChecklistShareUpdateScreen}
      options={{
        title: '체크리스트 수정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyCuMonthlyListScreen"
      component={MyCuMonthlyListScreen}
      options={{
        title: '노무 월간지',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyCuMonthlyDetailScreen"
      component={MyCuMonthlyDetailScreen}
      options={{
        title: '노무 월간지',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyCuVideoListScreen"
      component={MyCuVideoListScreen}
      options={{
        title: '노무 교육 콘텐츠',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyCuVideoDetailScreen"
      component={MyCuVideoDetailScreen}
      options={{
        title: '노무 교육 콘텐츠',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EducationVideoListScreen"
      component={EducationVideoListScreen}
      options={{
        title: '교육자료',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="EducationVideoDetailScreen"
      component={EducationVideoDetailScreen}
      options={{
        title: '교육자료',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyPageAlarmSetScreen"
      component={MyPageAlarmSetScreen}
      options={{
        title: '알림설정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyPageAppointmentScreen"
      component={MyPageAppointmentScreen}
      options={{
        title: '약관보기',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyPageMainScreen"
      component={MyPageMainScreen}
      options={{
        title: '마이페이지',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyPagePlaceSetScreen"
      component={MyPagePlaceSetScreen}
      options={{
        title: '점포관리이력',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyPageIdSetMainScreen"
      component={MyPageIdSetMainScreen}
      options={{
        title: '마이페이지',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyPageDeleteSetScreen"
      component={MyPageDeleteSetScreen}
      options={{
        title: '회원탈퇴',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyPageNameSetScreen"
      component={MyPageNameSetScreen}
      options={{
        title: '이름 변경',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="MyPagePasswordSetScreen"
      component={MyPagePasswordSetScreen}
      options={{
        title: '비밀번호 재설정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="HealthCertificateTypeScreen"
      component={HealthCertificateTypeScreen}
      options={{
        title: '조기경보시스템 타입선택',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="HealthCertificateEmpListScreen"
      component={HealthCertificateEmpListScreen}
      options={{
        title: '보건증 직원 목록',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="HealthCertificateEmpDetailScreen"
      component={HealthCertificateEmpDetailScreen}
      options={{
        title: '보건증 상세',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="HealthCertificateStoreDetailScreen"
      component={HealthCertificateStoreDetailScreen}
      options={{
        title: '위생교육증 상세',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="HealthCertificateEmpUpdateScreen"
      component={HealthCertificateEmpUpdateScreen}
      options={{
        title: '보건증 수정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="HealthCertificateStoreUpdateScreen"
      component={HealthCertificateStoreUpdateScreen}
      options={{
        title: '위생교육증 수정',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="HealthCertificateEmpFormScreen"
      component={HealthCertificateEmpFormScreen}
      options={{
        title: '보건증 입력',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="HealthCertificateStoreFormScreen"
      component={HealthCertificateStoreFormScreen}
      options={{
        title: '위생교육증 입력',
      }}
    />
    <LoggedInBTN_HomeNavigation.Screen
      name="SetEmployeeInfoScreen"
      component={SetEmployeeInfoScreen}
      options={{
        title: '직원정보 입력',
      }}
    />
  </LoggedInBTN_HomeNavigation.Navigator>
);
