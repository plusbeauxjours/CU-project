import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import SignupScreenPresenter from './SignupScreenPresenter';
import {useDispatch} from 'react-redux';

import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';

import api from '~/constants/LoggedOutApi';
import utils from '~/constants/utils';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const {mobileNo = null} = params;
  const mobileNo = '01090900303';
  const [name, setName] = useState<string>('');
  const [positionTypeCheck, setPositionTypeCheck] = useState<
    [boolean, boolean]
  >([false, false]);
  const [password, setPassword] = useState<any>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [isBirthDateVisible, setIsBirthDateVisible] = useState<boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState<any>('');
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isPasswordCheckSeen, setIsPasswordCheckSeen] = useState<boolean>(
    false,
  );
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isPasswordCheckError, setIsPasswordCheckError] = useState<boolean>(
    false,
  );

  const alertModal = (text) => {
    const params = {alertType: 'alert', content: text};
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = (title, text) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      okCallback: () => submitFn(),
      okButtonText: '예',
      cancelButtonText: '아니요',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const submitFn = async () => {
    if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
      return alertModal('숫자와 영문자 조합으로 6~15자리를 사용해야 합니다.');
    }

    const checkNumber = password.search(/[0-9]/g);
    const checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
      return alertModal('숫자와 영문자를 혼용하여야 합니다.');
    }
    if (/(\w)\1\1\1/.test(password)) {
      return alertModal('444같은 문자를 4번 이상 사용하실 수 없습니다.');
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.signUp({
        NAME: name,
        BIRTHDATE: birthDate,
        MOBILENO: mobileNo,
        STORE: positionTypeCheck.indexOf(true).toString(),
        PASSWORD: password,
      });
      if (data.message === 'ALREADY_SUCCESS') {
        alertModal('이미 가입한 휴대폰번호입니다.');
        navigation.goBack();
      } else if (data.message === 'SMSERROR') {
        alertModal('인증번호 오류입니다.');
        navigation.goBack();
      } else {
        alertModal('회원가입이 완료되었습니다. 로그인해 주세요.');
        navigation.navigate('LogInScreen', {
          appVersion: utils.appVersion,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const passwordCheckerFn = (text, isPasswordCheck) => {
    const reg1 = /^[A-Za-z0-9]*$/;
    const reg2 = /[0-9]/g;
    const reg3 = /[a-z]/gi;
    if (isPasswordCheck) {
      if (reg1.test(text)) {
        setPasswordCheck(text);
        setIsPasswordCheckError(false);
      } else {
        setIsPasswordCheckError(true);
      }
    } else {
      setPasswordCheck('');
      if (reg1.test(text)) {
        if (password.length < 6) {
          setPassword(text);
          setIsPasswordError(true);
        } else {
          if (
            (password.search(/[0-9]/g) < 0 &&
              reg3.test(text.charAt(text.length - 1))) ||
            (password.search(/[a-z]/gi) < 0 &&
              reg2.test(text.charAt(text.length - 1)))
          ) {
            setPassword(text);
            setIsPasswordError(true);
          } else {
            setPassword(text);
            setIsPasswordError(false);
          }
        }
      } else {
        setIsPasswordError(true);
      }
    }
  };

  const onChangeName = (text) => {
    if (name.length > 6) {
      alertModal('이름은 6자리 이하로 적어주세요.');
    } else {
      setName(text);
    }
  };

  return (
    <SignupScreenPresenter
      mobileNo={mobileNo}
      name={name}
      confirmModal={confirmModal}
      onChangeName={onChangeName}
      password={password}
      passwordCheck={passwordCheck}
      positionTypeCheck={positionTypeCheck}
      setPositionTypeCheck={setPositionTypeCheck}
      setPassword={setPassword}
      setPasswordCheck={setPasswordCheck}
      isPasswordSeen={isPasswordSeen}
      setIsPasswordSeen={setIsPasswordSeen}
      isPasswordCheckSeen={isPasswordCheckSeen}
      setIsPasswordCheckSeen={setIsPasswordCheckSeen}
      passwordCheckerFn={passwordCheckerFn}
      isPasswordError={isPasswordError}
      isPasswordCheckError={isPasswordCheckError}
      birthDate={birthDate}
      setBirthDate={setBirthDate}
      isBirthDateVisible={isBirthDateVisible}
      setIsBirthDateVisible={setIsBirthDateVisible}
    />
  );
};
