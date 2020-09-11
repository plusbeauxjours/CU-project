import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setSplashVisible} from '../../../../redux/splashSlice';
import {setAlertVisible, setAlertInfo} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';
import ChecklistAddScreenPresenter from './ChecklistAddScreenPresenter';
import {getCHECKLIST_DATA} from '../../../../redux/checklistSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    CHECK_SEQ = null,
    PHOTO_CHECK = null,
    EMP_SEQ = null,
    NAME = null,
    DATE = null,
    type,
  } = params;

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [choiceEmp, setChoiceEmp] = useState<any>([]);
  const [isCheckedEmpChoise, setIsCheckedEmpChoise] = useState<boolean>(false);
  const [emplist, setEmplist] = useState<any>([]);
  const [CLOSE_FLAG, setCLOSE_FLAG] = useState<boolean>(false);
  const [TITLE, setTITLE] = useState<string>(params?.TITLE || null);
  const [checklistInput, setChecklistInput] = useState<string>('');
  const [LIST, setLIST] = useState<any>([]);
  const [isNoCheckedtime, setIsNoCheckedtime] = useState<boolean>(
    params?.END_TIME ? true : false,
  );
  const [isCheckedCamera, setIsCheckedCamera] = useState<boolean>(false);
  const [customChecktime, setCustomChecktime] = useState<string>(
    params?.END_TIME || null,
  );
  const [isTimeCheckedModalVisible, setIsTimeCheckedModalVisible] = useState<
    boolean
  >(false);
  const [hourCheck, setHourCheck] = useState<any>(new Array(24));
  const [minuteCheck, setMinuteCheck] = useState<
    [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
  >([false, false, false, false, false, false, false]);
  const [minuteDirectInput, setMinuteDirectInput] = useState<any>(null);

  const confirmModal = (title, text, cancel, okBtn) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => {
        submitFn('close');
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 체크리스트 삭제
  const deleteFn = () => {
    submitFn('close');
  };

  // 담당직원 리스트에서 삭제
  const deleteEmpFn = (KEY) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i].EMP_SEQ == KEY) {
        buffer.splice(i, 1);
        break;
      }
    }
    if (buffer.length == 0) {
      setChoiceEmp(buffer);
      setIsCheckedEmpChoise(false);
    } else {
      setChoiceEmp(buffer);
    }
  };

  // 담당직원 리스트에 추가
  const choiseEmpFn = (data) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    for (let i = 0; i < buffer.length; i++) {
      if (data.NAME == buffer[i].NAME) {
        return;
      }
    }
    buffer.push(data);
    setChoiceEmp(buffer);
  };

  const fetchData = async () => {
    try {
      const {data} = await api.getEmployeeList({STORE_SEQ});
      if (data.message === 'SUCCESS') {
        setEmplist(data.result);
      }
    } catch (e) {
      console.log(e);
      alertModal('통신이 원활하지 않습니다.');
    }
  };

  // 예정시간모달에서 직접입력
  const checkDirectInputFn = () => {
    let valueH = JSON.parse(JSON.stringify(hourCheck));
    let valueM = JSON.parse(JSON.stringify(minuteCheck));
    if (minuteCheck[6] && (minuteDirectInput < 0 || minuteDirectInput > 59)) {
      return alertModal('0 ~ 59 사이의 수를 적어주세요.');
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
      minute = String(minuteCheck.indexOf(true) * 10);
      if (Number(minute) < 10) {
        minute = `0${minute}`;
      }
    }
    setIsTimeCheckedModalVisible(false);
    setCustomChecktime(`${hour}:${minute}`);
    setHourCheck(valueH);
    setMinuteCheck(valueM);
    setMinuteDirectInput('');
  };

  // 체크리스트 추가하기
  const submitFn = async (sign) => {
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    if (TITLE == '') {
      alertModal('체크포인트를 입력해주세요');
    }
    if (isCheckedEmpChoise) {
      if (buffer.length == 0) {
        return alertModal('체크리스트 담당 직원을 선택해주세요');
      }
    }
    let newChoiceEmp = [];
    for (let i = 0; i < choiceEmp.length; i++) {
      newChoiceEmp.push({
        EMP_SEQ: choiceEmp[i].EMP_SEQ,
      });
    }

    let newlist = [];
    for (let i = 0; i < LIST.length; i++) {
      newlist.push(LIST[i]);
      newlist.push(false);
    }
    if (!CHECK_SEQ) {
      try {
        dispatch(setSplashVisible(true));
        if (buffer.length != 0) {
          const {data} = await api.checkRegister({
            LIST: newlist,
            STORE_SEQ,
            TITLE,
            createdData: isNoCheckedtime ? '' : customChecktime,
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
            EMP_SEQ: newChoiceEmp,
          });
          if (data.message === 'SUCCESS') {
            navigation.goBack();
            alertModal('체크리스트가 추가되었습니다.');
          } else if (data.message === 'ALREADY_SUCCESS') {
            alertModal(data.result);
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        } else {
          const {data} = await api.checkRegister({
            LIST: newlist,
            STORE_SEQ,
            TITLE,
            createdData: isNoCheckedtime ? '' : customChecktime,
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
          });
          if (data.message === 'SUCCESS') {
            navigation.goBack();
            alertModal('체크리스트가 추가되었습니다.');
          } else if (data.message === 'ALREADY_SUCCESS') {
            alertModal(data.result);
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(getCHECKLIST_DATA(DATE));
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        if (buffer.length !== 0) {
          const {data} = await api.checkUpdate({
            CLOSE_FLAG: sign == 'close' ? '1' : '0',
            STORE_SEQ,
            LIST: newlist,
            CHECK_SEQ,
            TITLE,
            createdData: isNoCheckedtime ? '' : customChecktime,
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
            EMP_SEQ: newChoiceEmp,
          });
          if (data.result === 'SUCCESS') {
            navigation.goBack();
            alertModal(
              `체크리스트가 ${CLOSE_FLAG ? '삭제' : '수정'}되었습니다.`,
            );
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        } else {
          const {data} = await api.checkUpdate({
            CLOSE_FLAG: sign == 'close' ? '1' : '0',
            STORE_SEQ,
            LIST: newlist,
            CHECK_SEQ,
            TITLE,
            createdData: isNoCheckedtime ? '' : customChecktime,
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
          });
          if (data.result === 'SUCCESS') {
            navigation.goBack();
            alertModal(
              `체크리스트가 ${CLOSE_FLAG ? '삭제' : '수정'}되었습니다.`,
            );
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(getCHECKLIST_DATA(DATE));
        dispatch(setSplashVisible(false));
      }
    }
  };

  useEffect(() => {
    if (params?.LIST) {
      let newchecklist = params?.LIST.split('@@');
      newchecklist[newchecklist.length - 1] = newchecklist[
        newchecklist.length - 1
      ].replace('@', '');
      let newlist = [];
      for (let i = 0; i < newchecklist.length; i++) {
        newlist.push(newchecklist[i]);
      }
      if (EMP_SEQ) {
        let emparr = EMP_SEQ.split('@');
        let empnamearr = NAME.split('@');
        let buffer = JSON.parse(JSON.stringify(choiceEmp));
        for (let i = 0; i < emparr.length; i++) {
          let data: any = {};
          data.NAME = empnamearr[i];
          data.IMAGE = '3.png';
          data.EMP_SEQ = emparr[i];
          buffer.push(data);
        }
        if (emparr.length !== 0) {
          setIsCheckedEmpChoise(true);
          setChoiceEmp(buffer);
        }
      }
      setLIST(newlist);
      setIsCheckedCamera(Number(PHOTO_CHECK || 0) === 1 ? true : false);
    }
    fetchData();
  }, []);

  return (
    <ChecklistAddScreenPresenter
      hourCheck={hourCheck}
      setHourCheck={setHourCheck}
      minuteCheck={minuteCheck}
      setMinuteCheck={setMinuteCheck}
      minuteDirectInput={minuteDirectInput}
      setMinuteDirectInput={setMinuteDirectInput}
      TITLE={TITLE}
      setTITLE={setTITLE}
      deleteEmpFn={deleteEmpFn}
      isTimeCheckedModalVisible={isTimeCheckedModalVisible}
      setIsTimeCheckedModalVisible={setIsTimeCheckedModalVisible}
      isNoCheckedtime={isNoCheckedtime}
      setIsNoCheckedtime={setIsNoCheckedtime}
      isCheckedCamera={isCheckedCamera}
      setIsCheckedCamera={setIsCheckedCamera}
      customChecktime={customChecktime}
      setCustomChecktime={setCustomChecktime}
      isCheckedEmpChoise={isCheckedEmpChoise}
      setIsCheckedEmpChoise={setIsCheckedEmpChoise}
      checklistInput={checklistInput}
      choiseEmpFn={choiseEmpFn}
      checkDirectInputFn={checkDirectInputFn}
      emplist={emplist}
      choiceEmp={choiceEmp}
      submitFn={submitFn}
      LIST={LIST}
      type={type}
      confirmModal={confirmModal}
      setChecklistInput={setChecklistInput}
      setLIST={setLIST}
    />
  );
};
