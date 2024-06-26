import React, {useEffect, useState} from 'react';
import {Linking, BackHandler, NativeModules} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HomeScreenPresenter from './HomeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {setSTORE_DATA, setEMP_SEQ} from '~/redux/storeSlice';
import utils from '~/constants/utils';
import api from '~/constants/LoggedInApi';
import {setNOTICE_COUNT} from '~/redux/checklistshareSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const SharedStorage = NativeModules.SharedStorage;
  const {STORE_SEQ, STORE, STORE_NAME, WORKING_COUNT, TOTAL_COUNT} = params;

  const {STORE_DATA} = useSelector((state: any) => state.storeReducer);
  const {MEMBER_SEQ, MEMBER_NAME, DEVICE_PLATFORM} = useSelector(
    (state: any) => state.userReducer,
  );
  const {NOTICE_COUNT} = useSelector(
    (state: any) => state.checklistshareReducer,
  );

  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
  const [workingModalOpen, setWorkingModalOpen] = useState<boolean>(false);

  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
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
        VERSION: utils.appVersion,
        PLATFORM: DEVICE_PLATFORM,
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
    } catch (e) {
      console.log(e);
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

  // QR 출근하기
  const goWorkFn = async () => {
    setWorkingModalOpen(false);
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.attendanceWork({
        STORE_ID: STORE_SEQ,
        LAT: lat,
        LONG: long,
        MEMBER_SEQ,
        TYPE: 'qr',
      });
      if (data.message === 'WORK_ON_SUCCESS') {
        alertModal('', data.resultmsg);
      } else if (data.message === 'FAIL') {
        alertModal('', data.resultmsg);
      } else if (data.message === 'SCHEDULE_EMPTY') {
        alertModal('', data.resultmsg);
      } else if (data.message === 'ALREADY_SUCCESS') {
        alertModal('', data.resultmsg);
      } else if (data.message === 'CONTRACT_END') {
        alertModal('', data.resultmsg);
      } else if (data.message === 'SCHEDULE_EXIST') {
        alertModal('', data.resultmsg);
      } else {
        alertModal('', data.resultmsg);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  // QR 퇴근하기
  const leaveWorkFn = async (a) => {
    setWorkingModalOpen(false);
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.attendanceOffWork({
        STORE_ID: STORE_SEQ,
        LAT: lat,
        LONG: long,
        MEMBER_SEQ,
        TYPE: 'qr',
      });
      if (data.message == 'WORK_OFF_SUCCESS') {
        alertModal('', data.resultmsg);
      } else if (data.message == 'FAIL') {
        alertModal('', data.resultmsg);
      } else if (data.message == 'SCHEDULE_EMPTY') {
        alertModal('', data.resultmsg);
      } else if (data.message == 'ALREADY_SUCCESS') {
        alertModal('', data.resultmsg);
      } else if (data.message == 'CONTRACT_END') {
        alertModal('', data.resultmsg);
      } else if (data.message == 'NOWORK') {
        alertModal('', data.resultmsg);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  // QR 스캔
  const handleBarCodeScanned = ({bounds}) => {
    if (isNaN(bounds.data)) {
      alertModal('', '정확한 사업장 QR코드가 아닙니다');
    }
    if (STORE_SEQ != bounds.data) {
      alertModal('', '정확한 사업장 QR코드가 아닙니다');
    } else {
      setWorkingModalOpen(true);
      setQrModalOpen(false);
    }
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
      if (data.resultmsg === '1') {
        dispatch(setSTORE_DATA(data));
        dispatch(setEMP_SEQ(data.EMP_SEQ));
        setQR(data.resultdata.QR);
        setNotice(data.notice);
        setInvitedEmpCount(data.inviteemp);
        setChecklistCount(data.checklength);
        dispatch(setNOTICE_COUNT(data.noticelength));
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    if (utils.isAndroid()) {
      STORE === '1'
        ? SharedStorage.set(
            JSON.stringify({
              WIDGET_TEXT: `${STORE_NAME}입니다. ${TOTAL_COUNT}명 중 ${WORKING_COUNT}명 근무중 입니다.`,
              WIDGET_STORE: STORE,
              WIDGET_STATUS: '2',
            }),
          )
        : SharedStorage.set(
            JSON.stringify({
              WIDGET_TEXT: `${STORE_NAME}입니다. 탭하하여 출근하세요.`,
              WIDGET_STORE: STORE,
              WIDGET_STATUS: '2',
            }),
          );
    }
    fetchData();
    checkVersion();
  }, []);

  return (
    <HomeScreenPresenter
      notice={notice}
      STORE_DATA={STORE_DATA}
      MEMBER_NAME={MEMBER_NAME}
      STORE={STORE}
      STORE_NAME={STORE_NAME}
      TOTAL_COUNT={TOTAL_COUNT}
      WORKING_COUNT={WORKING_COUNT}
      setShowPictureModal={setShowPictureModal}
      showPictureModal={showPictureModal}
      workingModalOpen={workingModalOpen}
      setWorkingModalOpen={setWorkingModalOpen}
      goWorkFn={goWorkFn}
      leaveWorkFn={leaveWorkFn}
      handleBarCodeScanned={handleBarCodeScanned}
      invitedEmpCount={invitedEmpCount}
      checklistCount={checklistCount}
      NOTICE_COUNT={NOTICE_COUNT}
      QR={QR}
      qrModalOpen={qrModalOpen}
      setQrModalOpen={setQrModalOpen}
    />
  );
};
