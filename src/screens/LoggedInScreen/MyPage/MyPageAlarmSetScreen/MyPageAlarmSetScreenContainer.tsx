import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import MyPageAlarmSetScreenPresenter from './MyPageAlarmSetScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';

export default () => {
  const dispatche = useDispatch();
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [allPush, setAllPush] = useState<boolean>(false); //전체
  const [workPush, setWorkPush] = useState<boolean>(false); //출퇴근
  const [checkPush, setCheckPush] = useState<boolean>(false); //체크리스트
  const [checksharePush, setChecksharePush] = useState<boolean>(false); //업무일지
  const [shelfPush, setShelfPush] = useState<boolean>(false); //유통기한
  const [healthPush, setHealthPush] = useState<boolean>(false); //조기경보
  const [scedulePush, setScedulePUsh] = useState<boolean>(false); //근무일정

  const toggleAlarm = (value) => {
    switch (value) {
      case 'allPush':
        return setAllPush(!allPush);
      case 'workPush':
        return setWorkPush(!workPush);
      case 'checkPush':
        return setCheckPush(!checkPush);
      case 'checksharePush':
        return setChecksharePush(!checksharePush);
      case 'shelfPush':
        return setShelfPush(!shelfPush);
      case 'healthPush':
        return setHealthPush(!healthPush);
      case 'scedulePush':
        return setScedulePUsh(!scedulePush);
      default:
        break;
    }
  };

  const updateAlarm = async (value: boolean, alarm: string) => {
    const isAlarmOn = value == true ? 0 : 1;
    try {
      const {data} = await api.updatePush({
        MEMBER_SEQ,
        // [alarm]: isAlarmOn,
        CHECK_PUSH: false,
      });
      console.log('data on mypagealarmsetscreen', data);
    } catch (error) {
      console.log(error);
      alertModal('', '통신이 원활하지 않습니다.');
      toggleAlarm(value);
    }
  };

  const fetch = async () => {
    try {
      const {data} = await api.getPush({MEMBER_SEQ});
      setAllPush(data.All_Push == '1' ? true : false);
      setWorkPush(data.WORK_PUSH == '1' ? true : false);
      setCheckPush(data.CHECK_PUSH == '1' ? true : false);
      setChecksharePush(data.CHECKSHARE_PUSH == '1' ? true : false);
      setShelfPush(data.SHELF_PUSH == '1' ? true : false);
      setHealthPush(data.HEALTH_PUSH == '1' ? true : false);
      setScedulePUsh(data.SCHEDULE_PUSH == '1' ? true : false);
    } catch (error) {
      console.log(error);
    }
  };

  const alertModal = (title, text) => {
    const params = {
      type: 'alert',
      title: title,
      content: text,
    };
    dispatche(setAlertInfo(params));
    dispatche(setAlertVisible(true));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <MyPageAlarmSetScreenPresenter
      updateAlarm={updateAlarm}
      allPush={allPush}
      workPush={workPush}
      checkPush={checkPush}
      checksharePush={checksharePush}
      shelfPush={shelfPush}
      healthPush={healthPush}
      scedulePush={scedulePush}
      toggleAlarm={toggleAlarm}
    />
  );
};
