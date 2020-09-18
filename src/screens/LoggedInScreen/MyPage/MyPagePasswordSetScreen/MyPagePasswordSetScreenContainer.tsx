import React, {useState, useEffect} from 'react';
import moment from 'moment';
import MyPagePasswordSetScreenPresenter from './MyPagePasswordSetScreenPresenter';
import {useDispatch, useSelector} from 'react-redux';

import api from '~/constants/LoggedInApi';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {userLogout} from '~/redux/userSlice';
import {useNavigation} from '@react-navigation/native';

let timer = null;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {MEMBER_SEQ, MOBILE_NO} = useSelector(
    (state: any) => state.userReducer,
  );
  const [password, setPassword] = useState<string>(null);
  const [passwordCheck, setPasswordCheck] = useState<string>(null);
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isPasswordCheckSeen, setIsPasswordCheckSeen] = useState<boolean>(
    false,
  );
  const [hasCheckedVerifyCode, setHasCheckedVerifyCode] = useState<boolean>(
    false,
  );
  const [verifyCode, setVerifyCode] = useState<string>(null);
  const [mobileNo, setMobileNo] = useState<string>(MOBILE_NO || null);
  const [isRegisted, setIsRegisted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>('');
  const [isCountDownStarted, setIsCountDownStarted] = useState<boolean>(false);
  const [hasCheckedTimeOut, setHasCheckedTimeOut] = useState<boolean>(false);

  // Notification
  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // onChanges
  const onChangePassword = (text) => {
    setPassword(text);
  };

  const onChangeVerifyCode = (text) => {
    verifyCode.length > 0 && setIsRegisted(true);
    setVerifyCode(text);
  };

  const onChangePasswordCheck = (text) => {
    if (password.length <= 5) {
      alertModal('비밀번호를 6자리 이상 입력하세요.');
    }
    setPasswordCheck(text);
    if (password == passwordCheck) {
      setIsRegisted(true);
    } else {
      setIsRegisted(false);
    }
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
    if (password !== passwordCheck) {
      alertModal('새로운 비밀번호가 동일하지 않습니다.');
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (password == '') {
      return alertModal('새로운 비밀번호를 입력해주세요.');
    }
    if (passwordCheck == '') {
      return alertModal('새로운 비밀번호 확인을 입력해주세요.');
    }
    if (hasCheckedVerifyCode === false) {
      return alertModal('휴대폰번호 인증을 해주세요.');
    }
    if (isRegisted === false) {
      return alertModal('휴대폰번호 인증을 해주세요.');
    }
    if (isRegisted === true) {
      if (checkPassword(password) === false) {
        return false;
      } else {
        try {
          const {data} = await api.changePwd({
            MobileNo: mobileNo,
            MEMBER_SEQ,
            PASSWORD: password,
            SMS: verifyCode,
          });
          if (data.message == 'SMSERROR') {
            alertModal('인증번호 오류입니다.');
          } else {
            alertModal('비밀번호가 변경 되었습니다. 다시 로그인해주세요.');
            setHasCheckedVerifyCode(false);
            dispatch(userLogout());
            clearInterval(timer);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'LoggedOutNavigation',
                  state: {routes: [{name: 'StartScreen'}]},
                },
              ],
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
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
        setHasCheckedTimeOut(true);
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

  const requireVerifyCode = async () => {
    setVerifyCode('');
    setHasCheckedVerifyCode(true);
    setIsCountDownStarted(true);
    setHasCheckedTimeOut(false);
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

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <MyPagePasswordSetScreenPresenter
      alertModal={alertModal}
      password={password}
      passwordCheck={passwordCheck}
      hasCheckedVerifyCode={hasCheckedVerifyCode}
      verifyCode={verifyCode}
      mobileNo={mobileNo}
      isRegisted={isRegisted}
      requireVerifyCode={requireVerifyCode}
      onChangePassword={onChangePassword}
      onChangeVerifyCode={onChangeVerifyCode}
      onChangePasswordCheck={onChangePasswordCheck}
      submit={submit}
      countdown={countdown}
      isCountDownStarted={isCountDownStarted}
      hasCheckedTimeOut={hasCheckedTimeOut}
      isPasswordSeen={isPasswordSeen}
      setIsPasswordSeen={setIsPasswordSeen}
      isPasswordCheckSeen={isPasswordCheckSeen}
      setIsPasswordCheckSeen={setIsPasswordCheckSeen}
    />
  );
};
