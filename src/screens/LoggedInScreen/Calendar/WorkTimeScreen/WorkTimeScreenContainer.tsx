import React, {useState} from 'react';
import WorkTimeScreenPresenter from './WorkTimeScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import api from '~/constants/LoggedInApi';
import {updateWORKTIME} from '~/redux/calendarSlice';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    data: {
      SCH_ID = null,
      EMP_ID = null,
      NAME = null,
      IMAGE = null,
      START = null,
      END = null,
      ATTENDANCE_TIME = null,
      WORK_OFF_TIME = null,
      CHANGE_START = null,
      CHANGE_END = null,
      START_TIME = null,
      END_TIME = null,
      UPDATED_START = null,
      UPDATED_END = null,
    },
    date,
  } = params;
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [isTimeCheckModalVisible, setIsTimeCheckModalVisible] = useState<
    boolean
  >(false);
  const [hourCheck, setHourCheck] = useState<any>(
    JSON.parse(JSON.stringify(new Array(24))),
  );
  const [minuteCheck, setMinuteCheck] = useState<
    [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
  >([false, false, false, false, false, false, false]); // [00분, 10분, 20분, 30분, 40분, 50분, 직접 입력]]
  const [minuteDirectInput, setMinuteDirectInput] = useState<any>(null);
  const [startTime, setStartTime] = useState<string>(
    params?.data?.CHANGE_START?.substring(0, 5) ??
      params?.data?.ATTENDANCE_TIME?.substring(0, 5) ??
      params?.data?.START?.substring(0, 5),
  );
  const [endTime, setEndTime] = useState<string>(
    params?.data?.CHANGE_END?.substring(0, 5) ??
      params?.data?.WORK_OFF_TIME?.substring(0, 5) ??
      params?.data?.END?.substring(0, 5),
  );
  const [timeSwitch, setTimeSwitch] = useState<any>(null); // startTime: 출근시간, endTime: 퇴근시간]= useState<>( startTime: 출근시간, endTime: 퇴근시)
  const [stepFourClick, setStepFourClick] = useState<boolean>(false);
  const [incentiveCheck, setIncentiveCheck] = useState<
    [boolean, boolean, boolean]
  >([true, false, false]); // [기본급 적용(1배), 야간근무수당 적용(1.5배), 야간근무수당 적용(2배)]

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const checkDirectInputFn = () => {
    let valueH = JSON.parse(JSON.stringify(hourCheck));
    let valueM = JSON.parse(JSON.stringify(minuteCheck));
    if (!hourCheck.includes(true)) {
      return alertModal('시간을 선택해주세요.');
    }
    if (!minuteCheck.includes(true)) {
      return alertModal('분을 선택해주세요.');
    }
    if (
      minuteCheck[6] === true &&
      (minuteDirectInput < 0 || minuteDirectInput > 60)
    ) {
      return; //alertModal('0 ~ 60 사이의 수를 적어주세요.');
    }
    let hour = hourCheck.indexOf(true) + 0;
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = '0';
    if (minuteCheck[6] === true) {
      minute = minuteDirectInput;
      if (Number(minute) < 10) {
        minute = `0${minute}`;
      }
    } else {
      minute = (minuteCheck.indexOf(true) * 10).toString();
      if (Number(minute) < 10) {
        minute = `0${minute}`;
      }
    }
    if (timeSwitch === 'start') {
      setIsTimeCheckModalVisible(false);
      setStartTime(`${hour}:${minute}`);
      setHourCheck(valueH);
      setMinuteCheck(valueM);
      setMinuteDirectInput('');
    } else {
      setIsTimeCheckModalVisible(false);
      setEndTime(`${hour}:${minute}`);
      setHourCheck(valueH);
      setMinuteCheck(valueM);
      setMinuteDirectInput('');
    }
  };

  const registerFn = async () => {
    if (!SCH_ID) {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.createSchedule({
          STORE_ID: STORE_SEQ,
          EMP_ID,
          EMP_NAME: NAME,
          START: startTime,
          END: endTime,
          DATE: date,
          TYPE: '1',
          SCHEDULETYPE: '0',
          CHANGE: '1',
        });
        if (data.message === 'SUCCESS' || data.message === 'ALREADY_SUCCESS') {
          navigation.goBack();
          alertModal('근무시간이 변경되었습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(
          updateWORKTIME({
            date,
            EMP_ID,
            START,
            END,
            CHANGE_START: startTime,
            CHANGE_END: endTime,
          }),
        );
        navigation.goBack();
        alertModal('근무시간이 변경되었습니다.');
        await api.updateSchedule({
          SCH_ID,
          EMP_ID,
          START: startTime,
          END: endTime,
          TYPE: '1',
          STATUS: '0',
          STYPE: '',
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <WorkTimeScreenPresenter
      hourCheck={hourCheck}
      minuteCheck={minuteCheck}
      minuteDirectInput={minuteDirectInput}
      setMinuteDirectInput={setMinuteDirectInput}
      setHourCheck={setHourCheck}
      setMinuteCheck={setMinuteCheck}
      checkDirectInputFn={checkDirectInputFn}
      isTimeCheckModalVisible={isTimeCheckModalVisible}
      setIsTimeCheckModalVisible={setIsTimeCheckModalVisible}
      setTimeSwitch={setTimeSwitch}
      startTime={startTime}
      endTime={endTime}
      stepFourClick={stepFourClick}
      setStepFourClick={setStepFourClick}
      incentiveCheck={incentiveCheck}
      setIncentiveCheck={setIncentiveCheck}
      IMAGE={IMAGE}
      NAME={NAME}
      START={START}
      END={END}
      ATTENDANCE_TIME={ATTENDANCE_TIME}
      WORK_OFF_TIME={WORK_OFF_TIME}
      CHANGE_START={CHANGE_START}
      CHANGE_END={CHANGE_END}
      START_TIME={START_TIME}
      END_TIME={END_TIME}
      UPDATED_START={UPDATED_START}
      UPDATED_END={UPDATED_END}
      registerFn={registerFn}
    />
  );
};
