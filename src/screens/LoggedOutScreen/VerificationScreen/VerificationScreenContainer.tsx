import React from 'react';
import {Platform} from 'react-native';
import {Header} from 'react-navigation-stack';
import {isIphoneX} from 'react-native-iphone-x-helper';
import moment from 'moment';
import {Analytics, PageHit} from 'expo-analytics';
import VerificationScreenPresenter from './VerificationScreenPresenter';

const analytics = new Analytics('UA-106739677-3');

let KEYBOARD_VERTICAL_OFFSET = 0;

if (Platform.OS === 'android') {
  // KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + StatusBar.currentHeight;
  KEYBOARD_VERTICAL_OFFSET = -500;
} else {
  if (isIphoneX()) {
    KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + 24;
  } else {
    KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT;
  }
}

let timer = null;

class VerificationScreenContainer extends React.Component {
  state = {
    isChangeModalVisible: false, // 알람 모달 출력 여부
    name: '',
    sexTypeCheck: [false, false],
    /* sexTypeCheck
    0: 남자
    1: 여자*/ gender: '남자',
    birth: '',
    phone: '',
    checkAuth: false,
    auth: '',
    next: false,
    timer: 60,
    countdown: 0,
    countDownStart: false,
    checkTimeOut: false,
    isVerify: false,
    //  date:'2020-01-15'
  };
  componentDidMount() {
    analytics
      .hit(new PageHit('회원가입 인증 페이지'))
      .then(() => console.log('success'))
      .catch((e) => console.log(e.message));
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    return <VerificationScreenPresenter />;
  }
  _onVerifyCode = async () => {
    if (this.state.auth.length != 6) {
      this._AlertModal('', '인증번호를 정확히 입력해주세요.');
    } else {
      try {
        let response = await fetch(
          'http://133.186.209.113:80/api/v2/Auth/checkSMS',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              MobileNo: this.state.phone.toString(),
              SMSNUMBER: this.state.auth.toString(),
            }),
          },
        );
        const json = await response.json();
        console.log(json);
        if (json.message == 'SUCCESS') {
          clearInterval(timer);
          this.setState({next: true, isVerify: true, countDownStart: false});
          //this.setState({ checkAuth: true });
        } else {
          this._AlertModal('', '인증번호가 맞지않습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  phoneCheck(text) {
    if (text.length > 11) {
      this._AlertModal('', '휴대폰번호는 최대 11자리 입력 가능합니다.');
    } else {
      this.setState({phone: text});
    }
  }

  _requireAuth = async () => {
    const {phone} = this.state;
    if (phone === '') {
      this._AlertModal('', '휴대폰번호를 입력해주세요.');
      return;
    }
    const regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (regExp.test(phone)) {
      this.setState({
        checkAuth: true,
        countDownStart: true,
        checkTimeOut: false,
      });
      this._startCountDown();

      try {
        let response = await fetch(
          'http://133.186.209.113:80/api/v2/Auth/get_appSMS',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              PHONENUMBER: this.state.phone.toString(),
            }),
          },
        );
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }

      // const timer = setInterval(() => {
      //   if (this.state.timer == 0) {
      //     this.setState({
      //       checkAuth: false,
      //       timer:60
      //     });

      //     clearInterval(timer);
      //   }

      //   this.setState( {timer: this.state.timer - 1 });
      // }, 1000);
    } else {
      this._AlertModal('', '올바른 휴대폰번호가 아닙니다.');
    }
  };

  _startCountDown() {
    let duration = moment.duration(90000, 'milliseconds');
    this.setState({
      countdown:
        '0' +
        duration.minutes() +
        ':' +
        (duration.seconds() < 10 ? '0' : '') +
        duration.seconds(),
    });
    timer = setInterval(() => {
      if (duration.asSeconds() <= 0) {
        clearInterval(timer);
        this.setState({
          checkTimeOut: true,
          countDownStart: false,
          checkAuth: false,
        });
      }
      duration = moment.duration(duration.asSeconds() - 1, 'seconds');
      this.setState({
        countdown:
          '0' +
          duration.minutes() +
          ':' +
          (duration.seconds() < 10 ? '0' : '') +
          duration.seconds(),
      });
    }, 1000);
  }

  auth = (text) => {
    this.setState({auth: text}, () => {
      if (
        this.state.name != '' &&
        this.state.gender != '' &&
        this.state.birth != '' &&
        this.state.phone != ''
      ) {
        this.setState({next: true});
      }
    });
  };

  check = () => {
    if (this.state.checkTimeOut) {
      return;
    }
    if (this.state.next === true && !this.state.checkTimeOut) {
      this.props.navigation.navigate('SignupScreen2', {
        name: this.state.name,
        gender: this.state.gender,
        birth: this.state.birth,
        phone: this.state.phone,
        authNumber: this.state.auth,
      });

      this.setState({
        checkAuth: false,
        timer: 60,
        auth: '',
        next: false,
      });
    }
  };

  _AlertModal(title, text) {
    this.setState({isChangeModalVisible: true});
    const params = {
      type: 'alert',
      title: title,
      content: text,
    };
    this.props.setAlertInfo(params);
    this.props.setAlertVisible(true);
  }
}

export default VerificationScreenContainer;
