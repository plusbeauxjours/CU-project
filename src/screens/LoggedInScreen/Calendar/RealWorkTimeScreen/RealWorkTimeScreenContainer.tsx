import React, {useState, useEffect} from 'react';
import RealWorkTimeScreenPresenter from './RealWorkTimeScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {data: DATA, date} = params;
  const {STORE_SEQ} = useSelector((state: any) => state.userReducer);

  const [isTimeCheckModalVisible, setIsTimeCheckModalVisible] = useState<
    boolean
  >(false);
  const [hourCheck, setHourCheck] = useState<any>(new Array(24));
  const [minuteCheck, setMinuteCheck] = useState<
    [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
  >([false, false, false, false, false, false, false]); // [00분, 10분, 20분, 30분, 40분, 50분, 직접 입력]]
  const [minuteDirectInput, setMinuteDirectInput] = useState<any>(null);
  const [startTime, setStartTime] = useState<string>(null);
  const [endTime, setEndTime] = useState<string>(null);
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
    var updateStart = startTime;

    if (updateStart == '00:00') {
      setStartTime(null);
    }
    if (updateStart == '미출근') {
      setStartTime('-1');
    }
    var updateEnd = endTime;
    if (updateEnd == '00:00') {
      setEndTime(null);
    }
    if (updateEnd == '미퇴근') {
      setEndTime('-1');
    }

    if (DATA.SCH_ID != undefined) {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.updateSchedule({
          SCH_ID: DATA.SCH_ID,
          EMP_ID: DATA.EMP_ID,
          START: updateStart,
          END: updateEnd,
          TYPE: '0',
          STATUS: '0',
          STYPE: '',
        });
        if (data.message === 'SUCCESS' || data.message === 'ALREADY_SUCCESS') {
          navigation.goBack(); // 뒤로
          alertModal('출퇴근 시간이 변경되었습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.updateSchedule({
          STORE_ID: STORE_SEQ,
          EMP_ID: DATA.EMP_ID,
          EMP_NAME: DATA.NAME,
          START: updateStart,
          END: updateEnd,
          DATE: date,
          TYPE: '0',
          SCHEDULETYPE: '0',
          CHANGE: '2',
        });
        if (data.message === 'SUCCESS' || data.message === 'ALREADY_SUCCESS') {
          navigation.goBack(); // 뒤로
          alertModal('출퇴근 시간이 변경되었습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  const nomalTimeFn = (type) => {
    const workStart = (
      DATA.ATTENDANCE_TIME ||
      DATA.CHANGE_START ||
      DATA.START
    ).substring(0, 5);
    const workEnd = (
      DATA.WORK_OFF_TIME ||
      DATA.CHANGE_END ||
      DATA.END
    ).substring(0, 5);

    if (type == 'start') {
      setStartTime(workStart);
    } else if (type == 'end') {
      setEndTime(workEnd);
    } else if (type == 'deleteStart') {
      setStartTime('미출근');
    } else if (type == 'deleteEnd') {
      setEndTime('미퇴근');
    }
  };

  const init = () => {
    const {
      CHANGE_START,
      CHANGE_END,
      ATTENDANCE_TIME,
      WORK_OFF_TIME,
      START,
      END,
    } = DATA;
    if (CHANGE_START) {
      setStartTime(CHANGE_START.substring(0, 5));
    } else {
      if (ATTENDANCE_TIME) {
        setStartTime(ATTENDANCE_TIME.substring(0, 5));
      } else {
        setStartTime(START.substring(0, 5));
      }
    }
    if (CHANGE_END) {
      setEndTime(CHANGE_END.substring(0, 5));
    } else {
      if (WORK_OFF_TIME) {
        setEndTime(WORK_OFF_TIME.substring(0, 5));
      } else {
        setEndTime(END.substring(0, 5));
      }
    }
  };

  useEffect(() => {
    setHourCheck(JSON.parse(JSON.stringify(hourCheck)));
    init();
  }, []);

  return (
    <RealWorkTimeScreenPresenter
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
      IMAGE={DATA.IMAGE}
      NAME={DATA.NAME}
      START={DATA.START}
      END={DATA.END}
      ATTENDANCE_TIME={DATA.ATTENDANCE_TIME}
      WORK_OFF_TIME={DATA.WORK_OFF_TIME}
      CHANGE_START={DATA.CHANGE_START}
      CHANGE_END={DATA.CHANGE_END}
      START_TIME={DATA.START_TIME}
      END_TIME={DATA.END_TIME}
      UPDATED_START={DATA.UPDATED_START}
      UPDATED_END={DATA.UPDATED_END}
      registerFn={registerFn}
      nomalTimeFn={nomalTimeFn}
    />
  );
};
