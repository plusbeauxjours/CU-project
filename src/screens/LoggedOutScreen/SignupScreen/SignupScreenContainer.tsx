import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles.js';
import {Header} from 'react-navigation-stack';
import {Platform} from '@unimodules/core';
import {isIphoneX} from 'react-native-iphone-x-helper';
import DatePicker from 'react-native-datepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Ionicons} from '@expo/vector-icons';
import {Analytics, PageHit} from 'expo-analytics';
const analytics = new Analytics('UA-106739677-3');

let KEYBOARD_VERTICAL_OFFSET = 0;
if (Platform.OS === 'android') {
  KEYBOARD_VERTICAL_OFFSET = -500;
} else {
  if (isIphoneX()) {
    KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + 24;
  } else {
    KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT;
  }
}

export default () => {
  isChangeModalVisible: false, // 알람 모달 출력 여부
  id: '',
  name: '',
  sexTypeCheck: [true, false],
  gender: '남자',
  birth: '1990-01-01',
  positionTypeCheck: [false, false],
  type: '1',
  password: '',
  passwordCheck: '',
  passwordSeen: false,
  regist: false,
  version: '',
  platform: '',
};
class SignupScreen2 extends React.Component {
  state = {
    isChangeModalVisible: false, // 알람 모달 출력 여부
    id: '',
    name: '',
    sexTypeCheck: [true, false],
    /* sexTypeCheck
    0: 남자
    1: 여자*/ gender: '남자',
    birth: '1990-01-01',
    positionTypeCheck: [false, false],
    /* positionTypeCheck
    0: 직원
    1: 점주*/
    type: '1',
    /* type
    0: 직원
    1: 점주*/
    password: '',
    passwordCheck: '',
    passwordSeen: false,
    regist: false,
    version: '',
    platform: '',
  };

  componentDidMount() {
    analytics
      .hit(new PageHit('회원가입 정보입력 페이지'))
      .then(() => console.log('success'))
      .catch((e) => console.log(e.message));

    if (Platform.OS === 'ios') {
      this.setState(
        {
          version: '1.3.6',
          platform: 'ios',
          id: this.props.navigation.state.params.phone,
        },
        () => {
          //this._checkVersion();
        },
      );
    } else {
      this.setState(
        {
          version: '1.3.6',
          platform: 'android',
          id: this.props.navigation.state.params.phone,
        },
        () => {
          // this._checkVersion();
        },
      );
    }

    // this.setState({

    //  });
  }

  render() {
    return <SignupScreen2Presenter />;
  }

  // pressInput(num){
  //   var type;
  //   num == 1 ? type = hp('40%') : hp('50%')
  //   setTimeout(() => {
  //     this.scroll.scrollTo(type);
  //   }, 100);
  // }

  sexType(selection, text) {
    let value = JSON.parse(JSON.stringify(this.state.sexTypeCheck));
    // console.log(selection, value);

    return (
      <View>
        <TouchableOpacity
          style={styles.positionType}
          onPress={() => {
            value.fill(false); // ES6
            value[selection] = true;

            const params = {
              sexTypeCheck: value,
            };

            if (selection === 0) {
              params.gender = '남성';
            } else if (selection === 1) {
              params.gender = '남성';
            }

            this.setState(params, () => {
              this._checkValidationRegistButton();
            });
          }}>
          <View
            style={
              this.state.sexTypeCheck[selection]
                ? {...styles.positionTypeRadioButtonOff, borderColor: '#642A8C'}
                : styles.positionTypeRadioButtonOff
            }>
            {this.state.sexTypeCheck[selection] && (
              <View style={styles.positionTypeRadioButtonOn} />
            )}
          </View>
          <Text style={{marginLeft: 5, fontSize: 15}}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  positionType(selection, text) {
    let value = JSON.parse(JSON.stringify(this.state.positionTypeCheck));
    // console.log(selection, value);

    return (
      <View>
        <TouchableOpacity
          style={styles.positionType}
          onPress={() => {
            value.fill(false); // ES6
            value[selection] = true;

            const params = {
              positionTypeCheck: value,
              type: null,
            };

            if (selection === 0) {
              // 직원
              params.type = '0';
            } else if (selection === 1) {
              // 점주
              params.type = '1';
            }

            this.setState(params, () => {
              this._checkValidationRegistButton();
            });
          }}>
          <View
            style={
              this.state.positionTypeCheck[selection]
                ? {...styles.positionTypeRadioButtonOff, borderColor: '#642A8C'}
                : styles.positionTypeRadioButtonOff
            }>
            {this.state.positionTypeCheck[selection] && (
              <View style={styles.positionTypeRadioButtonOn} />
            )}
          </View>
          <Text style={{marginLeft: 5, fontSize: 15}}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _password = (isPasswordCheck, text) => {
    if (isPasswordCheck) {
      this.setState({
        passwordCheck: text,
      });
      this._checkValidationRegistButton();
    } else {
      this.setState({
        password: text,
        passwordCheck: '',
      });
    }
  };

  _passwordCheck = (text) => {
    this._checkValidationRegistButton();

    if (this.state.password !== '' && this.state.password.length < 6) {
      this._AlertModal('', '비밀번호를 6자리 이상 입력하세요.');
    }
  };

  _checkValidationRegistButton() {
    const {id, name, password, passwordCheck, positionTypeCheck} = this.state;
    const checkedPositionType = !!positionTypeCheck.filter((flag) => flag)
      .length;

    console.log(id);
    console.log(name);
    console.log(password);
    console.log(passwordCheck);
    console.log(positionTypeCheck);

    if (
      !id ||
      !name ||
      !password ||
      password.length < 6 ||
      !checkedPositionType
    ) {
      this.setState({
        regist: false,
      });
    } else {
      this.setState({
        regist: true,
      });
    }
  }

  _checkPassword = (password) => {
    if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
      this._AlertModal(
        '',
        '숫자와 영문자 조합으로 6~15자리를 사용해야 합니다.',
      );
      return false;
    }

    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
      this._AlertModal('', '숫자와 영문자를 혼용하여야 합니다.');
      return false;
    }
    if (/(\w)\1\1\1/.test(password)) {
      this._AlertModal('', '444같은 문자를 4번 이상 사용하실 수 없습니다.');
      return false;
    }
    return true;
  };

  _regist = async () => {
    this.props.setSplashVisible(true);
    if (this.state.password !== this.state.passwordCheck) {
      this._AlertModal('', '비밀번호가 동일하지 않습니다.');
      this.props.setSplashVisible(false);
      return;
    }

    if (this._checkPassword(this.state.password) === false) {
      this.props.setSplashVisible(false);
      return false;
    } else {
      try {
        console.log(
          this.state.name,
          this.props.navigation.state.params.gender,
          this.props.navigation.state.params.phone,
          this.props.navigation.state.params.authNumber,
          this.state.type,
          this.state.password,
        );
        let response = await fetch(
          'http://133.186.209.113:80/api/v2/Auth/signup3',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              NAME: this.state.name,
              BIRTHDATE: this.props.navigation.state.params.birth,
              GENDER: this.props.navigation.state.params.gender,
              MobileNo: this.props.navigation.state.params.phone,
              SMSNUMBER: this.props.navigation.state.params.authNumber,
              STORE: this.state.type,
              PASSWORD: this.state.password,
              DEVICE_TOKEN: '',
            }),
          },
        );
        const json = await response.json();
        console.log(json);

        if (json.message === 'ALREADY_SUCCESS') {
          this.props.setSplashVisible(false);
          this.setState({isChangeModalVisible: true});
          const params = {
            type: 'alert',
            content: '이미 가입한 휴대폰번호입니다.',
          };
          this.props.setAlertInfo(params);
          this.props.setAlertVisible(true);
          this.props.navigation.goBack();
        } else if (json.message === 'SMSERROR') {
          this.props.setSplashVisible(false);
          this.setState({isChangeModalVisible: true});
          const params = {
            type: 'alert',
            content: '인증번호 오류입니다.',
          };
          this.props.setAlertInfo(params);
          this.props.setAlertVisible(true);
          this.props.navigation.goBack();
        } else {
          this.props.setSplashVisible(false);
          this.setState({isChangeModalVisible: true});
          const params = {
            type: 'alert',
            content: '회원가입이 완료되었습니다. 다시 로그인해 주세요.',
          };
          this.props.setAlertInfo(params);
          this.props.setAlertVisible(true);
          // this.props.navigation.navigate('LogIn');
          this.props.navigation.navigate('LogIn', {
            appVersion: this.state.version,
            platform: this.state.platform,
          });
        }
      } catch (error) {
        console.log(error);
      }
      this.props.setSplashVisible(false);
    }
  };

  _AlertModal(title, text, okCallback) {
    this.setState({isChangeModalVisible: true});
    const params = {
      type: 'alert',
      title: title,
      content: text,
      okCallback,
    };
    this.props.setAlertInfo(params);
    this.props.setAlertVisible(true);
  }
  _AlertModal2(title, text, okCallback) {
    this.setState({isChangeModalVisible: true});
    const params = {
      type: 'confirm',
      title: title,
      content: text,
      okCallback: () => {
        this._regist();
      },
      okButtonText: '예',
      cancelButtonText: '아니요',
    };
    this.props.setAlertInfo(params);
    this.props.setAlertVisible(true);
  }
}

export default SignupScreen2;
