import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {setLogIn} from '../../redux/userSlice';

const Touchable = styled.TouchableOpacity`
  margin-right: 10px;
  align-items: center;
`;

const Text = styled.Text`
  margin-top: 2px;
  font-size: 11px;
  color: white;
  font-weight: bold;
`;

export default () => {
  const dispatch = useDispatch();
  return (
    <Touchable onPress={() => dispatch(setLogIn('LogOut'))}>
      <Icon name="logout" size={20} color="white" />
      <Text>로그아웃</Text>
    </Touchable>
  );
};
