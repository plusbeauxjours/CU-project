import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BackBtn from '../components/Header/BackBtn';
import HomeBtn from '../components/Header/HomeBtn';
import MyPagePositionHeader from '../components/Header/MyPagePositionHeader';
import CalendarInfoHeader from '../components/Header/CalendarInfoHeader';


// 직원관리 ============================
import HomeScreen from '../screens/LoggedInScreen/Home/HomeScreen';
import AddStoreScreen from '../screens/LoggedInScreen/Home/AddStoreScreen';
import UpdateStoreScreen from '../screens/LoggedInScreen/Home/UpdateStoreScreen';
import SearchAddressScreen from '../screens/LoggedInScreen/Home/SearchAddressScreen';
// import SetEmployeeInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/SetEmployeeInfoScreen';
// import ElectronicContractsScreen from '../screens/LoggedInScreen/HomeTabScreen/ElectronicContractsScreen';

// // ↓ EmployeeScheduleScreen 3개
// import EmployeeScheduleMainScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeeScheduleScreen/EmployeeScheduleMainScreen';
// import EmployeeScheduleInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeeScheduleScreen/EmployeeScheduleInfoScreen';
// import EmployeeScheduleAddScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeeScheduleScreen/EmployeeScheduleAddScreen_NEW';


// import StoreScreen from '../screens/LoggedInScreen/HomeTabScreen/StoreScreen';
// import InviteEmployeeScreen from '../screens/LoggedInScreen/HomeTabScreen/InviteEmployeeScreen';
// import EmployeelistScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeelistScreen';
// import PaymentInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/PaymentInfoScreen';
// import EmpPaymentInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/EmpPayInfoScreen';
// import ShelfLifeCheckScreen from '../screens/LoggedInScreen/HomeTabScreen/shelfLifeCheckScreen';
// import ShelfLifeUpdateScreen from '../screens/LoggedInScreen/HomeTabScreen/shelfLifeUpdateScreen';
// import AddShelfLifeScreen from '../screens/LoggedInScreen/HomeTabScreen/AddShelfLifeScreen';

// import ManageInviteEmployeeScreen from '../screens/LoggedInScreen/HomeTabScreen/ManageInviteEmployeeScreen';
// import EmployeeInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeeInfoScreen_NEW';
// import EmployeeInfoScreen_emp from '../screens/LoggedInScreen/HomeTabScreen/EmployeeInfoScreen(emp)';

// // ↓ 직원용
// import StoreScreenEmp from '../screens/LoggedInScreen/HomeTabScreen/StoreScreen(emp)';
// import ElectronicContractsScreen2 from '../screens/LoggedInScreen/HomeTabScreen/ElectronicContractsScreen2';


// // 업무관리 ============================
// // 캘린더
// import CalendarAddScreen from '../screens/LoggedInScreen/CalendarScreen/CalendarAddScreen';
// import CalendarInfoScreen from '../screens/LoggedInScreen/CalendarScreen/CalendarInfoScreen';
// import workTimeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkTimeScreen';
// import RealWorkTimeScreen from '../screens/LoggedInScreen/CalendarScreen/RealWorkTimeScreen';
// import WorkDayScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayScreen';
// import WorkDayRestTypeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayRestTypeScreen';
// import WorkDayRestTimeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayRestTimeScreen';

// // 체크리스트============================
// import ChecklistAddScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistAddScreen';
// import ChecklistItemsScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistItemsScreen';
// import ChecklistSpecificationScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistSpecificationScreen';
// import ChecklistDetailScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistDetail';

// // 업무일지
// import ChecklistShareMainScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareMainScreen';
// import ChecklistShareItemScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareItemScreen';
// import ChecklistShareInsertScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareInsertScreen';
// import ChecklistShareUpdateScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareUpdateScreen';

// // 교육컨텐츠============================
// import MycuMonthlyListScreen from '../screens/LoggedInScreen/MycuScreen/MycuMonthlyListScreen';
// import MycuMonthlyDetailScreen from '../screens/LoggedInScreen/MycuScreen/MycuMonthlyDetailScreen';
// import MycuVideoListScreen from '../screens/LoggedInScreen/MycuScreen/MycuVideoListScreen';
// import MycuVideoDetailScreen from '../screens/LoggedInScreen/MycuScreen/MycuVideoDetailScreen';
// import EducationVideoListScreen from '../screens/LoggedInScreen/MycuScreen/EducationVideoListScreen';
// import EducationVideoDetailScreen from '../screens/LoggedInScreen/MycuScreen/EducationVideoDetailScreen';

// // 마이페이지
// import MyPageAlarmSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageAlarmSetScreen';
// import MyPageAppointmentScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageAppointmentScreen';
// import MyPageMainScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageMainScreen';
// import MyPagePlaceSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPagePlaceSetScreen';

// import MyPageIdSetMainScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageIdSetMainScreen';
// import MyPageDeleteSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageDeleteSetScreen';
// import MyPageNameSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageNameSetScreen';
// import MyPagePasswordSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPagePasswordSetScreen';
// import MyPagePositionSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPagePositionSetScreen';


// // 조기경보
// import HealthCertificateStoreListScreen from '../screens/LoggedInScreen/HealthCertificate/StoreListScreen';
// import HealthCertificateTypeScreen from '../screens/LoggedInScreen/HealthCertificate/CertificateTypeScreen';
// import HealthCertificateEmpListScreen from '../screens/LoggedInScreen/HealthCertificate/EmpListScreen';
// import HealthCertificateEmpDetailScreen from '../screens/LoggedInScreen/HealthCertificate/EmpDetailScreen';
// import HealthCertificateEmpFormScreen from '../screens/LoggedInScreen/HealthCertificate/EmpFormScreen';
// import HealthCertificateStoreFormScreen from '../screens/LoggedInScreen/HealthCertificate/StoreFormScreen';
// import HealthCertificateStoreDetailScreen from '../screens/LoggedInScreen/HealthCertificate/StoreDetailScreen';
// import HealthCertificateEmpUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/EmpUpdateScreen';
// import HealthCertificateStoreUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/StoreUpdateScreen';






const LoggedInBTN_HomeNavigation = createStackNavigator();
export default () => (
  <LoggedInBTN_HomeNavigation.Navigator
    headerMode={'screen'}
    screenOptions={{
      headerStyle: {
        backgroundColor: '#AACE36',
        borderColor: '#fff',
        borderWidth: 0,
      },
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
        headerTintColor: '#fff',
      }}
    />






    // <LoggedInBTN_HomeNavigation.Screen
    //   name="UpdateStoreScreen"
    //   component={UpdateStoreScreen}
    //   options={{
    //     title: '점포 수정',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="SearchAddressScreen"
    //   component={SearchAddressScreen}
    //   options={{
    //     title: '점포 검색',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="SetEmployeeInfoScreen"
    //   component={SetEmployeeInfoScreen}
    //   options={{
    //     title: '직원정보 입력',
    //     headerTintColor: '#fff',
    //   }}
    // />

    // <LoggedInBTN_HomeNavigation.Screen
    //   name="StoreScreen"
    //   component={StoreScreen}
    //   options={{
    //     title: '점포 현황',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="StoreScreenEmp"
    //   component={StoreScreenEmp}
    //   options={{
    //     title: '점포 현황',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="InviteEmployeeScreen"
    //   component={InviteEmployeeScreen}
    //   options={{
    //     title: '직원 초대',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="EmployeelistScreen"
    //   component={EmployeelistScreen}
    //   options={{
    //     title: '직원 목록',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="PaymentInfoScreen"
    //   component={PaymentInfoScreen}
    //   options={{
    //     title: '점포급여 정보',
    //     headerTintColor: '#fff',
    //   }}
    // />    
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="EmpPaymentInfoScreen"
    //   component={EmpPaymentInfoScreen}
    //   options={{
    //     title: '직원급여 정보',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="ManageInviteEmployeeScreen"
    //   component={ManageInviteEmployeeScreen}
    //   options={{
    //     title: '직원 초대현황',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="EmployeeInfoScreen"
    //   component={EmployeeInfoScreen}
    //   options={{
    //     title: '직원 정보',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="EmployeeInfoScreen_emp"
    //   component={EmployeeInfoScreen_emp}
    //   options={{
    //     title: '직원 정보',
    //     headerTintColor: '#fff',
    //   }}
    // />    
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="EmployeeScheduleMainScreen"
    //   component={EmployeeScheduleMainScreen}
    //   options={{
    //     title: '직원 정보',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="EmployeeScheduleInfoScreen"
    //   component={EmployeeScheduleInfoScreen}
    //   options={{
    //     title: '직원 정보',
    //     headerTintColor: '#fff',
    //   }}
    // />
    // <LoggedInBTN_HomeNavigation.Screen
    //   name="EmployeeScheduleAddScreen"
    //   component={EmployeeScheduleAddScreen}
    //   options={{
    //     title: '일정추가',
    //     headerTintColor: '#fff',
    //   }}
    // />

  //   <LoggedInBTN_HomeNavigation.Screen
  //     name="ShelfLifeCheckScreen"
  //     component={ShelfLifeCheckScreen}
  //     options={{
  //       title: '유통기한 체크',
  //       headerTintColor: '#fff',
  //     }}
  //   />
  //   <LoggedInBTN_HomeNavigation.Screen
  //   name="ShelfLifeUpdateScreen"
  //   component={ShelfLifeUpdateScreen}
  //   options={{
  //     title: '유통기한 체크 수정',
  //     headerTintColor: '#fff',
  //   }}
  // />
  // <LoggedInBTN_HomeNavigation.Screen
  //   name="AddShelfLifeScreen"
  //   component={AddShelfLifeScreen}
  //   options={{
  //     title: '유통기한 체크 등록',
  //     headerTintColor: '#fff',
  //   }}
  // />

//   <LoggedInBTN_HomeNavigation.Screen
//   name="ElectronicContractsScreen"
//   component={ElectronicContractsScreen}
//   options={{
//     title: '전자근로계약서 체결',
//     headerTintColor: '#fff',
//   }}
// />

// <LoggedInBTN_HomeNavigation.Screen
//   name="CalendarInfoScreen"
//   component={CalendarInfoScreen}
//   options={{
//     title: '비밀번호 찾기',
//     headerTintColor: '#fff',
//     headerRight: () => <CalendarInfoHeader />,
//   }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="CalendarAddScreen"
// component={CalendarAddScreen}
// options={{
//   title: '일정추가',
//   headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="workTimeScreen"
// component={workTimeScreen}
// options={{
//   title: '근무시간 수정하기',
//   headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="RealWorkTimeScreen"
// component={RealWorkTimeScreen}
// options={{
//   title: '출퇴근시간 수정하기',
//   headerTintColor: '#fff',
// }}
// />



// <LoggedInBTN_HomeNavigation.Screen
// name="WorkDayScreen"
// component={WorkDayScreen}
// options={{
// title: '휴무/휴게시간 설정',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="WorkDayRestTypeScreen"
// component={WorkDayRestTypeScreen}
// options={{
// title: '휴무 설정',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="WorkDayRestTimeScreen"
// component={WorkDayRestTimeScreen}
// options={{
// title: '시간 설정',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="ChecklistItemsScreen"
// component={ChecklistItemsScreen}
// options={{
// title: '체크리스트',
// headerTintColor: '#fff',
// }}
// /> 



// <LoggedInBTN_HomeNavigation.Screen
// name="ChecklistAddScreen"
// component={ChecklistAddScreen}
// options={{
//   title: '체크리스트 입력',
//   headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="ChecklistDetailScreen"
// component={ChecklistDetailScreen}
// options={{
// title: '체크리스트 체크상세',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="ChecklistSpecificationScreen"
// component={ChecklistSpecificationScreen}
// options={{
// title: '체크리스트 상세',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="ChecklistShareMainScreen"
// component={ChecklistShareMainScreen}
// options={{
// title: '업무일지',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="ChecklistShareItemScreen"
// component={ChecklistShareItemScreen}
// options={{
// title: '체크리스트 상세',
// headerTintColor: '#fff',
// }}
// /> 
//  <LoggedInBTN_HomeNavigation.Screen
// name="ChecklistShareInsertScreen"
// component={ChecklistShareInsertScreen}
// options={{
//   title: '체크리스트 등록',
//   headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="ChecklistShareUpdateScreen"
// component={ChecklistShareUpdateScreen}
// options={{
// title: '체크리스트 수정',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MycuMonthlyListScreen"
// component={MycuMonthlyListScreen}
// options={{
// title: '노무 월간지',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="MycuMonthlyDetailScreen"
// component={MycuMonthlyDetailScreen}
// options={{
// title: '노무 월간지',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MycuVideoListScreen"
// component={MycuVideoListScreen}
// options={{
// title: '노무 교육 콘텐츠',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MycuVideoDetailScreen"
// component={MycuVideoDetailScreen}
// options={{
// title: '노무 교육 콘텐츠',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="EducationVideoListScreen"
// component={EducationVideoListScreen}
// options={{
// title: '교육자료',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="EducationVideoDetailScreen"
// component={EducationVideoDetailScreen}
// options={{
// title: '교육자료',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="HealthCertificateTypeScreen"
// component={HealthCertificateTypeScreen}
// options={{
// title: '조기경보시스템 타입선택',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="HealthCertificateEmpListScreen"
// component={HealthCertificateEmpListScreen}
// options={{
// title: '보건증 직원 목록',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="HealthCertificateEmpDetailScreen"
// component={HealthCertificateEmpDetailScreen}
// options={{
// title: '보건증 상세',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="HealthCertificateStoreDetailScreen"
// component={HealthCertificateStoreDetailScreen}
// options={{
// title: '위생교육증 상세',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="HealthCertificateEmpUpdateScreen"
// component={HealthCertificateEmpUpdateScreen}
// options={{
// title: '보건증 수정',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="HealthCertificateStoreUpdateScreen"
// component={HealthCertificateStoreUpdateScreen}
// options={{
// title: '위생교육증 수정',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="HealthCertificateEmpFormScreen"
// component={HealthCertificateEmpFormScreen}
// options={{
// title: '보건증 입력',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="HealthCertificateStoreFormScreen"
// component={HealthCertificateStoreFormScreen}
// options={{
// title: '위생교육증 입력',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MyPageMainScreen"
// component={MyPageMainScreen}
// options={{
// title: '마이페이지',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MyPageAlarmSetScreen"
// component={MyPageAlarmSetScreen}
// options={{
// title: '알림설정',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="MyPageAppointmentScreen"
// component={MyPageAppointmentScreen}
// options={{
// title: '약관보기',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MyPagePlaceSetScreen"
// component={MyPagePlaceSetScreen}
// options={{
// title: '점포관리이력',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MyPageIdSetMainScreen"
// component={MyPageIdSetMainScreen}
// options={{
// title: '마이페이지',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="MyPageDeleteSetScreen"
// component={MyPageDeleteSetScreen}
// options={{
// title: '회원탈퇴',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MyPageNameSetScreen"
// component={MyPageNameSetScreen}
// options={{
// title: '이름 변경',
// headerTintColor: '#fff',
// }}
// />
// <LoggedInBTN_HomeNavigation.Screen
// name="MyPagePasswordSetScreen"
// component={MyPagePasswordSetScreen}
// options={{
// title: '비밀번호 재설정',
// headerTintColor: '#fff',
// }}
// />





// <LoggedInBTN_HomeNavigation.Screen
// name="ElectronicContractsScreen2"
// component={ElectronicContractsScreen2}
// options={{
// title: '전자근로계약서 체결',
// headerTintColor: '#fff',
// }}
// />


// <LoggedInBTN_HomeNavigation.Screen
// name="SetEmployeeInfoScreen"
// component={SetEmployeeInfoScreen}
// options={{
// title: '직원정보 입력',
// headerTintColor: '#fff',
// }}
// />

// <LoggedInBTN_HomeNavigation.Screen
// name="MyPagePositionSetScreen"
// component={MyPagePositionSetScreen}
// options={{
//   headerTitle: ()=> <MyPagePositionHeader/>
// headerTintColor: '#fff',
// }}
// />

</LoggedInBTN_HomeNavigation.Navigator>
);