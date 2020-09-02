import React, {useEffect, useState, useRef} from 'react';
import {Linking, BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HomeScreenPresenter from './HomeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {
  setSTORE_DATA,
  setEMP_SEQ,
  setSTOREPAY_SHOW,
  setIS_MANAGER,
} from '../../../../redux/storeSlice';
import utils from '../../../../constants/utils';
import api from '../../../../constants/LoggedInApi';

let modalInterval;

export default ({route: {params}}) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const {STORE_SEQ, STORE, STORE_NAME, WORKING_COUNT, TOTAL_COUNT} = params;
  const {MEMBER_SEQ, MEMBER_NAME} = useSelector(
    (state: any) => state.userReducer,
  );
  const {STORE_DATA} = useSelector((state: any) => state.storeReducer);

  const [appVersion, setAppVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [pictureModalOpen, setPictureModalOpen] = useState<boolean>(false);
  const [barcodeModalOpen, setBarcodeModalOpen] = useState<boolean>(false);
  const [workingModalOpen, setWorkingModalOpen] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(
    false,
  );
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [QR, setQR] = useState<string>('');
  const [notice, setNotice] = useState<{}>({
    CU_NOTICE_SEQ: '',
    TITLE: '',
    CONTENTS: '',
  });
  const [invitedEmpCount, setInvitedEmpCount] = useState<number>(0);
  const [checklistCount, setChecklistCount] = useState<number>(0);
  const [noticeCount, setNoticeCount] = useState<number>(0);

  const alertModal = (title, text, okCallback = () => {}) => {
    const params = {
      alertType: 'alert',
      title,
      content: text,
      okCallback,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // VERSION
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

  // EXIT
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

  // QR 퇴근하기
  const goWork = async () => {
    setIsScanned(false);
    setWorkingModalOpen(false);
    const callback = async () => {
      if (modalRef && !modalRef.current.isVisible) {
        try {
          dispatch(setSplashVisible(true));
          const {data} = await api.attendanceWork({
            STORE_ID: QR,
            LAT: lat,
            LONG: long,
            MEMBER_SEQ,
            TYPE: 'qr',
          });
          if (data.message === 'CONTRACT_END') {
            alertModal('', '정확한 사업장 QR코드가 아닙니다');
          } else if (data.message === 'WORK_ON_SUCCESS') {
            if (data.resultCode == '2') {
              alertModal('', '출근하였습니다');
            } else {
              alertModal('', '출근하였습니다');
            }
          } else if (data.message === 'SCHEDULE_EMPTY') {
            alertModal('', '오늘은 근무일이 아닙니다');
          } else if (data.message === 'SCHEDULE_EXIST') {
            alertModal('', '이미 출근처리를 완료했습니다');
          } else if (data.message === 'ALREADY_SUCCESS') {
            alertModal('', '이미 출근처리를 완료했습니다');
          } else if (data.message === 'FAIL') {
            alertModal('', data.result);
          } else {
            alertModal('', data.result);
          }
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setSplashVisible(false));
        }
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

  // QR 퇴근하기
  const leaveWork = async (a) => {
    setIsScanned(false);
    setWorkingModalOpen(false);
    const callback = async () => {
      if (modalRef && !modalRef.current.isVisible) {
        try {
          dispatch(setSplashVisible(true));
          const {data} = await api.attendanceOffWork({
            STORE_ID: QR,
            LAT: lat,
            LONG: long,
            MEMBER_SEQ,
            TYPE: 'qr',
          });
          if (data.message == 'CONTRACT_END') {
            alertModal('', '정확한 사업장 QR코드가 아닙니다');
          } else if (data.message == 'FAIL') {
            alertModal('', data.result);
          } else if (data.message == 'SCHEDULE_EMPTY') {
            alertModal('', '일하는 시간이 아닙니다.');
          } else if (data.message == 'ALREADY_SUCCESS') {
            alertModal('', '이미 퇴근하였습니다.');
          } else if (data.message == 'WORK_OFF_SUCCESS') {
            alertModal('', '퇴근하였습니다.');
          } else if (data.message == 'NOWORK') {
            alertModal('', '출근기록이 없습니다.');
          }
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setSplashVisible(false));
        }
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

  // QR 스캔
  const handleBarCodeScanned = ({type, data}) => {
    if (isNaN(data)) {
      setBarcodeModalOpen(false);
      setTimeout(() => {
        alertModal('', '정확한 사업장 QR코드가 아닙니다');
      }, 400);
    }
    if (STORE_SEQ != data) {
      setBarcodeModalOpen(false);
      setTimeout(() => {
        alertModal('', '정확한 사업장 QR코드가 아닙니다');
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

  const fetchData = async () => {
    setWorkingModalOpen(false);
    try {
      if (!STORE_DATA) {
        dispatch(setSplashVisible(true));
      }
      const {data} = await api.getStoreInfo({
        STORE,
        MEMBER_SEQ,
        STORE_SEQ,
      });
      console.log('******************', data);
      if (data.resultmsg === '1') {
        dispatch(setSTORE_DATA(data));
        dispatch(setEMP_SEQ(data.EMP_SEQ));
        dispatch(setSTOREPAY_SHOW(data.STOREPAY_SHOW));
        dispatch(setIS_MANAGER(data.IS_MANAGER));
        setQR(data.resultdata.QR);
        setNotice(data.notice);
        setInvitedEmpCount(data.inviteemp);
        setChecklistCount(data.checklength);
        setNoticeCount(data.noticelength);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData();
    if (utils.isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('ios');
    }
    setAppVersion('1.3.7');
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
      STORE_DATA={STORE_DATA}
      MEMBER_NAME={MEMBER_NAME}
      STORE={STORE}
      STORE_NAME={STORE_NAME}
      TOTAL_COUNT={TOTAL_COUNT}
      WORKING_COUNT={WORKING_COUNT}
      hasCameraPermission={hasCameraPermission}
      barcodeModalOpen={barcodeModalOpen}
      setBarcodeModalOpen={setBarcodeModalOpen}
      pictureModalOpen={pictureModalOpen}
      setShowPictureModal={setShowPictureModal}
      showPictureModal={showPictureModal}
      setPictureModalOpen={setPictureModalOpen}
      workingModalOpen={workingModalOpen}
      setWorkingModalOpen={setWorkingModalOpen}
      modalRef={modalRef}
      goWork={goWork}
      leaveWork={leaveWork}
      handleBarCodeScanned={handleBarCodeScanned}
      checkPermissions={checkPermissions}
      invitedEmpCount={invitedEmpCount}
      checklistCount={checklistCount}
      noticeCount={noticeCount}
      QR={QR}
    />
  );
};
