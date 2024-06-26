import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LogInScreenPresenter from './LogInScreenPresenter';
import {useNavigation} from '@react-navigation/native';

import {setUSER, setMOBILE_NO, userLogin} from '~/redux/userSlice';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import api from '~/constants/LoggedOutApi';
import {setSplashVisible} from '~/redux/splashSlice';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    PUSH_TOKEN,
    DEVICE_MODEL,
    DEVICE_PLATFORM,
    DEVICE_SYSTEM_VERSION,
  } = useSelector((state: any) => state.userReducer);

  const [mobileNo, setMobileNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const alertModal = (text) => {
    const params = {alertType: 'alert', content: text};
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const onChangeMobileNum = (text) => {
    if (text.length > 11) {
      alertModal('핸드폰번호는 최대 11자리 입력 가능합니다.');
    } else {
      setMobileNo(text);
    }
  };

  const gotoFind = () => {
    navigation.navigate('FindPasswordScreen');
  };

  const logIn = async () => {
    if (mobileNo.length == 0 || password.length == 0) {
      alertModal('휴대폰번호 또는 비밀번호가 입력되지 않았습니다.');
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.logIn({
        MOBILENO: mobileNo,
        PALTFORM: DEVICE_PLATFORM,
        VERSION: DEVICE_SYSTEM_VERSION,
        MODEL: DEVICE_MODEL,
        DEVICE_TOKEN: PUSH_TOKEN,
        PASSWORD: password,
      });
      switch (data.RESULT_CODE) {
        case '0':
          dispatch(setUSER(data.RESULT_DATA));
          dispatch(setMOBILE_NO(mobileNo));
          dispatch(userLogin());
          return navigation.navigate('LoggedInNavigation');
        case '1':
          return alertModal('사용자 정보가 맞지 않습니다.');
        case '2':
          return alertModal('가입된 계정이 없습니다. 회원가입을 진행해주세요.');
        default:
          break;
      }
    } catch (e) {
      console.log(e);
      alertModal('서버 접속이 원할하지 않습니다.');
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  return (
    <LogInScreenPresenter
      gotoFind={gotoFind}
      onChangeMobileNum={onChangeMobileNum}
      setPassword={setPassword}
      mobileNo={mobileNo}
      password={password}
      logIn={logIn}
    />
  );
};
