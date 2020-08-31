import React, {useState, useEffect} from 'react';
import CalendarAddScreenPresenter from './CalendarAddScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {STOREDATA, NAME: storeName} = params;
  const {STORE_SEQ} = useSelector((state: any) => state.userReducer);
  const [isEmpListModalVisible, setIsEmpListModalVisible] = useState<boolean>(
    false,
  );
  const [emplist, setEmplist] = useState<any>([]);
  const [choiceEmp, setChoiceEmp] = useState<any>([]);
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
  const [timeSelected, setTimeSelected] = useState<any>(null);
  const [timeCheck, setTimeCheck] = useState<any>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [stepFourClick, setStepFourClick] = useState<boolean>(false);
  const [incentiveCheck, setIncentiveCheck] = useState<
    [boolean, boolean, boolean]
  >([true, false, false]); // [기본급 적용(1배), 야간근무수당 적용(1.5배), 야간근무수당 적용(2배)]

  const alertModal = (text) => {
    const params = {
      type: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModalGoBack = (title, text) => {
    const params = {
      type: 'alert',
      title: title,
      content: text,
      okCallback: () => {
        navigation.goBack();
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = (title, text, cancel, okBtn) => {
    const params = {
      type: 'confirm',
      title: title,
      content: text,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => navigation.goBack(),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const fetchData = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getEmployeeList({STORE_SEQ});
      if (data.message === 'SUCCESS') {
        setEmplist(data.result);
      }
    } catch (error) {
      console.log(error);
      alertModal('통신이 원활하지 않습니다.');
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const deleteEmpFn = (KEY) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i].MobileNo == KEY) {
        buffer.splice(i, 1);
        break;
      }
    }
    setChoiceEmp(buffer);
  };

  const addEmpFn = (data) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    for (let i = 0; i < buffer.length; i++) {
      if (data.NAME == buffer[i].NAME) {
        return;
      }
    }
    buffer.push(data);
    setChoiceEmp(buffer);
    setIsEmpListModalVisible(false);
  };

  const registerFn = async () => {
    let incentiveChecked = incentiveCheck.indexOf(true);
    if (choiceEmp.length === 0) {
      alertModal('직원을 선택해주세요.');
      return;
    }
    if (timeCheck.length === 0) {
      alertModal('출퇴근 시간이 입력되지 않았습니다.');
      return;
    }
    if (Object.keys(markedDates).length === 0) {
      alertModal('캘린더에서 근무일을 설정해주세요.');
      return;
    }
    let newChoiceEmp = [];
    for (var i = 0; i < choiceEmp.length; i++) {
      newChoiceEmp.push({
        EMP_SEQ: choiceEmp[i].EMP_SEQ,
        EMP_NAME: choiceEmp[i].NAME,
      });
    }
    if (incentiveChecked === 0) {
      incentiveChecked = 9; // 0: 기본급 적용(1배)
    } else if (incentiveChecked === 1) {
      incentiveChecked = 8; // 1: 초과, 야간근무수당 적용(1.5배)
    } else if (incentiveChecked === 2) {
      incentiveChecked = 6; // 2: 초과, 야간근무수당 적용(2배)
    }
    for (var i = 0; i < timeCheck.length; i++) {
      let newMarkedDates = [];
      Object.keys(markedDates).map((key) => {
        for (var j = 0; j < markedDates[key].dots.length; j++) {
          let value = markedDates[key].dots[j].color;
          if (value === timeCheck[i].color) {
            newMarkedDates.push(key);
          }
        }
      });
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.createNewSchedule({
          EMPS: newChoiceEmp,
          DATE: newMarkedDates,
          SCHEDULETYPE: incentiveChecked.toString(),
          TYPE: '3'.toString(),
          START: timeCheck[i].start.toString(),
          END: timeCheck[i].end.toString(),
          COLOR: timeCheck[i].color.toString(),
          STORE_NAME: storeName.toString(),
          STORE_ID: STORE_SEQ.toString(),
        });

        if (data.message) {
          navigation.goBack();
          alertModal('일정을 추가하였습니다.');
        }
      } catch (error) {
        console.log(error);
        alertModal('통신이 원활하지 않습니다.');
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  const checkAddTimeFn = () => {
    if (!startTime || !endTime) {
      return alertModal('출퇴근 시간을 먼저 입력해주세요.');
    }
    if (timeCheck.length >= 7) {
      return alertModal('일정은 7개가 최대입니다.');
    }
    let value = JSON.parse(JSON.stringify(timeCheck));
    let color = [
      '#0D4F8A',
      '#ED8F52',
      '#FEBF40',
      '#5CAD6F',
      '#984B19',
      '#CB8DB1',
      '#FEBF40',
    ];
    let temp, tempIndex;
    if (timeCheck.length === 0) {
      temp = {
        start: startTime,
        end: endTime,
        color: color[timeCheck.length],
      };
    } else {
      for (var i = 0; i < timeCheck.length; i++) {
        tempIndex = color.indexOf(timeCheck[i].color);
        color.splice(tempIndex, 1);
      }
      temp = {
        start: startTime,
        end: endTime,
        color: color[0],
      };
    }
    value.push(temp);
    setTimeCheck(value);
  };

  const deleteColorFn = (index) => {
    let timeChecked = JSON.parse(JSON.stringify(timeCheck));
    let markedDated = JSON.parse(JSON.stringify(markedDates));
    Object.keys(markedDated).map((key) => {
      var temp = markedDated[key].dots.findIndex(
        (element) => element.key === timeChecked[index].color,
      );

      if (temp !== -1) {
        markedDated[key].dots.splice(temp, 1);
      }
    });
    timeChecked.splice(index, 1);
    setTimeCheck(timeChecked);
    setMarkedDates(markedDated);
    if (timeSelected > index) {
      setTimeSelected(timeSelected - 1);
    } else if (timeSelected === index) {
      setTimeSelected(null);
    }
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

  useEffect(() => {
    setHourCheck(JSON.parse(JSON.stringify(hourCheck)));
    fetchData();
  }, []);

  return (
    <CalendarAddScreenPresenter
      alertModal={alertModal}
      markedDates={markedDates}
      setMarkedDates={setMarkedDates}
      emplist={emplist}
      timeCheck={timeCheck}
      hourCheck={hourCheck}
      minuteCheck={minuteCheck}
      minuteDirectInput={minuteDirectInput}
      setMinuteDirectInput={setMinuteDirectInput}
      setHourCheck={setHourCheck}
      setMinuteCheck={setMinuteCheck}
      registerFn={registerFn}
      addEmpFn={addEmpFn}
      deleteEmpFn={deleteEmpFn}
      checkAddTimeFn={checkAddTimeFn}
      deleteColorFn={deleteColorFn}
      choiceEmp={choiceEmp}
      checkDirectInputFn={checkDirectInputFn}
      isTimeCheckModalVisible={isTimeCheckModalVisible}
      setIsTimeCheckModalVisible={setIsTimeCheckModalVisible}
      setTimeSwitch={setTimeSwitch}
      startTime={startTime}
      endTime={endTime}
      timeSelected={timeSelected}
      setTimeSelected={setTimeSelected}
      stepFourClick={stepFourClick}
      setStepFourClick={setStepFourClick}
      incentiveCheck={incentiveCheck}
      setIncentiveCheck={setIncentiveCheck}
    />
  );
};
