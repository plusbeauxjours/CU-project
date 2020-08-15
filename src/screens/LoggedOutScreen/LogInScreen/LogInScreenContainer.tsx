import React, {useState} from 'react';

import {useDispatch} from 'react-redux';
import LogInScreenPresenter from './LogInScreenPresenter';
import {useNavigation} from '@react-navigation/native';
import {setUser, setId, setVersion, userLogin} from '../../../redux/userSlice';
import {setAlertInfo, setAlertVisible} from '../../../redux/alertSlice';
import api from '../../../constants/LoggedInApi';

////////////////////////////////////////
// Library
// expo-device
// expo-constants
// expo-permissions
// Notifications

// ASK PushNotificationPermission
// CHECK PushNotificationPermission
////////////////////////////////////////

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [mobileNo, setMobileNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [deviceVersion, setDeviceVersion] = useState<string>('');
  // const [modelId, setModelId] = useState<string>(Device.modelId || '');
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
      setMobileNo(text);
    }
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const gotoFind = () => {
    navigation.navigate('FindPasswordScreen');
  };

  const logIn = async () => {
    if (mobileNo.length == 0 || password.length == 0) {
      alertModal('휴대폰번호 또는 비밀번호가 입력되지 않았습니다.');
    }
    try {
      const {data} = await api.logIn({
        MOBILENO: mobileNo,
        PALTFORM: params?.platform,
        VERSION: params?.appVersion,
        // MODEL: modelId,
        DEVICE_TOKEN: push,
        PASSWORD: password,
      });
      console.log(':3003/auth/signin 0814TEST', data);
      switch (data.RESULT_CODE) {
        case '0':
          dispatch(setUser(data.RESULT_DATA));
          dispatch(setId(mobileNo));
          dispatch(setVersion(params?.appVersion));
          dispatch(userLogin());
          return navigation.navigate('LoggedInNavigation');
        case '1':
          return alertModal('사용자 정보가 맞지 않습니다.');
        case '2':
          return alertModal('가입된 계정이 없습니다. 회원가입을 진행해주세요.');
        default:
          break;
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

  return (
    <LogInScreenPresenter
      gotoFind={gotoFind}
      onChangeMobileNum={onChangeMobileNum}
      onChangePassword={onChangePassword}
      mobileNo={mobileNo}
      password={password}
      logIn={logIn}
    />
  );
};
