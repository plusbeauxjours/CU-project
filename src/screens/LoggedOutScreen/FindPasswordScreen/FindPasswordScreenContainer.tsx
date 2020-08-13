import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import FindPasswordScreenPresenter from './FindPasswordScreenPresenter';

////////////////////////////////////////
// Redux
// setAlertInfo
// setAlertVisible
////////////////////////////////////////

let timer = null;

export default () => {
  const navigation = useNavigation();

  const [mobileNum, setMobileNum] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [auth, setAuth] = useState<string>('');
  const [countdown, setCountdown] = useState<string>('');
  const [isCountDownStart, setIsCountDownStart] = useState<boolean>(false);
  const [isRegist, setIsRegist] = useState<boolean>(false);
  const [isCheckTimeOut, setIsCheckTimeOut] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [isCheckAuth, setIsCheckAuth] = useState<boolean>(false);
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);

  const alertModal = (text) => {
    const params = {
      type: 'alert',
      content: text,
    };
    // setAlertInfo(params);
    // setAlertVisible(true);
  };

  const toggleIsPasswordSeen = () => {
    setIsPasswordSeen(!isPasswordSeen);
  };

  const onChangeMobileNum = (text) => {
    if (text.length > 11) {
      alertModal('핸드폰번호는 최대 11자리 입력 가능합니다.');
    } else {
      setMobileNum(text);
    }
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const checkPassword = (password) => {
    if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
      alertModal('숫자와 영문자 조합으로 6~15자리를 사용해야 합니다.');
      return false;
    }
    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/gi);
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

  const regist = () => {
    if (checkPassword(password) === false) {
      return false;
    } else {
      changePassword();
      return true;
    }
  };

  const onVerifyCode = async () => {
    if (auth.length != 6) {
      alertModal('인증번호를 정확히 입력해주세요.');
    } else {
      try {
        let response = await fetch(
          'http://133.186.209.113:3003/api/auth/checkSMS',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              MobileNo: mobileNum,
              SMSNUMBER: auth,
            }),
          },
        );
        const json = await response.json();
        console.log(
          ':3003/api/auth/checkApp 0814TEST',
          json,
          'MobileNo',
          mobileNum,
          'SMSNUMBER',
          auth,
        );
        if (json.message == 'SUCCESS') {
          clearInterval(timer);
          setIsVerify(true);
          setIsCountDownStart(false);
        } else {
          alertModal('인증번호가 맞지않습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChangePasswordCheck = (text) => {
    if (password.length <= 5) {
      alertModal('비밀번호를 6자리 이상 입력하세요.');
    }
    setPasswordCheck(text);
    if (password == passwordCheck) {
      setIsRegist(true);
    } else {
      setIsRegist(false);
    }
  };

  const onChangeAuth = (text) => {
    setAuth(text);
  };

  const requireAuth = async () => {
    if (mobileNum.length == 0) {
      alertModal('찾으실 휴대폰번호를 입력해주세요.');
      return;
    }
    const regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (!regExp_ctn.test(mobileNum)) {
      alertModal('올바른 휴대폰번호 11자리를 입력해주세요.');
      return;
    }
    setIsCheckAuth(true);
    setIsCountDownStart(true);
    setIsCheckTimeOut(false);
    startCountDown();
    try {
      let response = await fetch(
        'http://133.186.209.113:3003/api/auth/get_appSMS',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            PHONENUMBER: mobileNum.toString(),
          }),
        },
      );
      const json = await response.json();
      console.log(':3003/api/auth/get_appSMS', json);
    } catch (error) {
      console.log(error);
    }
  };

  const startCountDown = () => {
    let duration = moment.duration(90000, 'milliseconds');
    setCountdown(
      '0' +
        duration.minutes().toString() +
        ':' +
        (duration.seconds() < 10 ? '0' : '') +
        duration.seconds().toString(),
    );
    const timer = setInterval(() => {
      if (duration.asSeconds() <= 0) {
        clearInterval(timer);
        setIsCheckAuth(false);
        setIsCountDownStart(false);
        setIsCheckTimeOut(true);
      }
      duration = moment.duration(duration.asSeconds() - 1, 'seconds');
      setCountdown(
        '0' +
          duration.minutes().toString() +
          ':' +
          (duration.seconds() < 10 ? '0' : '') +
          duration.seconds().toString(),
      );
    }, 1000);
  };

  const changePassword = async () => {
    try {
      let response = await fetch(
        'http://133.186.209.113:3003/api/member/changepwd3',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            MobileNo: mobileNum,
            SMSNUMBER: auth,
            PASSWORD: password,
          }),
        },
      );
      const json = await response.json();
      console.log(':3003/api/member/changepwd3 0814TEST', json);
      if (json.resultcode == '1') {
        alertModal(json.result);
        navigation.goBack();
      } else if (json.resultcode == '2') {
        alertModal(json.result);
      } else {
        alertModal('정보가 정확하지 않습니다.');
      }
    } catch (error) {
      console.log(error);
      alertModal('사용자 정보가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    // analytics
    //   .hit(new PageHit('비밀번호찾기 페이지'))
    //   .then(() => console.log('success'))
    //   .catch((e) => console.log(e.message));
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <FindPasswordScreenPresenter
      isCountDownStart={isCountDownStart}
      isCheckAuth={isCheckAuth}
      requireAuth={requireAuth}
      auth={auth}
      onChangeMobileNum={onChangeMobileNum}
      onChangeAuth={onChangeAuth}
      onChangePassword={onChangePassword}
      onChangePasswordCheck={onChangePasswordCheck}
      isVerify={isVerify}
      passwordCheck={passwordCheck}
      mobileNum={mobileNum}
      regist={regist}
      isRegist={isRegist}
      isCheckTimeOut={isCheckTimeOut}
      onVerifyCode={onVerifyCode}
      countdown={countdown}
      password={password}
      isPasswordSeen={isPasswordSeen}
      toggleIsPasswordSeen={toggleIsPasswordSeen}
    />
  );
};
