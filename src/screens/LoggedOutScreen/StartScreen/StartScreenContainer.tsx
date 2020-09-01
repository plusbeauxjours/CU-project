import React, {useState, useEffect} from 'react';
import {Platform, Linking, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import StartScreenPresenter from './StartScreenPresenter';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertInfo, setAlertVisible} from '../../../redux/alertSlice';
import utils from '../../../constants/utils';
import api from '../../../constants/LoggedInApi';

////////////////////////////////////////
// Redux
// setAlertInfo
// setAlertVisible
////////////////////////////////////////

export default () => {
  const navigation = useNavigation();
  const {content} = useSelector((state: any) => state.alertReducer);
  const dispatch = useDispatch();
  const [appVersion, setAppVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');

  const checkVersion = async () => {
    try {
      const {data} = await api.checkApp({
        VERSION: appVersion,
        PLATFORM: platform,
      });
      if (data.RESULT_CODE == '1') {
        alertModal(
          '[ 업데이트 알림 ]',
          '새로운 버전이 출시되었습니다. 업데이트를 진행해주세요.\n\n* 이동 후 업데이트 버튼이 없는 경우에는 앱스토어 종료 후 다시 실행해 주세요.',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exitandroid = () => {
    // this.props.setAlertVisible(false);
    if (Platform.OS === 'ios') {
      Linking.openURL(
        'https://apps.apple.com/kr/app/%ED%87%B4%EA%B7%BC%ED%95%B4%EC%94%A8%EC%9C%A0-%EC%9A%B0%EB%A6%AC%EB%A7%A4%EC%9E%A5-%ED%95%84%EC%88%98%ED%92%88/id1503486454',
      );
    } else {
      BackHandler.exitApp();
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.wesop.cuhr',
      );
    }
  };

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
      close: '1',
      okCallback: () => {
        exitandroid();
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const gotoLogin = () => {
    navigation.navigate('LogInScreen', {
      appVersion,
      platform,
    });
  };

  const gotoVerification = () => {
    navigation.navigate('VerificationScreen');
  };

  useEffect(() => {
    if (utils.isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('ios');
    }
    setAppVersion('1.3.7');
    checkVersion();
  }, []);

  return (
    <StartScreenPresenter
      gotoLogin={gotoLogin}
      gotoVerification={gotoVerification}
    />
  );
};
