import React from './react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {setAlertInfo, setAlertVisible} from '../../redux/alertSlice';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity`
  margin-left: 15px;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 11px;
  color: white;
  font-weight: bold;
`;

export default () => {
  const {STORE} = useSelector((state: any) => state.userReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const alertModal = () => {
    const params = {
      type: 'helpModal',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };
  return (
    <Container>
      {STORE == '1' && (
        <Touchable
          onPress={() => {
            alertModal();
          }}>
          <Icon name="help" size={20} color="white" />
          <Text>도움말</Text>
        </Touchable>
      )}
      <Touchable
        onPress={() => {
          navigation.navigate('MyPageMain');
        }}>
        <Icon name="setting" size={20} color="white" />
        <Text>설정</Text>
      </Touchable>
    </Container>
  );
};
