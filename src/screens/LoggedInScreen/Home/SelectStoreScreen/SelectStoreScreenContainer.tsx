import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SelectStoreScreenPresenter from './SelectStoreScreenPresenter';

import {setSplashVisible} from '../../../../redux/splashSlice';
import {
  setStoreEmpSeq,
  setStore,
  setStoreName,
  setCalendarData,
  setCheckListData,
} from '../../../../redux/userSlice';
import utils from '../../../../constants/utils';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {useNavigation} from '@react-navigation/native';
import api from '../../../../constants/LoggedInApi';
import {BackHandler, Linking} from 'react-native';

let modalInterval;

export default () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE, HomeCard, STORE_SEQ, MEMBER_SEQ, NAME} = useSelector(
    (state: any) => state.userReducer,
  );

  const [appVersion, setAppVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [storeState, setStoreState] = useState<[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [calendarData, setCalendarData] = useState<[]>([]);
  const [checkListData, setCheckListData] = useState<[]>([]);
  const [myStore, setMyStore] = useState<[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [joinModalOpen, setJoinModalOpen] = useState<boolean>(false);
  const [barcodeModalOpen, setBarcodeModalOpen] = useState<boolean>(false);
  const [workingModalOpen, setWorkingModalOpen] = useState<boolean>(false);
  const [storeName, setStoreName] = useState<string>('');
  const [storeSEQ, setStoreSEQ] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(
    false,
  );
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [QR, setQR] = useState<string>('');

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const openModal = (name, seq) => {
    setJoinModalOpen(true);
    setStoreName(name);
    setStoreSEQ(seq);
  };

  const alertModal = (text, title = '', okCallback = () => {}) => {
    const params = {
      type: 'alert',
      title,
      content: text,
      okCallback,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const exitandroid = () => {
    dispatch(setAlertVisible(false));
    if (utils.isAndroid) {
      BackHandler.exitApp();
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.wesop.cuhr',
      );
    } else {
      Linking.openURL(
        'https://apps.apple.com/kr/app/%ED%87%B4%EA%B7%BC%ED%95%B4%EC%94%A8%EC%9C%A0-%EC%9A%B0%EB%A6%AC%EB%A7%A4%EC%9E%A5-%ED%95%84%EC%88%98%ED%92%88/id1503486454',
      );
    }
  };

  const goWork = async () => {
    setIsScanned(false);
    setWorkingModalOpen(false);
    dispatch(setSplashVisible(true));

    const callback = async () => {
      if (modalRef && !modalRef.current.isVisible) {
        try {
          const {data} = await api.attendanceWork({
            STORE_ID: QR,
            LAT: lat,
            LONG: long,
            MEMBER_SEQ: MEMBER_SEQ,
            TYPE: 'qr',
          });
          if (data.message === 'CONTRACT_END') {
            alertModal('정확한 사업장 QR코드가 아닙니다');
          } else if (data.message === 'WORK_ON_SUCCESS') {
            alertModal('QR코드 출근처리를 완료했습니다');
          } else if (data.message === 'SCHEDULE_EMPTY') {
            alertModal('오늘은 근무일이 아닙니다');
          } else if (data.message === 'SCHEDULE_EXIST') {
            alertModal('이미 출근처리를 완료했습니다');
          } else if (data.message === 'ALREADY_SUCCESS') {
            alertModal('이미 출근처리를 완료했습니다');
          } else if (data.message === 'FAIL') {
            alertModal(data.result);
          } else {
            alertModal(data.result);
          }
        } catch (error) {
          console.log(error);
        }

        dispatch(setSplashVisible(false));

        if (modalInterval) {
          clearInterval(modalInterval);
          modalInterval = null;
        }
      }
    };
    if (!modalInterval) {
      modalInterval = setTimeout(callback, 500);
    }
  };

  const leaveWork = async (a) => {
    setIsScanned(false);
    setWorkingModalOpen(false);
    dispatch(setSplashVisible(true));

    const callback = async () => {
      if (modalRef && !modalRef.current.isVisible) {
        try {
          const {data} = await api.attendanceOffWork({
            STORE_ID: QR,
            LAT: lat,
            LONG: long,
            MEMBER_SEQ: MEMBER_SEQ,
            TYPE: 'qr',
          });
          if (data.message == 'CONTRACT_END') {
            alertModal('정확한 사업장 QR코드가 아닙니다');
          } else if (data.message == 'FAIL') {
            alertModal(data.result);
          } else if (data.message == 'SCHEDULE_EMPTY') {
            alertModal('일하는 시간이 아닙니다.');
          } else if (data.message == 'ALREADY_SUCCESS') {
            alertModal('이미 퇴근하였습니다.');
          } else if (data.message == 'WORK_OFF_SUCCESS') {
            alertModal('퇴근하였습니다.');
          } else if (data.message == 'NOWORK') {
            alertModal('출근기록이 없습니다.');
          }
        } catch (error) {
          console.log(error);
        }
        dispatch(setSplashVisible(false));
        if (modalInterval) {
          clearInterval(modalInterval);
          modalInterval = null;
        }
      }
    };
    if (!modalInterval) {
      modalInterval = setTimeout(callback, 500);
    }
  };

  const checkVersion = async () => {
    try {
      const {data} = await api.checkApp({
        VERSION: appVersion,
        PLATFORM: platform,
      });
      if (data.RESULT_CODE == '1') {
        alertModal(
          '[ 업데이트 알림 ]',
          '새로운 버전이 출시되었습니다. 업데이트를 진행해주세요.\n\n* 이동 후 업데이트 버튼이 없는 경우에는 앱스토어 종료 후 다시 실행해 주세요.',
          () => {
            exitandroid();
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setStoreEmpSeqFn = (Emp) => {
    dispatch(setStoreEmpSeq(Emp));
  };
  const setStoreFn = (step) => {
    console.log('stepstepstepstepstepstepstepstepstepstepstepstep', step);
    dispatch(setStore(step));
  };
  const setStoreNameFn = (STORE_NAME) => {
    dispatch(setStoreName(STORE_NAME));
  };
  const setCalendarDataFn = (data) => {
    dispatch(setCalendarData(data));
  };
  const setCheckListDataFn = (data) => {
    dispatch(setCheckListData(data));
  };

  const addStore = () => {
    navigation.navigate('AddStoreScreen', {fetchData});
  };

  const fetchData = async () => {
    try {
      const {data} = await api.storeList(MEMBER_SEQ, STORE);
      // dispatch(setHomeCard(data.result));
      setStoreState(data.result);
      setMyStore(data.result);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    setJoinModalOpen(false);
    try {
      const {data} = await api.requestJoin({
        STORE_SEQ: storeSEQ,
        MEMBER_SEQ,
        NAME,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkData = async () => {
    setWorkingModalOpen(false);
    setIsScanned(false);
    setBarcodeModalOpen(false);
    try {
      const {data} = await api.checkList({
        STORE_ID: QR,
        LAT: lat,
        LONG: long,
      });
      if (data.message == 'SUCCESS') {
        if (data.result.length > 0) {
          var checkID = data.result[0].CHECK_SEQ;
          var csID = data.result[0].CS_SEQ;
          var checkpoint = data.result[0].TITLE;
          var checklist = data.result[0].LIST;
          var checktime = data.result[0].END_TIME;
          var check = data.result[0].CHECK_LIST;
          var checkEMP = data.result[0].EMP_NAME;
          var checkEMPTime = data.result[0].CHECK_TIME;
          var memo = data.result[0].CHCEK_TITLE;
          var scan = '1';
          if (check == undefined) {
            check = null;
          }
          navigation.navigate('ChecklistSpecificationScreen', {
            checkID,
            csID,
            checkpoint,
            checklist,
            checktime,
            check,
            checkEMP,
            checkEMPTime,
            memo,
            scan,
            register: false,
            refresh: () => onRefresh(),
          });
        } else {
          alertModal('qr error');
        }
      } else if (data.message == 'SCHEDULE_EXIST') {
        alertModal(data.result);
      } else {
        alertModal(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBarCodeScanned = ({type, data}) => {
    if (isNaN(data)) {
      setBarcodeModalOpen(false);
      setTimeout(() => {
        alertModal('정확한 사업장 QR코드가 아닙니다');
      }, 400);
    }
    if (STORE_SEQ != data) {
      setBarcodeModalOpen(false);
      setTimeout(() => {
        alertModal('정확한 사업장 QR코드가 아닙니다');
      }, 400);
    }
    let scandata = data.split('-');
    setIsScanned(true);
    setBarcodeModalOpen(false);
    setTimeout(() => {
      if (scandata.length == 2) {
        checkData();
      } else {
        setWorkingModalOpen(true);
      }
    }, 500);
  };

  useEffect(() => {
    if (HomeCard !== undefined && Object.keys(HomeCard).length != 0) {
      setStore(HomeCard);
    }
    fetchData();
    dispatch(setSplashVisible(false));
    if (utils.isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('ios');
    }
    setAppVersion('1.3.6');
    checkVersion();
  }, []);

  useEffect(() => {
    return () => {
      if (modalInterval) {
        clearInterval(modalInterval);
        modalInterval = null;
      }
    };
  });

  return (
    <SelectStoreScreenPresenter
      STORE={STORE}
      storeState={storeState}
      myStore={myStore}
      search={search}
      refreshing={refreshing}
      onRefresh={onRefresh}
      addStore={addStore}
      storeName={storeName}
      openModal={openModal}
      setStoreEmpSeqFn={setStoreEmpSeqFn}
      setStoreFn={setStoreFn}
      setStoreNameFn={setStoreNameFn}
      setCalendarDataFn={setCalendarDataFn}
      setCheckListDataFn={setCheckListDataFn}
      calendarData={calendarData}
      checkListData={checkListData}
      modalRef={modalRef}
      workingModalOpen={workingModalOpen}
      setWorkingModalOpen={setWorkingModalOpen}
      goWork={goWork}
      leaveWork={leaveWork}
      barcodeModalOpen={barcodeModalOpen}
      hasCameraPermission={hasCameraPermission}
      handleBarCodeScanned={handleBarCodeScanned}
      setBarcodeModalOpen={setBarcodeModalOpen}
      joinModalOpen={joinModalOpen}
      setJoinModalOpen={setJoinModalOpen}
      submit={submit}
      setName={setName}
      setAddress={setAddress}
      alertModal={alertModal}
    />
  );
};
