import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import VerificationScreenPresenter from './VerificationScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../redux/alertSlice';
import api from '../../../constants/LoggedInApi';

let timer = null;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [mobileNum, setMobileNum] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [countdown, setCountdown] = useState<string>('');
  const [isCountDownStart, setIsCountDownStart] = useState<boolean>(false);
  const [isCheckTimeOut, setIsCheckTimeOut] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [isCheckAuth, setIsCheckAuth] = useState<boolean>(false);

  const alertModal = (text) => {
    const params = {
      type: 'alert',
      content: text,
    };

    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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

  const onVerifyCode = async () => {
    if (verifyCode.length != 6) {
      alertModal('인증번호를 정확히 입력해주세요.');
    } else {
      try {
        const {data} = await api.checkSMS({
          MOBILENO: mobileNum,
          SMSNUMBER: verifyCode,
        });
        if (data.RESULT_CODE == '0') {
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

  const onChangeMobileNum = (text) => {
    if (text.length > 11) {
      alertModal('핸드폰번호는 최대 11자리 입력 가능합니다.');
    } else {
      setMobileNum(text);
    }
  };

  const onChangeVerifyNum = (text) => {
    if (text.length > 6) {
      alertModal('인증번호는 최대 6자리 입력 가능합니다.');
    } else {
      setVerifyCode(text);
    }
  };

  const requireAuth = async () => {
    if (mobileNum.length == 0) {
      alertModal('휴대폰번호를 입력해주세요.');
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
      const {data} = await api.getSMS({
        MOBILENO: mobileNum,
      });
      if (data.RESULT_CODE == '0') {
        alertModal('인증번호를 발송하였습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const gotoSignup = () => {
    navigation.navigate('SignupScreen', {
      mobileNum,
      verifyCode,
    });
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <VerificationScreenPresenter
      verifyCode={verifyCode}
      mobileNum={mobileNum}
      gotoSignup={gotoSignup}
      onChangeMobileNum={onChangeMobileNum}
      onChangeVerifyNum={onChangeVerifyNum}
      requireAuth={requireAuth}
      onVerifyCode={onVerifyCode}
      countdown={countdown}
      isCountDownStart={isCountDownStart}
      isCheckAuth={isCheckAuth}
      isCheckTimeOut={isCheckTimeOut}
      isVerify={isVerify}
    />
  );
};
