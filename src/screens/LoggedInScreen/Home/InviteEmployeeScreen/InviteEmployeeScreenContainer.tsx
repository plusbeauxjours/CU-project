import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Hangul from 'hangul-js';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import InviteEmployeeScreenPresenter from './InviteEmployeeScreenPresenter';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import {getRESPONSE_EMPLOYEE} from '../../../../redux/employeeSlice';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [result, setResult] = useState<any>([]);
  const [contacts, setContacts] = useState<any>([]);
  const [choice, setChoice] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const explainModal = (title, text) => {
    const params = {
      alertType: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // const alertIfRemoteNotificationsDisabledAsync  =async() =>{
  //   const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  //   if (status !== 'granted') {
  // alertModal('', '연락처 탐색 기능을 사용하기위해 동의해 주십시오.');
  //   }
  // }

  const deleteBuffer = (KEY) => {
    setChoice((buffer) => buffer.filter((item) => item.key !== KEY));
  };

  const addFn = () => {
    if (phone == '' || name == '') {
      return alertModal('', '초대할 직원의 연락처를 입력하세요');
    }
    var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (!regExp_ctn.test(phone)) {
      return alertModal('', '올바른 휴대폰번호 11자리를 입력해주세요.');
    }
    let buffer = choice;
    let flag = true;
    for (var i = 0; i < buffer.length; i++) {
      const bufferformat = buffer[i].phone.split('-').join('');
      if (bufferformat == phone) {
        flag = false;
        break;
      }
    }
    if (flag == true) {
      buffer.unshift({key: phone, NAME: name, phone: phone});
    } else {
      alertModal('', '동일한 전화번호의 직원이 등록되어있습니다');
    }
    setChoice(buffer);
    setName('');
    setPhone('');
  };

  const choiseFn = (id, name, phoneNumbers) => {
    let buffer = choice;
    if (buffer && buffer.length !== 0) {
      let flag = true;
      for (var i = 0; i < buffer.length; i++) {
        if (buffer[i].key == id) {
          flag = false;
          break;
        }
      }
      if (flag == true) {
        buffer.unshift({key: id, NAME: name, phone: phoneNumbers});
      }
    } else {
      buffer.unshift({key: id, NAME: name, phone: phoneNumbers});
    }
    setChoice(buffer);
    setResult(
      result.filter((data) => {
        return data.id !== id;
      }),
    );
  };

  const searchName = (text) => {
    setSearch(text);
    const arr = contacts;
    arr.forEach(function (item) {
      let dis = Hangul.disassemble(item.name, true);
      let cho = dis.reduce(function (prev, elem: any) {
        elem = elem[0] ? elem[0] : elem;
        return prev + elem;
      }, '');
      item.disassembled = cho;
    });
    let search = text;
    let search1 = Hangul.disassemble(search).join(''); // 렭 -> ㄹㅕㄹr
    const result1 = arr.filter(function (item) {
      return item.name.includes(search) || item.disassembled.includes(search1);
    });
    setResult(result1);
  };

  const submitFn = async () => {
    let buffer = choice;
    let buffer2 = new Array();
    for (let i = 0; i < buffer.length; i++) {
      buffer2.unshift(buffer[i].phone.replace(/\D/g, ''));
      buffer2.unshift(buffer[i].NAME);
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.sendEmp2({
        STORE_SEQ,
        LIST: buffer2,
      });
      if (data.message == 'SUCCESS') {
        alertModal(
          '초대완료',
          '초대확인 알림이 오면 직원합류승인에서 정보를 입력하여 합류를 완료해주세요. (초대받은 직원이 앱에 로그인 하게되면 초대확인 알림이 도착합니다)',
        );
        setChoice([]);
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
      dispatch(getRESPONSE_EMPLOYEE());
    }
  };

  const getContacts = async () => {
    // const {status} = await Permissions.askAsync(Permissions.CONTACTS);
    if (status !== 'granted') {
      alertModal('', '연락처 탐색 기능을 사용하기위해 동의해 주십시오.');
      return;
    }
    try {
      dispatch(setSplashVisible(true));
      // const {data} = await Contacts.getContactsAsync({
      //   fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      // });
      // var dataArr = data.filter((info) => {
      //   let buffer = choice;
      //   let flag = false;
      //   for (var i = 0; i < buffer.length; i++) {
      //     if (info.phoneNumbers) {
      //       for (var a = 0; a < info.phoneNumbers.length; a++) {
      //         const num = info.phoneNumbers[a].number.split('-').join('');
      //         if (buffer[i].phone == num) {
      //           flag = true;
      //           break;
      //         }
      //       }
      //     } else {
      //       break;
      //     }
      //   }
      //   return flag == false;
      // });
      // setContacts(data);
      // setResult(dataArr);
      setIsModalVisible(true);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const onPress = (data) => {
    dispatch(setSplashVisible(true));
    try {
      choiseFn(
        data.id,
        data.name,
        data.phoneNumbers[0].number.replace(/\D/g, ''),
      );
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
      setSearch('');
    }
  };

  // useEffect(()=> {
  // alertIfRemoteNotificationsDisabledAsync()
  // },[])

  return (
    <InviteEmployeeScreenPresenter
      explainModal={explainModal}
      setName={setName}
      name={name}
      setPhone={setPhone}
      phone={phone}
      choice={choice}
      submitFn={submitFn}
      addFn={addFn}
      getContacts={getContacts}
      deleteBuffer={deleteBuffer}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      searchName={searchName}
      search={search}
      setSearch={setSearch}
      result={result}
      onPress={onPress}
    />
  );
};
