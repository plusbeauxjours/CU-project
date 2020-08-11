import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';

import PropTypes from 'prop-types';
// import {Header} from 'react-navigation-stack';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LogInScreenPresenter from './LogInScreenPresenter';
import {useRoute, useNavigation} from '@react-navigation/native';

////////////////////////////////////////
// Redux
// setAlertInfo
// setAlertVisible
// setUser
// setId
// setVersion
// setLogIn

// Library
// expo-device
// expo-constants
// expo-analytics
// expo-permissions
// Notifications

// ASK PushNotificationPermission
// CHECK PushNotificationPermission
////////////////////////////////////////

// let KEYBOARD_VERTICAL_OFFSET = 0;

// if (Platform.OS === 'android') {
//   KEYBOARD_VERTICAL_OFFSET = -500;
// } else {
//   if (isIphoneX()) {
//     KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + 24;
//   } else {
//     KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT;
//   }
// }

export default () => {
  const navigateion = useNavigation();
  const [isChangeModalVisible, setIsChangeModalVisible] = useState<boolean>(
    false,
  );
  const [mobileNum, setMobileNum] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [deviceVersion, setDeviceVersion] = useState<string>('');
  // const [modelId, setModelId] = useState<string>(Device.modelId || '');
  const [userID, setUserID] = useState<string>('');
  const [idLine, setIdLine] = useState<boolean>(false);
  const [passLine, setPassLine] = useState<boolean>(false);
  const [push, setPush] = useState<string>('');

  const alertModal = (text) => {
    setIsChangeModalVisible(true);
    const params = {type: 'alert', content: text};
    // setAlertInfo(params);
    // setAlertVisible(true);
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

  const gotoFind = () => {
    navigateion.navigate('FindScreen');
  };

  const signUp = async () => {
    if (mobileNum.length == 0 || password.length == 0) {
      alertModal('휴대폰번호 또는 비밀번호가 입력되지 않았습니다.');
    }
    try {
      let response = await fetch(
        'http://133.186.209.113:80/api/v2/Auth/signin2',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            MobileNo: mobileNum, //.toString(),
            PASSWORD: password, //.toString(),
            Device_Version: deviceVersion.toString(),
            Device_Platform: platform, //.toString(),
            // Device_Model: modelId, //.toString(),
            App_Version: appVersion, //.toString()
            USERID: userID,
            push: push,
          }),
        },
      );
      const json = await response.json();
      console.log(json);
      // if (json.message == 'FAIL') {
      //   alertModal('사용자 정보가 맞지 않습니다.');
      // } else if (json.message == 'MEMBER_ERROR') {
      //   alertModal('가입된 계정이 없습니다. 회원가입을 진행해주세요.');
      // } else {
      //   setUser(json.result);
      //   setId(mobileNum);
      //   setVersion(version);
      //   setLogIn('Login');
      // }
    } catch (error) {
      console.log(error);
      alertModal('서버 접속이 원할하지 않습니다.');
    }
  };

  // const initialize = () => {
  //   const {status} = await Permissions.askAsync(Permissions.READ_PHONE_STATE);

  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }

  //   DeviceInfo.getPhoneNumber().then((phoneNumber) => {
  //     console.log(phoneNumber);
  //     // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
  //   });
  // };

  useEffect(() => {
    // analytics
    //   .hit(new PageHit('로그인 페이지'))
    //   .then(() => console.log('success'))
    //   .catch((e) => console.log(e.message));
    // initialize();
  }, []);

  return (
    <LogInScreenPresenter
      gotoFind={gotoFind}
      onChangeMobileNum={onChangeMobileNum}
      onChangePassword={onChangePassword}
      mobileNum={mobileNum}
      password={password}
      signUp={signUp}
    />
  );
};
