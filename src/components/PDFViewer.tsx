import React, {useEffect, useState, useRef} from 'react';
import {View, Platform} from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';
// import * as FileSystem from 'expo-file-system';

import {isIphoneX} from 'react-native-iphone-x-helper';
import WebView from 'react-native-webview';
import Pdf from 'react-native-pdf';

export default ({url}) => {
  const pdfRef = useRef(null);
  const [status, setStatus] = useState<string>('after');
  const [screenOrientation, setScreenOrientation] = useState<string>(
    'PORTRAIT',
  );
  const [iosWebViewStyle, setIosWebViewStyle] = useState<{}>({});
  const [iosPaddingVerticalStyle, setiosPaddingVerticalStyle] = useState<
    number
  >(45);

  const getPDFReader = () => {
    let customStyle = {
      readerContainerNavigate: {},
      readerContainerNavigateArrow: {},
    };

    if (screenOrientation === 'LANDSCAPE') {
      customStyle.readerContainerNavigate = {
        position: 'fixed',
        right: 15,
        bottom: 170,
        backgroundColor: 'grey',
        height: 100,
        width: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      };
      customStyle.readerContainerNavigateArrow = {
        width: '100%',
        height: '100%',
      };
    } else {
      customStyle.readerContainerNavigate = {
        backgroundColor: 'grey',
      };
    }

    return <Pdf ref={pdfRef} source={{uri: url}} style={customStyle} />;
  };

  //   const screenOrientationChange = (event, _this) => {
  //     const info = event.orientationInfo;
  //     const state = {
  //       status: 'before',
  //     };

  //     if (info) {
  //       if (info.orientation.startsWith('LANDSCAPE')) {
  //         state.screenOrientation = 'LANDSCAPE';
  //         state.iosWebViewStyle = {
  //           marginVertical: 15,
  //         };
  //         state.iosPaddingVerticalStyle = 0;
  //       } else if (info.orientation.startsWith('PORTRAIT')) {
  //         state.screenOrientation = 'PORTRAIT';
  //         state.iosWebViewStyle = {
  //           marginVertical: 10,
  //         };
  //         state.iosPaddingVerticalStyle = 45;
  //       }

  //       _this.setState(state, async () => {
  //         if (pdfRef) {
  //           const cache = pdfRef.current.getWebviewSource();

  //           if (cache.uri) {
  //             const file = await FileSystem.getInfoAsync(cache.uri);

  //             if (file.exists) {
  //               await FileSystem.deleteAsync(cache.uri);
  //             }
  //           }
  //         }

  //         _this.setState({
  //           status: 'after',
  //         });
  //       });
  //     }
  //   };

  //           useEffect(() => {
  //             ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  //     ScreenOrientation.addOrientationChangeListener((event) => {
  //       screenOrientationChange(event);
  //     });
  //   }, []);

  //       useEffect(() => {
  //     return () => {
  //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  //         ScreenOrientation.removeOrientationChangeListeners();
  //     };
  //   });

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: isIphoneX() ? iosPaddingVerticalStyle : 0,
      }}>
      {Platform.OS === 'android' ? (
        status === 'after' ? (
          getPDFReader()
        ) : null
      ) : (
        <WebView style={iosWebViewStyle} source={{uri: url}} />
      )}
    </View>
  );
};
