import React, {useEffect, useState, useRef} from 'react';
import {Linking, BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HomeScreenPresenter from './HomeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import utils from '../../../../constants/utils';
import api from '../../../../constants/LoggedInApi';

let modalInterval;

export default () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const {STORE, MEMBER_SEQ, STORE_SEQ, STORE_NAME, NAME} = useSelector(
    (state: any) => state.userReducer,
  );

  const [appVersion, setAppVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [store, setStore] = useState<{}>({});
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [pictureModalOpen, setPictureModalOpen] = useState<boolean>(false);
  const [barcodeModalOpen, setBarcodeModalOpen] = useState<boolean>(false);
  const [workingModalOpen, setWorkingModalOpen] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(
    false,
  );
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(true);
  const [allHelpTextView, setAllHelpTextView] = useState<boolean>(false);
  const [storeResult, setStoreResult] = useState<any>(null);
  const [QR, setQR] = useState<string>('');
  const [notice, setNotice] = useState<{}>({TITLE: '', CONTENTS: ''});
  const [EMPLOYEE, setEMPLOYEE] = useState<any>(null);
  const [WORKINGLIST, setWORKINGLIST] = useState<any>(null);

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

  const helpModal = (title, text) => {
    const params = {
      type: 'helpModal',
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

  const fetchData = async () => {
    setWorkingModalOpen(false);
    try {
      const {data} = await api.getstoreinfo({
        STORE,
        MEMBER_SEQ,
        STORE_SEQ,
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
      console.log(data);
      setStoreResult(data);
      setQR(data.resultdata.QR);
      setNotice(data.notice);
      setEMPLOYEE(data.emplist);
      setWORKINGLIST(data.workinglist);
    } catch (error) {
      console.log(error);
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
            if (data.resultCode == '2') {
              alertModal('출근하였습니다', data.resultMessage);
            } else {
              alertModal('출근하였습니다');
            }
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

  // 퇴근하기 api
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
    setIsScanned(true);
    setBarcodeModalOpen(false);
    setTimeout(() => {
      setWorkingModalOpen(true);
    }, 500);
  };

  const checkPermissions = async () => {
    // const {status} = await Camera.requestPermissionsAsync();
    // if (status !== 'granted') {
    //   alertModal(
    //     '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
    //   );
    //   return false;
    // } else {
    //   setHasCameraPermission(status === 'granted');
    // }
    return true;
  };

  useEffect(() => {
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
    <HomeScreenPresenter
      notice={notice}
      storeResult={storeResult}
      NAME={NAME}
      STORE={STORE}
      MEMBER_SEQ={MEMBER_SEQ}
      STORE_SEQ={STORE_SEQ}
      STORE_NAME={STORE_NAME}
      EMPLOYEE={EMPLOYEE}
      WORKINGLIST={WORKINGLIST}
      pictureModalOpen={pictureModalOpen}
      setPictureModalOpen={setPictureModalOpen}
      barcodeModalOpen={barcodeModalOpen}
      setBarcodeModalOpen={setBarcodeModalOpen}
      workingModalOpen={workingModalOpen}
      setWorkingModalOpen={setWorkingModalOpen}
      modalRef={modalRef}
      helpModal={helpModal}
      goWork={goWork}
      leaveWork={leaveWork}
      handleBarCodeScanned={handleBarCodeScanned}
      checkPermissions={checkPermissions}
    />
  );
};
