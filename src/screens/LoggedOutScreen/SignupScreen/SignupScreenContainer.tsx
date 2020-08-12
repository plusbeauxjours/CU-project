import React, {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import SignupScreenPresenter from './SignupScreenPresenter';
import utils from '../../../constants/utils';
import {useDispatch} from 'react-redux';

////////////////////////////////////////
// import {Platform} from '@unimodules/core';
//
// gender
// birth
// sexTypeCheck
// positionTypeCheck
// type

// Redux
// setAlertInfo
// setAlertVisible
// setSplashVisible

// Position Issue
//
////////////////////////////////////////

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [sexTypeCheck, setSexTypeCheck] = useState<[boolean]>([true, false]);
  const [positionTypeCheck, setPositionTypeCheck] = useState<
    [boolean, boolean]
  >([false, false]);
  const [type, setType] = useState<string>('1');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isRegist, setIsRegist] = useState<boolean>(false);
  const [appVersion, setAppVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');

  const toggleIsPasswordSeen = () => {
    setIsPasswordSeen(!isPasswordSeen);
  };

  const alertModal = (text) => {
    const params = {type: 'alert', content: text};
    setAlertInfo(params);
    setAlertVisible(true);
  };

  const confirmModal = (title, text) => {
    const params = {
      type: 'confirm',
      title: title,
      content: text,
      okCallback: () => regist(),
      okButtonText: '예',
      cancelButtonText: '아니요',
    };
    setAlertInfo(params);
    setAlertVisible(true);
  };

  const checkPassword = (password) => {
    if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
      alertModal('숫자와 영문자 조합으로 6~15자리를 사용해야 합니다.');
      return false;
    }

    const checkNumber = password.search(/[0-9]/g);
    const checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
      alertModal('숫자와 영문자를 혼용하여야 합니다.');
      return false;
    }
    if (/(\w)\1\1\1/.test(password)) {
      alertModal('444같은 문자를 4번 이상 사용하실 수 없습니다.');
      return false;
    }
    return true;
  };

  const regist = async () => {
    setSplashVisible(true);
    if (password !== passwordCheck) {
      alertModal('비밀번호가 동일하지 않습니다.');
      setSplashVisible(false);
    }
    if (checkPassword(password) === false) {
      setSplashVisible(false);
      return false;
    } else {
      try {
        let response = await fetch(
          'http://133.186.209.113:80/api/v2/Auth/signup3',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              NAME: name,
              MobileNo: params?.mobileNum,
              SMSNUMBER: params?.verifyCode,
              STORE: type,
              PASSWORD: password,
              DEVICE_TOKEN: '',
            }),
          },
        );
        const json = await response.json();

        if (json.message === 'ALREADY_SUCCESS') {
          setSplashVisible(false);
          const params = {
            type: 'alert',
            content: '이미 가입한 휴대폰번호입니다.',
          };
          setAlertInfo(params);
          setAlertVisible(true);
          navigation.goBack();
        } else if (json.message === 'SMSERROR') {
          setSplashVisible(false);
          const params = {
            type: 'alert',
            content: '인증번호 오류입니다.',
          };
          setAlertInfo(params);
          setAlertVisible(true);
          navigation.goBack();
        } else {
          setSplashVisible(false);
          const params = {
            type: 'alert',
            content: '회원가입이 완료되었습니다. 다시 로그인해 주세요.',
          };
          setAlertInfo(params);
          setAlertVisible(true);
          navigation.navigate('LogIn', {
            appVersion,
            platform,
          });
        }
      } catch (error) {
        console.log(error);
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

  const onChangePassword = (isPasswordCheck, text) => {
    if (isPasswordCheck) {
      setPasswordCheck(text);
      checkValidationRegistButton();
    } else {
      setPassword(text);
      setPasswordCheck('');
    }
  };

  const onBlurPassword = (text) => {
    checkValidationRegistButton();
    if (password !== '' && password.length < 6) {
      alertModal('비밀번호를 6자리 이상 입력하세요.');
    }
  };

  const checkValidationRegistButton = () => {
    const checkedPositionType = !!positionTypeCheck.filter((flag) => flag)
      .length;
    if (
      !id ||
      !name ||
      !password ||
      password.length < 6 ||
      !checkedPositionType
    ) {
      setIsRegist(false);
    } else {
      setIsRegist(true);
    }
  };

  useEffect(() => {
    // analytics
    //   .hit(new PageHit('회원가입 정보입력 페이지'))
    //   .then(() => console.log('success'))
    //   .catch((e) => console.log(e.message));
    if (utils.isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('ios');
    }
    setId(params?.phone);
    setAppVersion('1.3.6');
  }, []);

  return (
    <SignupScreenPresenter
      id={id}
      name={name}
      confirmModal={confirmModal}
      onChangePassword={onChangePassword}
      onChangeName={onChangeName}
      onBlurPassword={onBlurPassword}
      toggleIsPasswordSeen={toggleIsPasswordSeen}
      isRegist={isRegist}
      isPasswordSeen={isPasswordSeen}
      password={password}
      passwordCheck={passwordCheck}
      sexTypeCheck={sexTypeCheck}
      positionTypeCheck={positionTypeCheck}
      checkValidationRegistButton={checkValidationRegistButton}
    />
  );
};
