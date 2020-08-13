import React, {
  Component
} from 'react';
import {
  FontAwesome
} from '@expo/vector-icons';
import {
  Text,
  View,
  Image
} from 'react-native';
import {
  createAppContainer
} from 'react-navigation';
import {
  createStackNavigator
} from 'react-navigation-stack';

// 메인홈 ============================
import HomeButton from '../components/HomeButton';

// 직원관리 ============================
import HomeScreen from '../screens/LoggedInScreen/HomeTabScreen/HomeScreen';
import AddStoreScreen from '../screens/LoggedInScreen/HomeTabScreen/AddStoreScreen';
import UpdateStoreScreen from '../screens/LoggedInScreen/HomeTabScreen/UpdateStoreScreen';
import SearchAddressScreen from '../screens/LoggedInScreen/HomeTabScreen/SearchAddressScreen';
import SetEmployeeInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/SetEmployeeInfoScreen';
import ElectronicContractsScreen from '../screens/LoggedInScreen/HomeTabScreen/ElectronicContractsScreen';

// ↓ EmployeeScheduleScreen 3개
import EmployeeScheduleMainScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeeScheduleScreen/EmployeeScheduleMainScreen';
import EmployeeScheduleInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeeScheduleScreen/EmployeeScheduleInfoScreen';
import EmployeeScheduleAddScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeeScheduleScreen/EmployeeScheduleAddScreen_NEW';


import StoreScreen from '../screens/LoggedInScreen/HomeTabScreen/StoreScreen';
import InviteEmployeeScreen from '../screens/LoggedInScreen/HomeTabScreen/InviteEmployeeScreen';
import EmployeelistScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeelistScreen';
import PaymentInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/PaymentInfoScreen';
import EmpPaymentInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/EmpPayInfoScreen';
import shelfLifeCheckScreen from '../screens/LoggedInScreen/HomeTabScreen/shelfLifeCheckScreen';
import shelfLifeUpdateScreen from '../screens/LoggedInScreen/HomeTabScreen/shelfLifeUpdateScreen';
import AddShelfLifeScreen from '../screens/LoggedInScreen/HomeTabScreen/AddShelfLifeScreen';

import ManageInviteEmployeeScreen from '../screens/LoggedInScreen/HomeTabScreen/ManageInviteEmployeeScreen';
import EmployeeInfoScreen from '../screens/LoggedInScreen/HomeTabScreen/EmployeeInfoScreen_NEW';
import EmployeeInfoScreen_emp from '../screens/LoggedInScreen/HomeTabScreen/EmployeeInfoScreen(emp)';

// ↓ 직원용
import StoreScreenEmp from '../screens/LoggedInScreen/HomeTabScreen/StoreScreen(emp)';

import AddButton_EmployeeInfoScreen from '../components/AddButton(EmployeeInfoScreen)';
import AddButton_EmpSchedule from '../components/AddButton(EmpSchedule)';
import AddButton_shelfLifeCheck from '../components/AddButton(shelfLifeCheck)';

// 업무관리 ============================
// 캘린더
import CalendarAddScreen from '../screens/LoggedInScreen/CalendarScreen/CalendarAddScreen';
import CalendarInfoScreen from '../screens/LoggedInScreen/CalendarScreen/CalendarInfoScreen';
import workTimeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkTimeScreen';
import RealWorkTimeScreen from '../screens/LoggedInScreen/CalendarScreen/RealWorkTimeScreen';
import WorkDayScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayScreen';
import WorkDayRestTypeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayRestTypeScreen';
import WorkDayRestTimeScreen from '../screens/LoggedInScreen/CalendarScreen/WorkDayRestTimeScreen';

import AddButton_CalendarInfo from '../components/AddButton(CalendarInfo)';
// 체크리스트
import ChecklistAddScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistAddScreen';
import ChecklistItemsScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistItemsScreen';
import ChecklistSpecificationScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistSpecificationScreen';
import ChecklistDetailScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistDetail';

// 업무일지
import ChecklistShareMainScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareMainScreen';
import ChecklistShareItemScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareItemScreen';
import ChecklistShareInsertScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareInsertScreen';
import ChecklistShareUpdateScreen from '../screens/LoggedInScreen/ChecklistScreen/ChecklistShareUpdateScreen';

import AddButton_Notice from '../components/AddButton(Notice)'
import AddButton_ChecklistSpecificationScreen from '../components/AddButton(ChecklistSpecificationScreen)'
import AddButton_ChecklistShareMainScreen from '../components/AddButton(ChecklistShareMainScreen)'
// 교육컨텐츠
import MycuMonthlyListScreen from '../screens/LoggedInScreen/MycuScreen/MycuMonthlyListScreen';
import MycuMonthlyDetailScreen from '../screens/LoggedInScreen/MycuScreen/MycuMonthlyDetailScreen';
import MycuVideoListScreen from '../screens/LoggedInScreen/MycuScreen/MycuVideoListScreen';
import MycuVideoDetailScreen from '../screens/LoggedInScreen/MycuScreen/MycuVideoDetailScreen';
import EducationVideoListScreen from '../screens/LoggedInScreen/MycuScreen/EducationVideoListScreen';
import EducationVideoDetailScreen from '../screens/LoggedInScreen/MycuScreen/EducationVideoDetailScreen';
// 마이페이지
import MyPageAlarmSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageAlarmSetScreen';
import MyPageAppointmentScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageAppointmentScreen';
import MyPageMainScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageMainScreen';
import MyPagePlaceSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPagePlaceSetScreen';

import MyPageIdSetMainScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageIdSetMainScreen';
import MyPageDeleteSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageDeleteSetScreen';
import MyPageNameSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPageNameSetScreen';
import MyPagePasswordSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPagePasswordSetScreen';
import MyPagePositionSetScreen from '../screens/LoggedInScreen/MyPageScreen/MyPageIdSetScreen/MyPagePositionSetScreen';
import ElectronicContractsScreen2 from '../screens/LoggedInScreen/HomeTabScreen/ElectronicContractsScreen2';
// 조기경보
import HealthCertificateStoreListScreen from '../screens/LoggedInScreen/HealthCertificate/StoreListScreen';
import HealthCertificateTypeScreen from '../screens/LoggedInScreen/HealthCertificate/CertificateTypeScreen';
import HealthCertificateEmpListScreen from '../screens/LoggedInScreen/HealthCertificate/EmpListScreen';
import HealthCertificateEmpDetailScreen from '../screens/LoggedInScreen/HealthCertificate/EmpDetailScreen';
import HealthCertificateEmpFormScreen from '../screens/LoggedInScreen/HealthCertificate/EmpFormScreen';
import ModButton from '../components/ModButton(HealthCertificateEmp)';
import HealthCertificateStoreFormScreen from '../screens/LoggedInScreen/HealthCertificate/StoreFormScreen';
import HealthCertificateStoreDetailScreen from '../screens/LoggedInScreen/HealthCertificate/StoreDetailScreen';
import HealthCertificateEmpUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/EmpUpdateScreen';
import HealthCertificateStoreUpdateScreen from '../screens/LoggedInScreen/HealthCertificate/StoreUpdateScreen';



// API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
      // headerTitle: '',
      // headerTintColor: 'white',
      // headerTitleStyle: {
      //   fontWeight: '200',
      // },
    },
  },
  AddStore: {
    screen: AddStoreScreen,
    navigationOptions: {
      headerTitle: '점포 등록',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
    },
  },
  UpdateStore: {
    screen: UpdateStoreScreen,
    navigationOptions: {
      headerTitle: '점포 수정',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    },
  },
  SearchAddress: {
    screen: SearchAddressScreen,
    navigationOptions: {
      headerTitle: '점포 검색',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
    },
  },
  SetEmployeeInfo: {
    screen: SetEmployeeInfoScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: `${navigation.state.params.TITLE || '직원정보 입력'}`,
      // headerTitle: '직원 정보 입력',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      type = {
        navigation.state.params.empType
      }
      />,
    }),
  },
  Store: {
    screen: StoreScreen,
    navigationOptions: {
      headerTitle: '점포 현황',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
    },
  },
  Store2: {
    screen: StoreScreenEmp,
    navigationOptions: {
      headerTitle: '점포 현황',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
    },
  },
  Invite: {
    screen: InviteEmployeeScreen,
    navigationOptions: {
      headerTitle: '직원 초대',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  EmployeeList: {
    screen: EmployeelistScreen,
    navigationOptions: {
      headerTitle: '직원 목록',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    },
  },
  PaymentInfo: {
    screen: PaymentInfoScreen,
    navigationOptions: {
      headerTitle: '점포급여 정보',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    },
  },
  EmpPaymentInfo: {
    screen: EmpPaymentInfoScreen,
    navigationOptions: {
      headerTitle: '직원급여 정보',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },

  ManageInviteEmployee: {
    screen: ManageInviteEmployeeScreen,
    navigationOptions: {
      headerTitle: '직원 초대현황',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    },
  },
  EmployeeInfo: {
    screen: EmployeeInfoScreen,
    navigationOptions: {
      headerTitle: '직원 정보',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  EmployeeInfo_emp: {
    screen: EmployeeInfoScreen_emp,
    navigationOptions: {
      headerTitle: '직원 정보',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  // ↓ EmployeeScheduleScreen 3개
  EmployeeScheduleMain: {
    screen: EmployeeScheduleMainScreen,
    navigationOptions: {
      headerTitle: '직원 정보',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
    },
  },
  EmployeeScheduleInfo: {
    screen: EmployeeScheduleInfoScreen,
    navigationOptions: {
      headerTitle: '직원 정보',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
    },
  },
  //'일정 추가',
  EmployeeScheduleAdd: {
    screen: EmployeeScheduleAddScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: `${navigation.state.params.TITLE}`,
      // headerTitle: ${navigation.state.params.user}`,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    }),
  },
  // 유통기한 ==================================,
  shelfLifeCheck: {
    screen: shelfLifeCheckScreen,
    navigationOptions: {
      headerTitle: '유통기한 체크',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: ( <
        View style = {
          {
            flexDirection: 'row',
            alignItems: 'center',
          }
        } >
        <
        AddButton_shelfLifeCheck / >
        <
        HomeButton depth = {
          1
        }
        /> <
        /View>
      ),
      // headerRight: <AddButton_shelfLifeCheck />,
    },
  },
  shelfLifeUpdate: {
    screen: shelfLifeUpdateScreen,
    navigationOptions: {
      headerTitle: '유통기한 체크 수정',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  AddShelfLife: {
    screen: AddShelfLifeScreen,
    navigationOptions: {
      headerTitle: '유통기한 체크 등록',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  ElectronicContracts: {
    screen: ElectronicContractsScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: '전자근로계약서 체결',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      type = {
        navigation.state.params.empType
      }
      />,
    }),
  },
  // 캘린더 ==================================,
  CalendarInfo: {
    screen: CalendarInfoScreen,
    navigationOptions: {
      headerTitle: '일정관리',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: ( <
        View style = {
          {
            flexDirection: 'row',
            alignItems: 'center',
          }
        } >
        <
        AddButton_CalendarInfo / >
        <
        HomeButton depth = {
          1
        }
        /> <
        /View>
      ),
    },
  },
  CalendarAdd: {
    screen: CalendarAddScreen,
    navigationOptions: {
      headerTitle: '일정추가',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    },
  },
  WorkTime: {
    screen: workTimeScreen,
    navigationOptions: {
      headerTitle: '근무시간 수정하기',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  RealWorkTime: {
    screen: RealWorkTimeScreen,
    navigationOptions: {
      headerTitle: '출퇴근시간 수정하기',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  WorkDay: {
    screen: WorkDayScreen,
    navigationOptions: {
      headerTitle: '휴무/휴게시간 설정',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  WorkDayRestType: {
    screen: WorkDayRestTypeScreen,
    navigationOptions: {
      headerTitle: '휴무 설정',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    },
  },
  WorkDayRestTime: {
    screen: WorkDayRestTimeScreen,
    navigationOptions: {
      headerTitle: '시간 설정',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    },
  },

  // 체크리스트 ==================================,
  ChecklistItems: {
    screen: ChecklistItemsScreen,
    navigationOptions: {
      headerTitle: '체크리스트',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    },
  },
  ChecklistAdd: {
    screen: ChecklistAddScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: `${navigation.state.params.TITLE}`,
      // headerTitle: '체크리스트 입력',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    }),
  },

  ChecklistDetailScreen: {
    screen: ChecklistDetailScreen,
    navigationOptions: {
      headerTitle: '체크리스트 체크상세',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
      // headerRight: (
      //   <AddButton_ChecklistSpecificationScreen/>
      // )
    },
  },
  ChecklistSpecification: {
    screen: ChecklistSpecificationScreen,
    navigationOptions: {
      headerTitle: '체크리스트 상세',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
      // headerRight: (
      //   <AddButton_ChecklistSpecificationScreen/>
      // )
    },
  },
  // 업무일지 ==================================,
  ChecklistShareMain: {
    screen: ChecklistShareMainScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: '업무일지',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    }),
  },
  ChecklistShareItem: {
    screen: ChecklistShareItemScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: `${navigation.state.params.TITLE} 상세`,
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    }),
  },
  ChecklistShareInsertScreen: {
    screen: ChecklistShareInsertScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: `${navigation.state.params.TITLE} 등록`,
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    }),
  },
  ChecklistShareUpdateScreen: {
    screen: ChecklistShareUpdateScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: `${navigation.state.params.TITLE} 수정`,
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    }),
  },
  // 교육컨텐츠 ==================================,
  MycuMonthlyList: {
    screen: MycuMonthlyListScreen,
    navigationOptions: {
      headerTitle: '노무 월간지',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  MycuMonthlyDetail: {
    screen: MycuMonthlyDetailScreen,
    navigationOptions: {
      headerTitle: '노무 월간지',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  MycuVideoList: {
    screen: MycuVideoListScreen,
    navigationOptions: {
      headerTitle: '노무 교육 콘텐츠',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    },
  },
  MycuVideoDetail: {
    screen: MycuVideoDetailScreen,
    navigationOptions: {
      headerTitle: '노무 교육 콘텐츠',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  EducationVideoList: {
    screen: EducationVideoListScreen,
    navigationOptions: {
      headerTitle: '교육자료',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    },
  },
  EducationVideoDetail: {
    screen: EducationVideoDetailScreen,
    navigationOptions: {
      headerTitle: '교육자료',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  // 조기경보 ==================================,
  // 조기경보시스템 (타입 선택(위생,보건))
  HealthCertificateType: {
    screen: HealthCertificateTypeScreen,
    navigationOptions: {
      headerTitle: '조기경보시스템 타입선택',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
    },
  },
  // 보건증조기경보시스템 (직원 목록)
  HealthCertificateEmpList: {
    screen: HealthCertificateEmpListScreen,
    navigationOptions: {
      headerTitle: '보건증 직원 목록',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  // 보건증조기경보시스템 (직원 상세) ${navigation.state.params.type == '0' ? '위생교육증' : '보건증'} ${navigation.state.params.FORM}
  HealthCertificateEmpDetail: {
    screen: HealthCertificateEmpDetailScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: `보건증 상세`,
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    }),
  },
  HealthCertificateStoreDetail: {
    screen: HealthCertificateStoreDetailScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: `위생교육증 상세`,
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    }),
  },
  HealthCertificateEmpUpdate: {
    screen: HealthCertificateEmpUpdateScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: '보건증 수정',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        4
      }
      />,
    }),
  },
  HealthCertificateStoreUpdate: {
    screen: HealthCertificateStoreUpdateScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: '위생교육증 수정',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        4
      }
      />,
    }),
  },

  // 보건증조기경보시스템 (교육 정보입력)
  HealthCertificateEmpForm: {
    screen: HealthCertificateEmpFormScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: '보건증 입력',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        4
      }
      />,
    }),
  },
  HealthCertificateStoreForm: {
    screen: HealthCertificateStoreFormScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: '위생교육증 입력',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        4
      }
      />,
    }),
  },
  // 마이페이지 ==================================,
  MyPageMain: {
    screen: MyPageMainScreen,
    navigationOptions: {
      headerTitle: '마이페이지',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        1
      }
      />,
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
      headerRight: < HomeButton depth = {
        2
      }
      />,
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
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  MyPagePlaceSet: {
    screen: MyPagePlaceSetScreen,
    navigationOptions: {
      headerTitle: '점포관리이력',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
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
      headerRight: < HomeButton depth = {
        2
      }
      />,
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
      headerRight: < HomeButton depth = {
        3
      }
      />,
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
      headerRight: < HomeButton depth = {
        3
      }
      />,
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
      headerRight: < HomeButton depth = {
        3
      }
      />,
    },
  },
  ElectronicContracts2: {
    screen: ElectronicContractsScreen2,
    navigationOptions: {
      headerTitle: '전자근로계약서 체결',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        2
      }
      />,
    },
  },
  MyPagePositionSet: {
    screen: MyPagePositionSetScreen,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: ( <
        View style = {
          {
            flexDirection: 'row',
            alignItems: 'center'
          }
        } >
        <
        Text style = {
          {
            fontWeight: '200',
            color: 'white',
            fontSize: 16
          }
        } > 점주 < /Text> <
        FontAwesome name = "arrows-h"
        size = {
          16
        }
        color = "white"
        style = {
          {
            fontWeight: '200',
            marginHorizontal: 5
          }
        }
        /> <
        Text style = {
          {
            fontWeight: '200',
            color: 'white',
            fontSize: 16
          }
        } > 직원 < /Text> <
        /View>
      ),
      // headerTitle: `${navigation.state.params.TITLE}`,
      // headerTitle: '점주 <-> 직원',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: < HomeButton depth = {
        3
      }
      />,
    }),
  },
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#AACE36',
    },
  },
  // headerMode: 'none'
  headerLayoutPreset: 'center',
}, );

const LoggedInBTN_HomeNavigation = createAppContainer(AppNavigator);

export default LoggedInBTN_HomeNavigation;