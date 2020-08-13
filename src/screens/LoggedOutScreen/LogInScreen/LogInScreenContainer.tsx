import React, {useEffect, useState} from 'react';

import {isIphoneX} from 'react-native-iphone-x-helper';
import {useDispatch} from 'react-redux';
import LogInScreenPresenter from './LogInScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {setUser, setId, setVersion, userLogin} from '../../../redux/userSlice';
import {setAlertInfo, setAlertVisible} from '../../../redux/alertSlice';

import utils from '../../../constants/utils';

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

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [mobileNum, setMobileNum] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [deviceVersion, setDeviceVersion] = useState<string>('');
  // const [modelId, setModelId] = useState<string>(Device.modelId || '');
  const [userID, setUserID] = useState<string>('');
  const [push, setPush] = useState<string>('');

  const alertModal = (text) => {
    const params = {type: 'alert', content: text};
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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
    navigation.navigate('FindPasswordScreen');
  };

  const signUp = async () => {
    if (mobileNum.length == 0 || password.length == 0) {
      alertModal('휴대폰번호 또는 비밀번호가 입력되지 않았습니다.');
    }
    try {
      let response = await fetch(
        'http://133.186.209.113:3003/api/auth/signin',
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
            Device_Platform: params?.platform, //.toString(),
            // Device_Model: modelId, //.toString(),
            App_Version: params?.appVersion, //.toString()
            USERID: userID,
            push: push,
          }),
        },
      );
      const json = await response.json();
      console.log(':3003/auth/signin 0814TEST', json);
      if (json.message == 'FAIL') {
        alertModal('사용자 정보가 맞지 않습니다.');
      } else if (json.message == 'MEMBER_ERROR') {
        alertModal('가입된 계정이 없습니다. 회원가입을 진행해주세요.');
      } else {
        dispatch(setUser(json.result));
        dispatch(setId(mobileNum));
        dispatch(setVersion(params?.appVersion));
        dispatch(userLogin());
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoggedInNavigation',
              state: {routes: [{name: 'SelectStoreScreen'}]},
            },
          ],
        });
      }
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
