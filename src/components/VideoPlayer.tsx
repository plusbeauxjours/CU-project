import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import {CloseCircleIcon} from '../constants/Icons';

const IconContainer = styled.TouchableOpacity`
  z-index: 5;
  position: absolute;
  right: 0;
`;
const Text = styled.Text``;
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
    </View>
  );
};
