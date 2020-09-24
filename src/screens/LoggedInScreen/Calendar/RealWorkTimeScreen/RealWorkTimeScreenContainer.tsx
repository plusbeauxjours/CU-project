import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import RealWorkTimeScreenPresenter from './RealWorkTimeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {updateSCHEDULE} from '~/redux/calendarSlice';
import api from '~/constants/LoggedInApi';

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
    } = {},
    date,
  } = params;

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

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
        const {data} = await api.createSchedule({
          STORE_ID: STORE_SEQ,
          EMP_ID,
          EMP_NAME: NAME,
          START:
            startTime == '00:00'
              ? null
              : startTime == '미출근'
              ? '-1'
              : startTime,
          END: endTime == '00:00' ? null : endTime == '미퇴근' ? '-1' : endTime,
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
      }
    } else {
      try {
        navigation.goBack(); // 뒤로
        alertModal('출퇴근 시간이 변경되었습니다.');
        dispatch(
          updateSCHEDULE({
            date,
            EMP_ID,
            START_TIME,
            END_TIME,
            UPDATED_START: startTime,
            UPDATED_END: endTime,
          }),
        );
        await api.updateSchedule({
          SCH_ID,
          EMP_ID,
          START:
            startTime == '00:00'
              ? null
              : startTime == '미출근'
              ? '-1'
              : startTime,
          END: endTime == '00:00' ? null : endTime == '미퇴근' ? '-1' : endTime,
          TYPE: '0',
          STATUS: '0',
          STYPE: '',
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const nomalTimeFn = (type) => {
    const workStart = (ATTENDANCE_TIME || CHANGE_START || START).substring(
      0,
      5,
    );
    const workEnd = (WORK_OFF_TIME || CHANGE_END || END).substring(0, 5);
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
    <RealWorkTimeScreenPresenter
      startTime={startTime}
      endTime={endTime}
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
      nomalTimeFn={nomalTimeFn}
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
