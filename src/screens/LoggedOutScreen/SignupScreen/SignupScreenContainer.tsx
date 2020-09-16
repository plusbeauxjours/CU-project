import React, {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import SignupScreenPresenter from './SignupScreenPresenter';
import {useDispatch} from 'react-redux';

import utils from '../../../constants/utils';
import {setAlertInfo, setAlertVisible} from '../../../redux/alertSlice';
import {setSplashVisible} from '../../../redux/splashSlice';

import api from '../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {mobileNo = null, verifyCode = null} = params;
  const [name, setName] = useState<string>('');
  const [sexTypeCheck, setSexTypeCheck] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  const [positionTypeCheck, setPositionTypeCheck] = useState<
    [boolean, boolean]
  >([false, false]);
  const [password, setPassword] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isPasswordCheckSeen, setIsPasswordCheckSeen] = useState<boolean>(
    false,
  );
  const [appVersion, setAppVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');

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
      okCallback: () => regist(),
      okButtonText: '예',
      cancelButtonText: '아니요',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const regist = async () => {
    if (password !== passwordCheck) {
      alertModal('비밀번호가 동일하지 않습니다.');
    }
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
        GENDER: '',
        MobileNo: mobileNo,
        SMSNUMBER: verifyCode,
        STORE: positionTypeCheck.indexOf(true).toString(),
        PASSWORD: password,
        DEVICE_TOKEN: '',
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
          appVersion,
          platform,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const onChangeName = (text) => {
    if (name.length > 6) {
      alertModal('이름은 6자리 이하로 적어주세요.');
    } else {
      setName(text);
    }
  };

  useEffect(() => {
    if (utils.isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('ios');
    }
    setAppVersion('1.3.7');
  }, []);

  return (
    <SignupScreenPresenter
      mobileNo={mobileNo}
      name={name}
      confirmModal={confirmModal}
      onChangeName={onChangeName}
      password={password}
      passwordCheck={passwordCheck}
      sexTypeCheck={sexTypeCheck}
      setSexTypeCheck={setSexTypeCheck}
      positionTypeCheck={positionTypeCheck}
      setPositionTypeCheck={setPositionTypeCheck}
      setPassword={setPassword}
      setPasswordCheck={setPasswordCheck}
      isPasswordSeen={isPasswordSeen}
      setIsPasswordSeen={setIsPasswordSeen}
      isPasswordCheckSeen={isPasswordCheckSeen}
      setIsPasswordCheckSeen={setIsPasswordCheckSeen}
    />
  );
};
