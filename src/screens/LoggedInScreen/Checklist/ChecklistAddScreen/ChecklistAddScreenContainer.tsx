import React, {useState, useEffect} from 'react';

import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setSplashVisible} from '../../../../redux/splashSlice';
import {setAlertVisible, setAlertInfo} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';
import ChecklistAddScreenPresenter from './ChecklistAddScreenPresenter';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    checkType,
    checkID,
    STORE = null,
    storeID = null,
    csID = null,
    checkpoint = null,
    checklist = null,
    checktime = null,
    check = null,
    checkEMP = null,
    checkEMPTime = null,
    memo = null,
    scan = null,
    PHOTO_CHECK = null,
    IMAGE_LIST = null,
    checkSelectedEmp = null,
    checkSelectedEmpName = null,
    register = null,
    DATE,
    type,
    onRefresh,
  } = params;

  const [choiceEmp, setChoiceEmp] = useState<any>([]);
  const [isCheckedEmpChoise, setIsCheckedEmpChoise] = useState<boolean>(false);
  const [emplist, setEmplist] = useState<any>([]);
  const [CLOSE_FLAG, setCLOSE_FLAG] = useState<boolean>(false);
  const [checkpointInput, setCheckpointInput] = useState<string>('');
  const [checklistInput, setChecklistInput] = useState<string>('');
  const [checklistState, setChecklistState] = useState<any>([]);
  const [isNoCheckedtime, setIsNoCheckedtime] = useState<boolean>(false);
  const [isCheckedCamera, setIsCheckedCamera] = useState<boolean>(false);
  const [customChecktime, setCustomChecktime] = useState<string>('');
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState<boolean>(
    false,
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

  const deleteFn = () => {
    submitFn('close');
  };

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
      const {data} = await api.getEmployeeList({STORE_SEQ: storeID.toString()});
      if (data.message === 'SUCCESS') {
        setEmplist(data.result);
      }
    } catch (error) {
      console.log(error);
      alertModal('통신이 원활하지 않습니다.');
    }
  };

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

  const submitFn = async (sign) => {
    if (sign == 'close') {
      setCLOSE_FLAG(true);
    }
    let buffer = JSON.parse(JSON.stringify(choiceEmp));
    if (checkpointInput == '') {
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
    for (let i = 0; i < checklist.length; i++) {
      newlist.push(checklist[i]);
      newlist.push(false);
    }
    if (checkID) {
      try {
        dispatch(setSplashVisible(true));
        if (buffer.length != 0) {
          const {data} = await api.checkRegister({
            LIST: newlist,
            STORE_SEQ: storeID.toString(),
            TITLE: checkpointInput.toString(),
            createdData: isNoCheckedtime ? '' : customChecktime.toString(), // chcktime
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
            EMP_SEQ: newChoiceEmp,
          });
          if (data.message === 'SUCCESS') {
            navigation.goBack();
            onRefresh();
            alertModal('체크리스트가 추가되었습니다.');
          } else if (data.message === 'ALREADY_SUCCESS') {
            alertModal(data.result);
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        } else {
          const {data} = await api.checkRegister({
            LIST: newlist,
            STORE_SEQ: storeID.toString(),
            TITLE: checkpointInput.toString(),
            createdData: isNoCheckedtime ? '' : customChecktime.toString(), // chcktime
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
          });
          if (data.message === 'SUCCESS') {
            navigation.goBack();
            onRefresh();
            alertModal('체크리스트가 추가되었습니다.');
          } else if (data.message === 'ALREADY_SUCCESS') {
            alertModal(data.result);
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        if (buffer.length !== 0) {
          const {data} = await api.checkUpdate({
            CLOSE_FLAG: CLOSE_FLAG ? '1' : '0',
            STORE_SEQ: storeID.toString(), // storeID
            LIST: newlist, // checklist
            CHECK_SEQ: checkID.toString(), // storeID
            TITLE: checkpointInput.toString(), // checkpoint
            createdData: isNoCheckedtime ? '' : customChecktime.toString(), // chcktime
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
            EMP_SEQ: newChoiceEmp,
          });
          if (data.result === 'SUCCESS') {
            navigation.goBack();
            onRefresh();
            alertModal(
              `체크리스트가 ${CLOSE_FLAG ? '삭제' : '수정'}되었습니다.`,
            );
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        } else {
          const {data} = await api.checkUpdate({
            CLOSE_FLAG: CLOSE_FLAG ? '1' : '0',
            STORE_SEQ: storeID.toString(), // storeID
            LIST: newlist, // checklist
            CHECK_SEQ: checkID.toString(), // storeID
            TITLE: checkpointInput.toString(), // checkpoint
            createdData: isNoCheckedtime ? '' : customChecktime.toString(), // chcktime
            PHOTO_CHECK: isCheckedCamera ? '1' : '0',
          });
          if (data.result === 'SUCCESS') {
            navigation.goBack();
            onRefresh();
            alertModal(
              `체크리스트가 ${CLOSE_FLAG ? '삭제' : '수정'}되었습니다.`,
            );
          } else {
            alertModal('연결에 실패하였습니다.');
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  useEffect(() => {
    if (checktime) {
      setIsNoCheckedtime(true);
    } else {
      setIsNoCheckedtime(false);
      setCustomChecktime(checktime);
    }
    if (checklist) {
      let newchecklist = checklist.split('@@');
      newchecklist[newchecklist.length - 1] = newchecklist[
        newchecklist.length - 1
      ].replace('@', '');

      let newlist = [];
      for (let i = 0; i < newchecklist.length; i++) {
        newlist.push(newchecklist[i]);
      }
      if (checkSelectedEmp) {
        let emparr = checkSelectedEmp.split('@');
        let empnamearr = checkSelectedEmpName.split('@');
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
      setCheckpointInput(checkpoint);
      setChecklistState(newlist);

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
      checkpointInput={checkpointInput}
      setCheckpointInput={setCheckpointInput}
      deleteEmpFn={deleteEmpFn}
      isTimeCheckedModalVisible={isTimeCheckedModalVisible}
      setIsTimeCheckedModalVisible={setIsTimeCheckedModalVisible}
      isRegisterModalVisible={isRegisterModalVisible}
      setIsRegisterModalVisible={setIsRegisterModalVisible}
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
      setChoiceEmp={setChoiceEmp}
      submitFn={submitFn}
      checklist={checklist}
      type={type}
      confirmModal={confirmModal}
      setChecklistInput={setChecklistInput}
      checklistState={checklistState}
      setChecklistState={setChecklistState}
    />
  );
};
