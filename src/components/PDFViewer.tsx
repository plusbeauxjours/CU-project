import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Pdf from 'react-native-pdf';
import styled from 'styled-components/native';
import WebView from 'react-native-webview';

import {CloseCircleIcon} from '../constants/Icons';

const IconContainer = styled.TouchableOpacity`
  z-index: 5;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0;
  top: 25px;
`;

export default ({url, setModalVisible}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <IconContainer onPress={() => setModalVisible(false)}>
        <CloseCircleIcon size={33} color={'white'} />
      </IconContainer>
      <Pdf
        source={{uri: url}}
        onError={(e) => {
          console.log(e);
          setModalVisible(false);
        }}
        onPressLink={(uri) => {
          <WebView source={{uri}} />;
        }}
        activityIndicator={<ActivityIndicator />}
        style={{
          top: -20,
          width: wp('100%'),
          height: hp('100%'),
        }}
      />
    </View>
  );
};
