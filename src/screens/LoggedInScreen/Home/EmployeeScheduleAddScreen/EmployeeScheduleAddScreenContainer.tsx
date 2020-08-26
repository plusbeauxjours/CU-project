import React, {useState, useEffect} from 'react';
import EmployeeScheduleAddScreenPresenter from './EmployeeScheduleAddScreenPresenter';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setAlertInfo, setAlertVisible} from 'src/redux/alertSlice';
import moment from 'moment';
import {setSplashVisible} from 'src/redux/splashSlice';

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
  const navigate = useNavigation();
  const {type: TYPE, handler} = params;

  const [updateMode, setUpdateMode] = useState<boolean>(false); // INSERT 또는 UPDATE 상태값
  const [empSeq, setEmpSeq] = useState<any>(params?.EMP_SEQ || null); // 직원 번호
  const [workType, setWorkType] = useState<any>(params?.workTypeCheck || null); // 근무 유형 (fix: 일정이 있는 직원, free: 자율 출퇴근 직원)
  const [timeList, setTimeList] = useState<any>(params?.timeList || []); // 저장된 근무 시간 목록
  const [startDate, setStartDate] = useState<string>(
    params?.startDate || moment().format('YYYY-MM-DD'),
  ); // 근무 시작일
  const [endDate, setEndDate] = useState<string>(params?.endDate || ''); // 근무 종료일

  const [startTime, setStartTime] = useState<any>(null); // 화면에서 선택된 출근시간
  const [endTime, setEndTime] = useState<any>(null); // 화면에서 선택된 퇴근시간
  const [timeListIndex, setTimeListIndex] = useState<any>(null); // 저장된 근무 시간 목록 중 선택된 항목의 인덱스
  const [hourModalVisible, setHourModalVisible] = useState<boolean>(false); // 시간/분 입력 모달 활성화 여부
  const [hourModalType, setHourModalType] = useState<any>(null); // 모달의 종류 (start: 출근시간, end: 퇴근시간)
  const [originalDayList, setOriginalDayList] = useState<any>([]); // dayList 원본 값
  const [dayList, setDayList] = useState<any>([]); // 일요일 ~ 토요일까지 화면에 보여질 요일 배열
  const [hour, setHour] = useState<any>(null); // 화면에 선택된 시간
  const [hourList, setHourList] = useState<any>([]); // 화면에 보여지는 시간 테이블
  const [minute, setMinute] = useState<any>(null); // 화면에 선택된 분
  const [minuteList, setMinuteList] = useState<any>([]); // 화면에 보여지는 분 테이블
  const [minuteInputFocused, setMinuteInputFocused] = useState<boolean>(false); // 분 직접 입력 포커싱 여부
  const [workDayExpand, setWorkDayExpand] = useState<boolean>(false); // 최하단 출퇴근정보 입력 화면 활성화 여부
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState<boolean>(
    false,
  ); // 캘린더 모달 활성화 여부
  const [calendarModalType, setCalendarModalType] = useState<>(null); // 캘린더 모달 종류 (start: 근무 시작일, end: 근무 종료일)

  const [markedStartDate, setMarkedStartDate] = useState<>(null); // 캘린더에서 시작일 선택 마크
  const [markedEndDate, setMarkedEndDate] = useState<>(null); // 캘린더에서 종료일 선택 마크
  const [checkNoEndDate, setCheckNoEndDate] = useState<>(true); // 일정 종료일 없음 체크
  const [step3Visible, setStep3Visible] = useState<boolean>(false); // STEP 3 활성화 여부
  const [deleteList, setDeleteList] = useState<any>([]); // 삭제 대상 목록

  const alertModal = (text) => {
    const params = {
      type: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const explainModal = (title, text) => {
    const params = {
      type: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const selectDate = (date) => {
    let markedDates = {};
    markedDates[date.dateString] = {
      selected: true,
      selectedColor: '#642A8C',
    };
    if (calendarModalType === 'start') {
      setStartDate(date.dateString);
      setMarkedStartDate(markedDates);
    } else {
      setEndDate(date.dateString);
      setMarkedEndDate(markedDates);
    }
  };

  const numberFormatPadding = (num) => {
    const _num = Number(num);

    if (_num < 10) {
      return `0${_num}`;
    }

    return _num.toString();
  };

  const initialize = () => {
    const hourListed = Array.apply(null, Array(24)).map(
      (empty, index) => index + 0,
    ); // 1 ~ 24의 배열 생성
    const minuteListed = Array.apply(null, Array(6)).map(
      (empty, index) => index * 10,
    ); // 10 ~ 50의 배열 생성
    const dayListed = [
      {day: 0, text: '일', isChecked: false, EMP_SCH_SEQ: null},
      {day: 1, text: '월', isChecked: false, EMP_SCH_SEQ: null},
      {day: 2, text: '화', isChecked: false, EMP_SCH_SEQ: null},
      {day: 3, text: '수', isChecked: false, EMP_SCH_SEQ: null},
      {day: 4, text: '목', isChecked: false, EMP_SCH_SEQ: null},
      {day: 5, text: '금', isChecked: false, EMP_SCH_SEQ: null},
      {day: 6, text: '토', isChecked: false, EMP_SCH_SEQ: null},
    ];

    let workTypeed = constant.WORK_TYPE.FIX;
    let empSeqed = null;
    let timeListed = [];
    let startDateed = null;
    let endDateed = null;

    if (params) {
      workTypeed = params?.workTypeCheck;
      empSeqed = params?.EMP_SEQ;

      if (params?.timeList) {
        timeListed = JSON.parse(JSON.stringify(params?.timeList));
        startDateed = params?.startDate;
        endDateed = params?.endDate;
      }
    }
    setEmpSeq(empSeqed);
    setWorkType(workTypeed);
    setDayList(dayListed);
    setHourList(hourListed);
    setMinuteList(minuteListed);
    setOriginalDayList(JSON.parse(JSON.stringify(dayList)));

    /*
     * 수정이면 값 세팅
     */
    if (timeListed && timeListed.length > 0) {
      const deleteListed = [];
      for (const time of timeListed) {
        for (const day of time.dayList) {
          if (day.EMP_SCH_SEQ) {
            deleteListed.push(day.EMP_SCH_SEQ);
          }
        }
      }
      setUpdateMode(true);
      setTimeList(setTimeList);
      setDeleteList(deleteListed);
      setStartDate(startDateed);
      setEndDate(endDateed);
      setCheckNoEndDate(!endDate);
      setStep3Visible(true);
      setCalendarModalType('start');
      selectDate({dateString: startDate});

      if (endDate) {
        setCalendarModalType('end');
        selectDate({dateString: endDate});
      }
    }
  };

  const checkAddTime = () => {
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
      setStep3Visible(true);
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

  const setTime = () => {
    setHourModalVisible(false);
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
      setHourModalVisible(false);
      setHour(null);
      setMinute(null);
      setMinuteInputFocused(false);

      if (hourModalType === 'start') {
        setStartTime(time);
      } else {
        setEndTime(time);
      }
    }
  };

  const removeTime = (index) => {
    const timeListed = timeList;
    timeListed.splice(index, 1);
    for (let i = 0; i < timeListed.length; i++) {
      const color = constant.COLOR[i];
      if (color) {
        timeListed[i].color = color;
      }
    }
    setTimeList(timeListed);
    setTimeListIndex(null);
    if (timeList.length === 0) {
      setStep3Visible(false);
    }
  };

  const removeDay = (day) => {
    const timeListed = timeList;
    let count = 0;
    let index = -1;
    for (let i = 0; i < timeListed.length; i++) {
      const time = timeListed[i];
      for (const innerDay of time.dayList) {
        if (innerDay.isChecked && day.day === innerDay.day) {
          index = i;
          innerDay.isChecked = false;
          innerDay.EMP_SCH_SEQ = null;
        }
      }
    }
    if (index > -1) {
      for (const innerDay of timeListed[index].dayList) {
        if (innerDay.isChecked) {
          count++;
        }
      }
    }
    setTimeList(timeListed);
    if (count === 0 && index > -1) {
      removeTime(index);
    }
  };

  const register = async () => {
    dispatch(setSplashVisible(true));
    const params = {
      EMP_SEQ: empSeq,
      START: startDate,
      END: endDate == '' ? null : endDate,
      empSchedules: [],
    };
    if (!startDate || (!checkNoEndDate && (!endDate || endDate == null))) {
      return alertModal('일정 기간을 입력해주세요');
    }
    for (const time of timeList) {
      for (const day of time.dayList) {
        if (day.isChecked) {
          params.empSchedules.push({
            EMP_SCH_SEQ: -1,
            JE_SEQ: -1,
            EMP_SEQ: empSeq,
            DAY: day.day,
            ATTENDANCE_TIME: time.startTime,
            WORK_OFF_TIME: time.endTime,
            USE_FLAG: 1,
            START: startDate,
            END: endDate == '' ? null : endDate,
          });
        }
      }
    }
    if (updateMode) {
      const response = await fetch(
        'http://133.186.209.113:80/api/v2/Employee/update_emp_schedules3',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({DEL: deleteList}),
        },
      );
      const json = await response.json();
      if (json.message !== 'SUCCESS') {
        alertModal(json.result);
      }
    }
    const response = await fetch(
      'http://133.186.209.113:80/api/v2/Employee/insert_emp_schedules',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
    );
    const json = await response.json();
    if (json.message === 'SUCCESS') {
      alertModal('일정이 ' + TYPE + '되었습니다.');
      handler();
    } else {
      alertModal(json.result);
    }
    setSplashVisible(false);
  };

  useEffect(() => {
    initialize();
  }, []);

  return <EmployeeScheduleAddScreenPresenter />;
};
