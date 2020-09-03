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
      <IconContainer
        onPress={() => {
          setModalVisible(false);
        }}>
        <CloseCircleIcon size={33} color={'#642a8c'} />
      </IconContainer>
      <Pdf
        source={{uri: url}}
        onError={(error) => {
          console.log(error);
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
