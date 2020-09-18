import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import FindPasswordScreenPresenter from './FindPasswordScreenPresenter';
import api from '~/constants/LoggedInApi';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';

let timer = null;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mobileNo, setMobileNo] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [passwordCheck, setPasswordCheck] = useState<string>(null);
  const [verifyCode, setVerifyCode] = useState<string>(null);
  const [countdown, setCountdown] = useState<string>(null);
  const [isCountDownStarted, setIsCountDownStarted] = useState<boolean>(false);
  const [hasCheckedTimeOut, setHasCheckTimeOut] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [hasCheckedVerifyCode, setHasCheckedVerifyCode] = useState<boolean>(
    false,
  );
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isPasswordCheckSeen, setIsPasswordCheckSeen] = useState<boolean>(
    false,
  );

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      content: text,
    };
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

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const submit = () => {
    try {
      if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
        return alertModal('숫자와 영문자 조합으로 6~15자리를 사용해야 합니다.');
      }
      let checkNumber = password.search(/[0-9]/g);
      let checkEnglish = password.search(/[a-z]/gi);
      if (checkNumber < 0 || checkEnglish < 0) {
        return alertModal('숫자와 영문자를 혼용하여야 합니다.');
      }
      if (/(\w)\1\1\1/.test(password)) {
        return alertModal('444같은 문자를 4번 이상 사용하실 수 없습니다.');
      }
      if (password !== passwordCheck) {
        return alertModal('새로운 비밀번호가 동일하지 않습니다.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      changePasswordFn();
    }
  };

  const onVerifyCode = async () => {
    if (verifyCode.length != 6) {
      alertModal('인증번호를 정확히 입력해주세요.');
    } else {
      try {
        const {data} = await api.checkSMS({
          MOBILENO: mobileNo,
          SMSNUMBER: verifyCode,
        });
        if (data.RESULT_CODE == '0') {
          clearInterval(timer);
          setIsVerified(true);
          setIsCountDownStarted(false);
        } else {
          alertModal('인증번호가 맞지않습니다.');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onChangePasswordCheck = (text) => {
    if (password.length <= 5) {
      alertModal('비밀번호를 6자리 이상 입력하세요.');
    }
    setPasswordCheck(text);
  };

  const onChangeVerifyCode = (text) => {
    setVerifyCode(text);
  };

  const requireVerifyCode = async () => {
    if (mobileNo.length == 0) {
      alertModal('찾으실 휴대폰번호를 입력해주세요.');
      return;
    }
    const regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (!regExp_ctn.test(mobileNo)) {
      alertModal('올바른 휴대폰번호 11자리를 입력해주세요.');
      return;
    }
    setHasCheckedVerifyCode(true);
    setIsCountDownStarted(true);
    setHasCheckTimeOut(false);
    startCountDown();
    try {
      const {data} = await api.getSMS({
        MOBILENO: mobileNo,
      });
      if (data.RESULT_CODE == '0') {
        alertModal('인증번호를 발송하였습니다.');
      }
    } catch (e) {
      console.log(e);
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
        setHasCheckedVerifyCode(false);
        setIsCountDownStarted(false);
        setHasCheckTimeOut(true);
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

  const changePasswordFn = async () => {
    try {
      navigation.goBack();
      const {data} = await api.findPwd({
        MOBILENO: mobileNo,
        PASSWORD: password,
      });
      if (data.RESULT_CODE == '0') {
        alertModal('비밀번호가 변경 되었습니다.');
      }
      if (data.RESULT_CODE == '1') {
        alertModal('계정정보가 없습니다.회원가입을 먼저 진행해주세요.');
      }
    } catch (e) {
      alertModal('연결에 실패하였습니다.');
      console.log(e);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <FindPasswordScreenPresenter
      isCountDownStarted={isCountDownStarted}
      hasCheckedVerifyCode={hasCheckedVerifyCode}
      requireVerifyCode={requireVerifyCode}
      verifyCode={verifyCode}
      onChangeMobileNum={onChangeMobileNum}
      onChangeVerifyCode={onChangeVerifyCode}
      onChangePassword={onChangePassword}
      onChangePasswordCheck={onChangePasswordCheck}
      isVerified={isVerified}
      passwordCheck={passwordCheck}
      mobileNo={mobileNo}
      submit={submit}
      hasCheckedTimeOut={hasCheckedTimeOut}
      onVerifyCode={onVerifyCode}
      countdown={countdown}
      password={password}
      isPasswordSeen={isPasswordSeen}
      setIsPasswordSeen={setIsPasswordSeen}
      isPasswordCheckSeen={isPasswordCheckSeen}
      setIsPasswordCheckSeen={setIsPasswordCheckSeen}
    />
  );
};
