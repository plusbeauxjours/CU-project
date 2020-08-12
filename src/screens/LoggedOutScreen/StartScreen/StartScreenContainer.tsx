import React, {useState, useEffect} from 'react';
import {Platform, Linking, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StartScreenPresenter from './StartScreenPresenter';

////////////////////////////////////////
// Redux
// setAlertInfo
// setAlertVisible

// Library
// expo-analytics
// analytics
// willFocusSubscription
////////////////////////////////////////

export default () => {
  const navigation = useNavigation();
  const [appVersion, setAppVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');

  const checkVersion = async () => {
    try {
      let response = await fetch(
        'http://133.186.209.113:80/api/v2/Auth/checkApp',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appinfoversion: appVersion,
            Dplatform: platform,
          }),
        },
      );
      const json = await response.json();
      if (json.result == '1') {
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
      type: 'alert',
      title: title,
      content: text,
      close: '1',
      okCallback: () => {
        exitandroid();
      },
    };
    // this.props.setAlertInfo(params);
    // this.props.setAlertVisible(true);
  };

  const gotoLogin = () =>
    navigation.navigate('LogInScreen', {
      appVersion,
      platform,
    });

  const gotoSignup = () => navigation.navigate('SignupScreen');

  useEffect(() => {
    // analytics
    //   .hit(new PageHit('시작 페이지'))
    //   .then(() => console.log('success'))
    //   .catch((e) => console.log(e.message));
    // willFocusSubscription = navigation.addListener('willFocus', () => {
    //   if (Platform.OS === 'ios') {
    //     setAppVersion('1.3.6');
    //     setPlatform('ios');
    //   } else {
    //     setAppVersion('1.3.6');
    //     setPlatform('android');
    //   }
    // });
  }, []);
  return <StartScreenPresenter gotoLogin={gotoLogin} gotoSignup={gotoSignup} />;
};
