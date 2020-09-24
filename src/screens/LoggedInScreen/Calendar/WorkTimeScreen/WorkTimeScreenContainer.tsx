import React, {useState, useEffect} from 'react';
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

  const [stepFourClick, setStepFourClick] = useState<boolean>(false);
  const [incentiveCheck, setIncentiveCheck] = useState<
    [boolean, boolean, boolean]
  >([true, false, false]); // [기본급 적용(1배), 야간근무수당 적용(1.5배), 야간근무수당 적용(2배)]

  const [hour, setHour] = useState<any>(null); // 화면에 선택된 시간
  const [hourList, setHourList] = useState<any>([]); // 화면에 보여지는 시간 테이블
  const [minute, setMinute] = useState<any>(null); // 화면에 선택된 분
  const [minuteList, setMinuteList] = useState<any>([]); // 화면에 보여지는 분 테이블
  const [isMinuteInputFocused, setIsMinuteInputFocused] = useState<boolean>(
    false,
  ); // 분 직접 입력 포커싱 여부
  const [hourModalType, setHourModalType] = useState<any>(null); // 모달의 종류 (start: 출근시간, end: 퇴근시간)
  const [isHourModalVisible, setIsHourModalVisible] = useState<boolean>(false); // 시간/분 입력 모달 활성화 여부
  const [startTime, setStartTime] = useState<string>(
    ATTENDANCE_TIME?.substring(0, 5) ??
      UPDATED_START?.substring(0, 5) ??
      START?.substring(0, 5),
  );
  const [endTime, setEndTime] = useState<string>(
    WORK_OFF_TIME?.substring(0, 5) ??
      UPDATED_END?.substring(0, 5) ??
      END?.substring(0, 5),
  );

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // STEP1 출퇴근 시,분 타입변환
  const numberFormatPadding = (num) => {
    const _num = Number(num);
    if (_num < 10) {
      return `0${_num}`;
    }
    return _num.toString();
  };

  // 모달 시,분 선택 후 확인버튼
  const setTimeFn = () => {
    if (minute < 0 || minute > 60) {
      alertModal('분은 0 ~ 60 사이의 수를 적어주세요.');
    } else {
      let houred = hour;
      let minuted = minute;

      houred = numberFormatPadding(houred);
      minuted = numberFormatPadding(minuted);
      const time = `${houred}:${minuted}`;
      setIsHourModalVisible(false);
      setHour(null);
      setMinute(null);
      setIsMinuteInputFocused(false);
      if (hourModalType === 'start') {
        setStartTime(time);
      } else {
        setEndTime(time);
      }
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

  const initialize = () => {
    const hourListed = Array.apply(null, Array(24)).map(
      (_, index) => index + 0,
    );
    const minuteListed = Array.apply(null, Array(6)).map(
      (_, index) => index * 10,
    );
    setHourList(hourListed);
    setMinuteList(minuteListed);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <WorkTimeScreenPresenter
      startTime={startTime}
      endTime={endTime}
      stepFourClick={stepFourClick}
      setStepFourClick={setStepFourClick}
      incentiveCheck={incentiveCheck}
      setIncentiveCheck={setIncentiveCheck}
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
      setHour={setHour}
      setMinute={setMinute}
      setIsMinuteInputFocused={setIsMinuteInputFocused}
      isHourModalVisible={isHourModalVisible}
      setIsHourModalVisible={setIsHourModalVisible}
      setHourModalType={setHourModalType}
      hourList={hourList}
      numberFormatPadding={numberFormatPadding}
      hour={hour}
      minute={minute}
      minuteList={minuteList}
      isMinuteInputFocused={isMinuteInputFocused}
      setTimeFn={setTimeFn}
    />
  );
};
