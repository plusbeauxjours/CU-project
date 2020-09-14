import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import EmployeeScheduleAddScreenPresenter from './EmployeeScheduleAddScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import {useNavigation} from '@react-navigation/native';

const constant = {
  WORK_TYPE: {
    FIX: 'fix',
    FREE: 'free',
  },
  COLOR: [
    '#0D4F8A',
    '#ED8F52',
    '#FEBF40',
    '#5CAD6F',
    '#984B19',
    '#CB8DB1',
    '#FEBF40',
  ],
};

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {type: TYPE, EMP_SEQ} = params;
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false); // INSERT 또는 UPDATE 상태값
  const [timeList, setTimeList] = useState<any>(params?.timeList || []); // 저장된 근무 시간 목록
  const [startDate, setStartDate] = useState<string>(
    params?.startDate || moment().format('YYYY-MM-DD'),
  ); // 근무 시작일
  const [endDate, setEndDate] = useState<string>(params?.endDate || null); // 근무 종료일

  const [startTime, setStartTime] = useState<any>(null); // 화면에서 선택된 출근시간
  const [endTime, setEndTime] = useState<any>(null); // 화면에서 선택된 퇴근시간
  const [timeListIndex, setTimeListIndex] = useState<any>(0); // 저장된 근무 시간 목록 중 선택된 항목의 인덱스
  const [isHourModalVisible, setIsHourModalVisible] = useState<boolean>(false); // 시간/분 입력 모달 활성화 여부
  const [hourModalType, setHourModalType] = useState<any>(null); // 모달의 종류 (start: 출근시간, end: 퇴근시간)
  const [originalDayList, setOriginalDayList] = useState<any>([]); // dayList 원본 값
  const [dayList, setDayList] = useState<any>([]); // 일요일 ~ 토요일까지 화면에 보여질 요일 배열
  const [hour, setHour] = useState<any>(null); // 화면에 선택된 시간
  const [hourList, setHourList] = useState<any>([]); // 화면에 보여지는 시간 테이블
  const [minute, setMinute] = useState<any>(null); // 화면에 선택된 분
  const [minuteList, setMinuteList] = useState<any>([]); // 화면에 보여지는 분 테이블
  const [isMinuteInputFocused, setIsMinuteInputFocused] = useState<boolean>(
    false,
  ); // 분 직접 입력 포커싱 여부
  const [calendarModalType, setCalendarModalType] = useState<string>(null); // 캘린더 모달 종류 (start: 근무 시작일, end: 근무 종료일)
  const [checkNoEndDate, setCheckNoEndDate] = useState<boolean>(
    params?.endDate ? false : true,
  ); // 일정 종료일 없음 체크
  const [deleteList, setDeleteList] = useState<any>([]); // 삭제 대상 목록
  const [isStartDayModalVisible, setIsStartDayModalVisible] = useState<boolean>(
    false,
  );
  const [isEndDayModalVisible, setIsEndDayModalVisible] = useState<boolean>(
    false,
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

  const explainModal = (text) => {
    const params = {
      alertType: 'explain',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const selectDateFn = (date) => {
    let markedDates = {};
    markedDates[date.dateString] = {
      selected: true,
      selectedColor: '#642A8C',
    };
    if (calendarModalType === 'start') {
      setStartDate(date.dateString);
    } else {
      setEndDate(date.dateString);
    }
  };

  // STEP1 출퇴근 시,분 타입변환
  const numberFormatPadding = (num) => {
    const _num = Number(num);
    if (_num < 10) {
      return `0${_num}`;
    }
    return _num.toString();
  };

  // STEP2 출퇴근 요일 선택 추가하기 버튼
  const checkAddTimeFn = () => {
    let validDay = false;
    for (const day of dayList) {
      if (day.isChecked) {
        validDay = true;
        break;
      }
    }
    if (!startTime || !endTime) {
      alertModal('출퇴근 시간을 입력해주세요');
    } else if (!validDay) {
      alertModal('출퇴근 요일을 선택해주세요');
    } else {
      // 상단 폼 영역부터 초기화
      setStartTime(null);
      setEndTime(null);
      setDayList(JSON.parse(JSON.stringify(originalDayList)));
      setTimeListIndex(timeList.length);
      // 중간에 삭제되는 경우 다음 추가에 대한 컬러 인덱스 우선권 부여
      const colorIndex =
        timeList.length <= constant.COLOR.length ? timeList.length : 0;
      timeList.push({
        startTime,
        endTime,
        dayList,
        color: constant.COLOR[colorIndex],
      });
    }
  };

  // 모달 시,분 선택 후 확인버튼
  const setTimeFn = () => {
    setIsHourModalVisible(false);
    let houred = hour;
    let minuted = minute;

    if (hour === null) {
      return alertModal('시간을 선택해주세요.');
    } else if (minute === null) {
      return alertModal('분을 선택해주세요.');
    } else if (minute < 0 || minute > 60) {
      return alertModal('분은 0 ~ 60 사이의 수를 적어주세요.');
    } else {
      houred = numberFormatPadding(houred);
      minuted = numberFormatPadding(minuted);
      const time = `${hour}:${minute}`;
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

  // STEP3 출퇴근 시간 삭제
  const removeTimeFn = (index) => {
    let timeListed = timeList;
    timeListed.splice(index, 1);
    for (let i = 0; i < timeListed.length; i++) {
      const color = constant.COLOR[i];
      if (color) {
        timeListed[i].color = color;
      }
    }
    setTimeListIndex(0);
    setTimeList(timeListed);
  };

  // STEP3 출퇴근 시간 삭제
  const removeDayFn = (day) => {
    let count = 0;
    let index = -1;
    for (let i = 0; i < timeList.length; i++) {
      const time = timeList[i];

      for (const innerDay of time.dayList) {
        if (innerDay.isChecked && day.day === innerDay.day) {
          index = i;
          innerDay.isChecked = false;
          innerDay.EMP_SCH_SEQ = null;
        }
      }
    }
    if (index > -1) {
      for (const innerDay of timeList[index].dayList) {
        if (innerDay.isChecked) {
          count++;
        }
      }
    }
    if (count === 0 && index > -1) {
      removeTimeFn(index);
    }
  };

  // 추가 완료 & 수정 완료
  const submitFn = async () => {
    if (!startDate || (!checkNoEndDate && !endDate)) {
      return alertModal('일정 기간을 입력해주세요');
    }
    try {
      dispatch(setSplashVisible(true));
      const params = {
        EMP_SEQ,
        START: startDate,
        END: endDate,
        empSchedules: [],
      };
      for (const time of timeList) {
        for (const day of time.dayList) {
          if (day.isChecked) {
            params.empSchedules.push({
              EMP_SCH_SEQ: -1,
              JE_SEQ: -1,
              EMP_SEQ,
              DAY: day.day,
              ATTENDANCE_TIME: time.startTime,
              WORK_OFF_TIME: time.endTime,
              USE_FLAG: 1,
              START: startDate,
              END: endDate,
            });
          }
        }
      }
      if (isUpdateMode) {
        const {data} = await api.updateEmpSchedule({DEL: deleteList});
        if (data.message !== 'SUCCESS') {
          alertModal(data.result);
        }
      }
      const {data} = await api.insertEmpSchedule(params);
      if (data.message === 'SUCCESS') {
        alertModal('일정이 ' + TYPE + '되었습니다.');
      } else {
        alertModal(data.result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      params?.fetchData();
      navigation.goBack();
      dispatch(setSplashVisible(false));
    }
  };
  const initialize = () => {
    const hourListed = Array.apply(null, Array(24)).map(
      (_, index) => index + 0,
    );
    const minuteListed = Array.apply(null, Array(6)).map(
      (_, index) => index * 10,
    );
    const dayListed = [
      {day: 0, text: '일', isChecked: false, EMP_SCH_SEQ: null},
      {day: 1, text: '월', isChecked: false, EMP_SCH_SEQ: null},
      {day: 2, text: '화', isChecked: false, EMP_SCH_SEQ: null},
      {day: 3, text: '수', isChecked: false, EMP_SCH_SEQ: null},
      {day: 4, text: '목', isChecked: false, EMP_SCH_SEQ: null},
      {day: 5, text: '금', isChecked: false, EMP_SCH_SEQ: null},
      {day: 6, text: '토', isChecked: false, EMP_SCH_SEQ: null},
    ];

    let timeListed = [];

    if (params) {
      if (params?.timeList) {
        timeListed = JSON.parse(JSON.stringify(params?.timeList));
      }
    }
    setDayList(dayListed);
    setHourList(hourListed);
    setMinuteList(minuteListed);
    setOriginalDayList(JSON.parse(JSON.stringify(dayListed)));

    // 수정이면 값 세팅
    if (timeListed && timeListed.length > 0) {
      const deleteListed = [];
      for (const time of timeListed) {
        for (const day of time.dayList) {
          if (day.EMP_SCH_SEQ) {
            deleteListed.push(day.EMP_SCH_SEQ);
          }
        }
      }
      setIsUpdateMode(true);
      setTimeList(timeListed);
      setDeleteList(deleteListed);
      setCalendarModalType('start');
      selectDateFn({dateString: startDate});
      if (endDate) {
        setCalendarModalType('end');
        selectDateFn({dateString: endDate});
      }
    }
  };

  // STEP2 요일을 눌렀을 때 toggle isChecked
  const onDayPress = (index) => {
    let dayListed = dayList;
    dayListed[index].isChecked = !dayList[index].isChecked;
    setDayList(dayListed);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <EmployeeScheduleAddScreenPresenter
      timeList={timeList}
      timeListIndex={timeListIndex}
      setTimeListIndex={setTimeListIndex}
      originalDayList={originalDayList}
      removeDayFn={removeDayFn}
      dayList={dayList}
      setDayList={setDayList}
      startTime={startTime}
      endTime={endTime}
      alertModal={alertModal}
      hourList={hourList}
      numberFormatPadding={numberFormatPadding}
      hour={hour}
      setHour={setHour}
      minuteList={minuteList}
      minute={minute}
      setMinute={setMinute}
      isMinuteInputFocused={isMinuteInputFocused}
      setIsMinuteInputFocused={setIsMinuteInputFocused}
      isHourModalVisible={isHourModalVisible}
      setIsHourModalVisible={setIsHourModalVisible}
      submitFn={submitFn}
      TYPE={TYPE}
      checkAddTimeFn={checkAddTimeFn}
      explainModal={explainModal}
      startDate={startDate}
      setStartDate={setStartDate}
      isStartDayModalVisible={isStartDayModalVisible}
      setIsStartDayModalVisible={setIsStartDayModalVisible}
      endDate={endDate}
      setEndDate={setEndDate}
      isEndDayModalVisible={isEndDayModalVisible}
      setIsEndDayModalVisible={setIsEndDayModalVisible}
      setCheckNoEndDate={setCheckNoEndDate}
      checkNoEndDate={checkNoEndDate}
      setHourModalType={setHourModalType}
      setTimeFn={setTimeFn}
      onDayPress={onDayPress}
      removeTimeFn={removeTimeFn}
    />
  );
};
