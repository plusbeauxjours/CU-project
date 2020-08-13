import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
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
  const navigation = useNavigation();
  return (
    <Container>
      <Touchable
        onPress={() => {
          navigation.navigate('HelpModalScreen');
        }}>
        <Icon name="help" size={20} color="white" />
        <Text>도움말</Text>
      </Touchable>
      <Touchable
        onPress={() => {
          navigation.navigate('MyPageMainScreen');
        }}>
        <Icon name="setting" size={20} color="white" />
        <Text>설정</Text>
      </Touchable>
    </Container>
  );
};
