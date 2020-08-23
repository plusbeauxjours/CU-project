import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {CartIcon} from '../../constants/Icons';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
  padding: 5px;
`;

const Text = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

export default () => {
  const navigation = useNavigation();
  const {NAME, EMP_SEQ, STORE_SEQ} = useSelector(
    (state: any) => state.userReducer,
  );
  return (
    <Touchable
      onPress={() => {
        navigation.navigate('AddShelfLifeScreen', {
          NAME,
          EMP_SEQ,
          STORE_SEQ,
        });
      }}>
      <CartIcon size={22} color="white" />
      <Text>등록하기</Text>
    </Touchable>
  );
};
